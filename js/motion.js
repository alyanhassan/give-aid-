/**
 * Give-AID Platform — Editorial Motion, Scroll Reveals & Navigation Acceleration (Vanilla JS)
 * Optimized for zero layout thrashing, IntersectionObserver-driven reveals, Speculation Rules API
 * prerendering/prefetching with deduplicated link prefetch fallback, and reduced-motion support.
 */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const CARD_UNIT_SELECTORS = [
  '.impact-item',
  '.cause-card',
  '.programme-card',
  '.ngo-directory-card',
  '.ngo-activity-card',
  '.ngo-sidebar-card',
  '.donation-card',
  '.summary-card',
  '.receipt-card',
  '.about-floating-card',
  '.accordion-item',
  '.story-card',
  '.final-cta-section',
].join(', ');

const REVEAL_DURATION_MS = {
  kicker: 650,
  heading: 800,
  text: 650,
  card: 700,
  section: 800,
  fade: 700,
  image: 900,
};

// Session/personalized pages excluded from speculative prerendering & aggressive caching
const PERSONALIZED_ROUTES = new Set([
  '/profile.html',
  '/donation-history.html',
  '/confirmation.html',
]);

let revealObserver = null;
let dynamicGridObserver = null;
let scrollHandlerBound = false;
const processedReveals = new WeakSet();
const observedReveals = new WeakSet();

export function initMotionSystem() {
  const motionMedia = window.matchMedia(REDUCED_MOTION_QUERY);

  initSmoothAnchorLinks(motionMedia);
  initBackToTopButton(motionMedia);
  initNavigationAcceleration();

  if (motionMedia.matches) {
    disableMotionReveals();
  } else {
    setupRevealObserver();
    assignAndObserveReveals(document, { immediateAboveFold: true });
    document.documentElement.classList.add('motion-ready');
    observeDynamicContainers();
  }

  // React cleanly if user toggles OS reduced-motion setting while page is open
  if (typeof motionMedia.addEventListener === 'function') {
    motionMedia.addEventListener('change', (e) => {
      if (e.matches) {
        disableMotionReveals();
      } else {
        document.documentElement.classList.add('motion-ready');
        setupRevealObserver();
        assignAndObserveReveals(document);
        observeDynamicContainers();
      }
    });
  }

  // Ensure bfcache (back/forward navigation) never leaves visible sections unrevealed
  if (!scrollHandlerBound) {
    scrollHandlerBound = true;
    window.addEventListener(
      'pageshow',
      (e) => {
        if (e.persisted && !motionMedia.matches) {
          refreshVisibleSweep();
        }
      },
      { passive: true }
    );
  }

  // Public helper for filter scripts (causes, programmes, gallery, NGO directory)
  window.refreshScrollReveals = function refreshScrollReveals(scope = document) {
    if (motionMedia.matches) return;
    assignAndObserveReveals(scope);
    refreshVisibleSweep(scope);
  };
}

function disableMotionReveals() {
  document.documentElement.classList.remove('motion-ready');
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }
  if (dynamicGridObserver) {
    dynamicGridObserver.disconnect();
    dynamicGridObserver = null;
  }
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    el.classList.add('is-revealed');
    el.classList.remove('is-revealing');
    el.style.removeProperty('--reveal-delay');
  });
}

function isExcludedContext(el) {
  return Boolean(
    el.closest(
      '.modal-overlay, .lightbox-overlay, .testimonials-marquee, .mobile-nav-drawer, .hero-section, #ngoEmptyState'
    )
  );
}

function isInsideCardUnit(el) {
  const parentCard = el.closest(CARD_UNIT_SELECTORS);
  if (parentCard && parentCard !== el) return true;
  const markedAncestor = el.closest('[data-reveal="card"]');
  return Boolean(markedAncestor && markedAncestor !== el);
}

