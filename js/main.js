/**
 * Give-AID Platform — Core Client-Side Interactions (Vanilla JS)
 * Optimized with event delegation, dirty-checked scroll state, lazy modal injection,
 * and shared motion system initialization.
 */

import { initMotionSystem } from './motion.js';

document.addEventListener('DOMContentLoaded', () => {
  initMotionSystem();
  initMobileNav();
  initStickyHeader();
  initAnimatedCounters();
  initModals();
  initNewsletter();
  initLightbox();
});

/* Mobile Navigation Drawer */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  if (!toggleBtn) return;

  const overlay = document.querySelector('.mobile-nav-overlay');
  const drawerClose = document.querySelector('.mobile-drawer-close');
  let isOpen = false;

  function toggleMenu(open) {
    if (open === isOpen) return;
    isOpen = open;
    document.body.classList.toggle('mobile-nav-active', open);
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.addEventListener('click', () => toggleMenu(!isOpen));
  if (overlay) overlay.addEventListener('click', () => toggleMenu(false));
  if (drawerClose) drawerClose.addEventListener('click', () => toggleMenu(false));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleMenu(false);
    }
  });
}

/* Header Sticky Effect (rAF + dirty-check so scroll doesn't thrash DOM classList) */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let isScrolled = false;
  let ticking = false;

  function syncStickyState() {
    ticking = false;
    const shouldScroll = window.scrollY > 20;
    if (shouldScroll !== isScrolled) {
      isScrolled = shouldScroll;
      header.classList.toggle('scrolled', shouldScroll);
    }
  }

  syncStickyState();
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(syncStickyState);
      }
    },
    { passive: true }
  );
}

/* Animated Numerical Counters */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter-target') || '0', 10);
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        animateValue(el, 0, target, 1400, prefix, suffix);
        obs.unobserve(el);
      }
    },
    { threshold: 0.2 }
  );

  counterElements.forEach((el) => observer.observe(el));
}

function animateValue(obj, start, end, duration, prefix = '', suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeProgress * (end - start) + start);
    obj.textContent = `${prefix}${current.toLocaleString('en-PK')}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* Modals via Event Delegation (zero per-button listener overhead on page load) */
function initModals() {
  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;

    const quickBtn = e.target.closest('[data-open-quick-donate]');
    if (quickBtn) {
      e.preventDefault();
      const amount = quickBtn.getAttribute('data-amount') || '1000';
      const cause = quickBtn.getAttribute('data-cause') || "Children's Welfare";
      openQuickDonate(amount, cause);
      return;
    }

    const inviteBtn = e.target.closest('[data-open-invite]');
    if (inviteBtn) {
      e.preventDefault();
      ensureInviteModal();
      openModal('inviteModal');
      return;
    }

    if (e.target.closest('.modal-close, [data-modal-close]')) {
      closeAllModals();
      return;
    }

    if (e.target.classList.contains('modal-overlay')) {
      closeAllModals();
    }
  });

  bindInviteFormHandler();
}

function bindInviteFormHandler() {
  const inviteForm = document.getElementById('inviteForm');
  if (!inviteForm || inviteForm.dataset.bound === 'true') return;
  inviteForm.dataset.bound = 'true';

  inviteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('inviteFriendName')?.value;
    const email = document.getElementById('inviteFriendEmail')?.value;
    if (!name || !email) {
      showToast('Please provide your friend’s name and email.', 'error');
      return;
    }
    closeAllModals();
    inviteForm.reset();
    showToast(`Invitation sent to ${name} (${email})!`, 'success');
  });
}

function ensureInviteModal() {
  if (document.getElementById('inviteModal')) {
    bindInviteFormHandler();
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div id="inviteModal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="inviteModalTitle">
      <div class="modal-box">
        <button class="modal-close" aria-label="Close modal">&times;</button>
        <span class="text-kicker">Spread the Mission</span>
        <h3 id="inviteModalTitle" style="font-size: 1.5rem; font-weight: 800; margin-bottom: 8px;">Invite a Friend to Give-AID</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 24px;">
          Share our verified welfare platform with colleagues or loved ones who wish to make a direct humanitarian difference.
        </p>
        <form id="inviteForm" action="/api/InviteServlet" method="post">
          <div class="form-group">
            <label class="form-label" for="inviteFriendName">Friend's Name</label>
            <input type="text" id="inviteFriendName" class="form-input" placeholder="e.g. Bilal Ahmed" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="inviteFriendEmail">Friend's Email Address</label>
            <input type="email" id="inviteFriendEmail" class="form-input" placeholder="bilal@example.com" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="inviteMsg">Personal Note (Optional)</label>
            <textarea id="inviteMsg" class="form-textarea" placeholder="Join me in supporting verified relief and education causes on Give-AID..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">SEND INVITATION</button>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper.firstElementChild);
  bindInviteFormHandler();
}

window.openModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeAllModals = function () {
  document.querySelectorAll('.modal-overlay.active').forEach((m) => m.classList.remove('active'));
  document.body.style.overflow = '';
};

function openQuickDonate(amount, cause) {
  const modal = document.getElementById('quickDonateModal');
  if (modal) {
    const input = document.getElementById('qdAmount');
    if (input) input.value = amount;
    const select = document.getElementById('qdCause');
    if (select && cause) select.value = cause;
    openModal('quickDonateModal');
  } else {
    window.location.href = `donate.html?amount=${amount}&cause=${encodeURIComponent(cause)}`;
  }
}

/* Lightbox Modal via Delegation (skipped completely on pages without #lightboxModal) */
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;

    const trigger = e.target.closest('[data-lightbox-src]');
    if (trigger) {
      const src = trigger.getAttribute('data-lightbox-src');
      const caption = trigger.getAttribute('data-lightbox-caption') || 'Give-AID Welfare Mission in Action';
      if (lightboxImg && src) {
        lightboxImg.src = src;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      return;
    }

    if (e.target === lightbox || e.target.closest('.lightbox-close')) {
      closeLightbox();
    }
  });
}

/* Newsletter Subscription */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      showToast('Thank you for subscribing to Give-AID updates!', 'success');
      form.reset();
    });
  });
}

/* Toast Notifications (Safe DOM construction against XSS) */
window.showToast = function (message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const textSpan = document.createElement('span');
  textSpan.textContent = message;
  toast.appendChild(textSpan);

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};
