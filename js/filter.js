/**
 * Give-AID Platform — Dynamic Search, Filter & Accordion Logic
 * Optimized with cached text lookup, debounced search input, and isolated page initializers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCausesFilter();
  initProgrammesFilter();
  initGalleryFilter();
  initFAQAccordions();
  initHelpSearch();
});

function debounce(fn, delayMs = 60) {
  let timerId = null;
  return (...args) => {
    if (timerId) window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      timerId = null;
      fn(...args);
    }, delayMs);
  };
}

/* Causes Filtering */
function initCausesFilter() {
  const filterButtons = document.querySelectorAll('[data-cause-filter]');
  const searchInput = document.getElementById('causeSearchInput');
  const cards = document.querySelectorAll('.cause-card-item');

  if (!cards.length || (!filterButtons.length && !searchInput)) return;

  const indexedCards = Array.from(cards).map((card) => ({
    el: card,
    category: (card.getAttribute('data-category') || '').toLowerCase(),
    text: card.textContent.toLowerCase(),
  }));

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilter() {
    let anyRevealed = false;
    for (let i = 0; i < indexedCards.length; i++) {
      const item = indexedCards[i];
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = !searchTerm || item.text.includes(searchTerm);
      const shouldShow = matchesCategory && matchesSearch;
      const wasHidden = item.el.style.display === 'none';

      item.el.style.display = shouldShow ? '' : 'none';
      if (shouldShow && wasHidden) anyRevealed = true;
    }
    if (anyRevealed && typeof window.refreshScrollReveals === 'function') {
      window.refreshScrollReveals();
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = (btn.getAttribute('data-cause-filter') || 'all').toLowerCase();
      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener(
      'input',
      debounce(() => {
        searchTerm = searchInput.value.trim().toLowerCase();
        applyFilter();
      })
    );
  }
}

/* Programmes Filtering */
function initProgrammesFilter() {
  const filterButtons = document.querySelectorAll('[data-prog-filter]');
  const searchInput = document.getElementById('progSearchInput');
  const cards = document.querySelectorAll('.programme-card-item');

  if (!cards.length || (!filterButtons.length && !searchInput)) return;

  const indexedCards = Array.from(cards).map((card) => ({
    el: card,
    status: (card.getAttribute('data-status') || '').toLowerCase(),
    text: card.textContent.toLowerCase(),
  }));

  let activeStatus = 'all';
  let searchTerm = '';

  function applyFilter() {
    let anyRevealed = false;
    for (let i = 0; i < indexedCards.length; i++) {
      const item = indexedCards[i];
      const matchesStatus = activeStatus === 'all' || item.status === activeStatus;
      const matchesSearch = !searchTerm || item.text.includes(searchTerm);
      const shouldShow = matchesStatus && matchesSearch;
      const wasHidden = item.el.style.display === 'none';

      item.el.style.display = shouldShow ? '' : 'none';
      if (shouldShow && wasHidden) anyRevealed = true;
    }
    if (anyRevealed && typeof window.refreshScrollReveals === 'function') {
      window.refreshScrollReveals();
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeStatus = (btn.getAttribute('data-prog-filter') || 'all').toLowerCase();
      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener(
      'input',
      debounce(() => {
        searchTerm = searchInput.value.trim().toLowerCase();
        applyFilter();
      })
    );
  }
}

/* Gallery Filtering */
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  if (!filterButtons.length || !items.length) return;

  const indexedItems = Array.from(items).map((item) => ({
    el: item,
    cat: (item.getAttribute('data-category') || '').toLowerCase(),
  }));

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = (btn.getAttribute('data-gallery-filter') || 'all').toLowerCase();

      let anyRevealed = false;
      for (let i = 0; i < indexedItems.length; i++) {
        const item = indexedItems[i];
        const shouldShow = cat === 'all' || item.cat === cat;
        const wasHidden = item.el.style.display === 'none';
        item.el.style.display = shouldShow ? '' : 'none';
        if (shouldShow && wasHidden) anyRevealed = true;
      }
      if (anyRevealed && typeof window.refreshScrollReveals === 'function') {
        window.refreshScrollReveals();
      }
    });
  });
}

/* Help Centre FAQ Accordions (event delegation per accordion group) */
function initFAQAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  if (!headers.length) return;

  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;
    const header = e.target.closest('.accordion-header');
    if (!header) return;

    const parent = header.closest('.accordion-item');
    if (!parent) return;

    const isOpen = parent.classList.contains('open');
    const group = parent.closest('.accordion-group');
    if (group) {
      group.querySelectorAll('.accordion-item.open').forEach((item) => {
        item.classList.remove('open');
      });
    }

    if (!isOpen) {
      parent.classList.add('open');
    }
  });
}

/* Help Centre Search Bar */
function initHelpSearch() {
  const searchInput = document.getElementById('faqSearchInput');
  const faqItems = document.querySelectorAll('.accordion-item');

  if (!searchInput || !faqItems.length) return;

  const indexedFaqs = Array.from(faqItems).map((item) => ({
    el: item,
    text: item.textContent.toLowerCase(),
  }));

  searchInput.addEventListener(
    'input',
    debounce(() => {
      const term = searchInput.value.trim().toLowerCase();
      for (let i = 0; i < indexedFaqs.length; i++) {
        const item = indexedFaqs[i];
        if (!term || item.text.includes(term)) {
          item.el.style.display = '';
          if (term) item.el.classList.add('open');
        } else {
          item.el.style.display = 'none';
          item.el.classList.remove('open');
        }
      }
    })
  );
}