function assignRevealAttributes(root = document) {
  const scope = root instanceof Element || root instanceof Document ? root : document;
  const searchRoot = scope instanceof Document ? scope.querySelector('main') || scope : scope;

  // 1. Identify card units first so inner text/images don't animate redundantly
  scope.querySelectorAll(CARD_UNIT_SELECTORS).forEach((el) => {
    if (!processedReveals.has(el) && !el.hasAttribute('data-reveal') && !isExcludedContext(el)) {
      el.setAttribute('data-reveal', 'card');
    }
  });

  // Also detect inline multi-column card grids (e.g. About pillars, Team, Mission, Achievements)
  searchRoot.querySelectorAll('section [style*="grid-template-columns"]').forEach((grid) => {
    if (isExcludedContext(grid)) return;
    const children = grid.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (
        !processedReveals.has(child) &&
        !child.hasAttribute('data-reveal') &&
        child.tagName !== 'SCRIPT' &&
        child.tagName !== 'STYLE' &&
        (child.style.backgroundColor || child.style.border || child.classList.length > 0)
      ) {
        child.setAttribute('data-reveal', 'card');
      }
    }
  });

  // 2. Eyebrow kickers, headings, paragraphs, editorial CTA buttons & images
  searchRoot
    .querySelectorAll('.text-kicker, h1, h2, h3.text-section-title, .lead-text, section p, section img, .gallery-item, section [style*="grid-template-columns"] > div > a.btn')
    .forEach((el) => {
      if (processedReveals.has(el) || el.hasAttribute('data-reveal') || isExcludedContext(el) || isInsideCardUnit(el)) {
        return;
      }

      if (el.classList.contains('text-kicker')) {
        el.setAttribute('data-reveal', 'kicker');
      } else if (el.tagName === 'H1' || el.tagName === 'H2' || el.classList.contains('text-section-title')) {
        el.setAttribute('data-reveal', 'heading');
      } else if (el.classList.contains('gallery-item')) {
        el.setAttribute('data-reveal', 'image');
      } else if (el.tagName === 'IMG') {
        if (
          el.classList.contains('ngo-logo-img') ||
          el.classList.contains('brand-logo-mark') ||
          el.classList.contains('hero-pill-img') ||
          el.closest('.ngo-logo-wrapper, .ngo-detail-logo-box, .brand-logo, .auth-brand-mark, .gallery-item')
        ) {
          return;
        }
        el.setAttribute('data-reveal', 'image');
      } else if (el.tagName === 'P' || el.classList.contains('lead-text') || el.tagName === 'A') {
        if (el.closest('.form-group') || el.classList.contains('form-error') || el.classList.contains('form-hint')) {
          return;
        }
        el.setAttribute('data-reveal', 'text');
      }
    });

  // 3. Interactive strips, testimonials wrapper, and footer columns
  scope.querySelectorAll('.testimonials-marquee, .testimonials-cta-wrap, .gallery-filters, .search-bar-wrap').forEach((el) => {
    if (!processedReveals.has(el) && !el.hasAttribute('data-reveal') && !isExcludedContext(el)) {
      el.setAttribute('data-reveal', el.classList.contains('testimonials-cta-wrap') ? 'text' : 'fade');
    }
  });

  if (scope === document) {
    document.querySelectorAll('.site-footer .footer-top > div, .site-footer .footer-bottom').forEach((el) => {
      if (!processedReveals.has(el) && !el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', 'text');
      }
    });
  }
}

function setupRevealObserver() {
  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      const entering = [];
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entering.push(entries[i].target);
        }
      }
      if (entering.length) {
        revealBatch(entering);
      }
    },
    {
      threshold: 0.04,
      rootMargin: '0px 0px -12px 0px',
    }
  );
}

function revealBatch(elements) {
  let cardOrder = 0;
  const prepared = [];

  // Phase 1: Assign reveal preparation styles in one write pass (zero per-element reflow)
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.classList.contains('is-revealed')) continue;

    const type = el.getAttribute('data-reveal') || 'text';
    const duration = REVEAL_DURATION_MS[type] || 700;
    let delay = 0;

    if (type === 'kicker') {
      delay = 0;
    } else if (type === 'heading') {
      delay = 70;
    } else if (type === 'text') {
      delay = 120;
    } else if (type === 'image') {
      delay = 100;
    } else if (type === 'card') {
      delay = Math.min(cardOrder * 75, 280);
      cardOrder += 1;
    } else {
      delay = 60;
    }

    if (delay > 0) {
      el.style.setProperty('--reveal-delay', `${delay}ms`);
    } else {
      el.style.removeProperty('--reveal-delay');
    }

    el.classList.add('is-revealing');
    if (revealObserver) {
      revealObserver.unobserve(el);
    }

    prepared.push({ el, totalWait: duration + delay + 80 });
  }

  if (!prepared.length) return;

  // Phase 2: Toggle .is-revealed in next frame so initial hidden state transitions cleanly without synchronous layout thrashing
  window.requestAnimationFrame(() => {
    for (let i = 0; i < prepared.length; i++) {
      const { el, totalWait } = prepared[i];
      el.classList.add('is-revealed');
      processedReveals.add(el);

      window.setTimeout(() => {
        el.classList.remove('is-revealing');
        el.style.removeProperty('--reveal-delay');
      }, totalWait);
    }
  });
}

function assignAndObserveReveals(scope = document, options = {}) {
  const { immediateAboveFold = false } = options;
  assignRevealAttributes(scope);

  const rootEl = scope instanceof Element || scope instanceof Document ? scope : document;
  const candidates = Array.from(rootEl.querySelectorAll('[data-reveal]:not(.is-revealed)'));
  if (!candidates.length) return;

  const viewportLimit = window.innerHeight * 0.96;

  // Batch all geometry reads before performing any DOM class writes
  const measurements = [];
  for (let i = 0; i < candidates.length; i++) {
    const el = candidates[i];
    const rect = el.getBoundingClientRect();
    // Hidden/filtered-out items have 0x0 bounding rect and no fixed positioning
    if (rect.width === 0 && rect.height === 0) continue;
    measurements.push({ el, top: rect.top });
  }

  const dynamicVisible = [];
  for (let i = 0; i < measurements.length; i++) {
    const { el, top } = measurements[i];
    if (top < viewportLimit) {
      if (immediateAboveFold) {
        // Above-the-fold elements already painted on initial navigation must never flash to opacity 0
        el.classList.add('is-revealed');
        processedReveals.add(el);
      } else {
        dynamicVisible.push(el);
      }
    } else if (revealObserver && !observedReveals.has(el)) {
      observedReveals.add(el);
      revealObserver.observe(el);
    } else if (!revealObserver) {
      dynamicVisible.push(el);
    }
  }

  if (dynamicVisible.length) {
    revealBatch(dynamicVisible);
  }
}

function refreshVisibleSweep(scope = document) {
  const rootEl = scope instanceof Element || scope instanceof Document ? scope : document;
  const targets = Array.from(rootEl.querySelectorAll('[data-reveal]:not(.is-revealed)'));
  if (!targets.length) return;

  const viewportLimit = window.innerHeight * 0.96;
  const visibleNow = [];

  for (let i = 0; i < targets.length; i++) {
    const el = targets[i];
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;

    if (rect.top < viewportLimit) {
      visibleNow.push(el);
    } else if (revealObserver && !observedReveals.has(el)) {
      observedReveals.add(el);
      revealObserver.observe(el);
    }
  }

  if (visibleNow.length) {
    revealBatch(visibleNow);
  }
}

function observeDynamicContainers() {
  const containerIds = ['ngosDirectoryContainer', 'detailActivitiesList', 'detailRelatedNgos'];
  const containers = containerIds.map((id) => document.getElementById(id)).filter(Boolean);

  if (!containers.length || typeof MutationObserver === 'undefined') return;

  if (dynamicGridObserver) {
    dynamicGridObserver.disconnect();
  }

  dynamicGridObserver = new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        assignAndObserveReveals(mutation.target);
      }
    }
  });

  containers.forEach((container) => {
    dynamicGridObserver.observe(container, { childList: true });
  });
}

/* --------------------------------------------------------------------------
   Smooth Internal Anchor Navigation
   -------------------------------------------------------------------------- */
function initSmoothAnchorLinks(motionMedia) {
  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#' || link.hasAttribute('data-open-invite') || link.hasAttribute('data-open-quick-donate')) {
      return;
    }

    const targetId = href.slice(1);
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    e.preventDefault();

    if (document.body.classList.contains('mobile-nav-active')) {
      document.body.classList.remove('mobile-nav-active');
    }

    targetEl.scrollIntoView({
      behavior: motionMedia.matches ? 'auto' : 'smooth',
      block: 'start',
    });

    if (window.history && typeof window.history.pushState === 'function') {
      window.history.pushState(null, '', href);
    }
  });
}

/* --------------------------------------------------------------------------
   Smooth Back-to-Top Floating Button
   -------------------------------------------------------------------------- */
function initBackToTopButton(motionMedia) {
  if (document.querySelector('.back-to-top-btn')) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'back-to-top-btn';
  btn.setAttribute('aria-label', 'Back to top');
  btn.setAttribute('title', 'Back to top');
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  `;

  document.body.appendChild(btn);

  let isVisible = false;
  let ticking = false;

  function updateVisibility() {
    ticking = false;
    const shouldShow = window.scrollY > 420;
    if (shouldShow !== isVisible) {
      isVisible = shouldShow;
      btn.classList.toggle('is-visible', shouldShow);
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateVisibility);
      }
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: motionMedia.matches ? 'auto' : 'smooth',
    });
  });

  updateVisibility();
}

/* --------------------------------------------------------------------------
   Navigation Acceleration: Speculation Rules API + Smart Link Prefetching
   -------------------------------------------------------------------------- */
function initNavigationAcceleration() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn && (conn.saveData || (conn.effectiveType && conn.effectiveType.includes('2g')))) {
    return;
  }

  // 1. Speculation Rules API (Chromium): prerender hovered static editorial routes, prefetch detail routes
  const supportsSpeculationRules =
    typeof HTMLScriptElement !== 'undefined' &&
    typeof HTMLScriptElement.supports === 'function' &&
    HTMLScriptElement.supports('speculationrules');

  if (supportsSpeculationRules && !document.querySelector('script[type="speculationrules"]')) {
    const specScript = document.createElement('script');
    specScript.type = 'speculationrules';
    specScript.textContent = JSON.stringify({
      prerender: [
        {
          where: {
            and: [
              { href_matches: '/*.html' },
              { not: { href_matches: '/profile.html*' } },
              { not: { href_matches: '/donation-history.html*' } },
              { not: { href_matches: '/confirmation.html*' } },
              { not: { href_matches: '/ngo-detail.html*' } },
            ],
          },
          eagerness: 'moderate',
        },
      ],
      prefetch: [
        {
          where: {
            and: [
              { href_matches: '/ngo-detail.html*' },
            ],
          },
          eagerness: 'moderate',
        },
      ],
    });
    document.head.appendChild(specScript);
  }

  // 2. Deduplicated <link rel="prefetch" as="document"> fallback & idle warming
  const prefetched = new Set();

  function prefetchUrl(rawHref) {
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
      return;
    }

    let resolved;
    try {
      resolved = new URL(rawHref, window.location.href);
    } catch (e) {
      return;
    }

    if (resolved.origin !== window.location.origin) return;
    if (PERSONALIZED_ROUTES.has(resolved.pathname)) return;
    if (resolved.pathname === window.location.pathname && resolved.search === window.location.search) return;

    const url = resolved.pathname + resolved.search;
    if (prefetched.has(url)) return;
    prefetched.add(url);

    const linkEl = document.createElement('link');
    linkEl.rel = 'prefetch';
    linkEl.as = 'document';
    linkEl.href = url;
    document.head.appendChild(linkEl);
  }

  const onHoverOrFocus = (e) => {
    if (!(e.target instanceof Element)) return;

    // If user hovers/focuses a navbar dropdown parent, warm its submenu items proactively
    const navItem = e.target.closest('.site-header .nav-item');
    if (navItem) {
      navItem.querySelectorAll('a[href]').forEach((a) => prefetchUrl(a.getAttribute('href')));
      return;
    }

    const anchor = e.target.closest('a[href]');
    if (anchor) {
      prefetchUrl(anchor.getAttribute('href'));
    }
  };

  document.addEventListener('pointerenter', onHoverOrFocus, { capture: true, passive: true });
  document.addEventListener('focusin', onHoverOrFocus, { passive: true });
  document.addEventListener('touchstart', onHoverOrFocus, { passive: true });

  // Warm primary top-level navigation pages once current page finishes loading
  const warmPrimaryNav = () => {
    document
      .querySelectorAll('.site-header .nav-menu > li > a[href], .site-header .btn-donate[href]')
      .forEach((a) => prefetchUrl(a.getAttribute('href')));
  };

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(warmPrimaryNav, { timeout: 1200 });
  } else {
    window.setTimeout(warmPrimaryNav, 250);
  }
}
