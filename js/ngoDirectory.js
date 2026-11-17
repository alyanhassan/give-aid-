/**
 * Give-AID Platform — Associated NGOs Directory Controller
 * Handles client-side category filtering, debounced search filtering,
 * and eager/lazy logo loading optimization.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNgoDirectory();
});

function initNgoDirectory() {
  const container = document.getElementById('ngosDirectoryContainer');
  const countBadge = document.getElementById('ngoResultsCount');
  const searchInput = document.getElementById('ngoSearchInput');
  const filterButtons = document.querySelectorAll('[data-ngo-filter]');
  const emptyState = document.getElementById('ngoEmptyState');

  if (!container || !window.NGO_DIRECTORY_DATA) return;

  // Pre-build search corpus once to avoid repeated string concatenation during typing
  const indexedNgos = window.NGO_DIRECTORY_DATA.map((ngo) => ({
    ngo,
    catPrimary: ngo.category.toLowerCase(),
    catsLower: ngo.categories.map((c) => c.toLowerCase()),
    searchBlob: [
      ngo.name,
      ngo.acronym,
      ngo.category,
      ...ngo.categories,
      ngo.location,
      ngo.description,
      ...ngo.activities.flatMap((a) => [a.title, a.desc]),
    ]
      .join(' ')
      .toLowerCase(),
  }));

  let activeCategory = 'all';
  let searchQuery = '';

  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category');
  if (paramCategory) {
    activeCategory = paramCategory.trim();
    filterButtons.forEach((btn) => {
      const cat = btn.getAttribute('data-ngo-filter');
      if (cat && cat.toLowerCase() === activeCategory.toLowerCase()) {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  }

  function renderDirectory() {
    const catNeedle = activeCategory.toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    const filtered = [];
    for (let i = 0; i < indexedNgos.length; i++) {
      const entry = indexedNgos[i];
      if (activeCategory !== 'all' && activeCategory !== 'All Organizations') {
        const primaryMatch = entry.catPrimary.includes(catNeedle);
        const secondaryMatch = entry.catsLower.some((c) => c.includes(catNeedle));
        if (!primaryMatch && !secondaryMatch) continue;
      }
      if (q && !entry.searchBlob.includes(q)) continue;
      filtered.push(entry.ngo);
    }

    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} of ${indexedNgos.length} Organizations`;
    }

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = filtered
      .map((ngo, index) => {
        const isFeatured = ngo.isFeatured ? 'featured-spotlight' : '';
        const verifiedBadge = `<span class="ngo-category-pill">${escapeHTML(ngo.category)}</span>`;
        const logoWrapperClass = ngo.expandLogo ? 'ngo-logo-wrapper ngo-logo-wrapper--expanded' : 'ngo-logo-wrapper';
        const loadingStrategy = index < 6 ? 'eager' : 'lazy';

        return `
        <article class="ngo-directory-card ${isFeatured}" id="card-${ngo.id}">
          <div>
            <div class="${logoWrapperClass}">
              <img src="${escapeHTML(ngo.logoUrl)}" alt="${escapeHTML(ngo.name)} official logo" class="ngo-logo-img" loading="${loadingStrategy}" decoding="async" />
            </div>

            <div class="ngo-card-header">
              ${verifiedBadge}
              <span class="ngo-acronym-badge">${escapeHTML(ngo.acronym)}</span>
            </div>

            <h2 class="ngo-card-title">${escapeHTML(ngo.name)}</h2>

            <div class="ngo-card-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${escapeHTML(ngo.location)}</span>
            </div>

            <p class="ngo-card-desc">
              ${escapeHTML(ngo.description)}
            </p>

            <div class="ngo-card-tags" aria-label="Welfare focus areas">
              ${ngo.categories.slice(0, 3).map((c) => `<span class="ngo-subtag">${escapeHTML(c)}</span>`).join('')}
            </div>
          </div>

          <div class="ngo-card-actions">
            <a href="ngo-detail.html?id=${encodeURIComponent(ngo.id)}" class="btn btn-outline btn-sm" aria-label="View organization details for ${escapeHTML(ngo.name)}">
              VIEW ORGANIZATION
            </a>
            <a href="donate.html?cause=${encodeURIComponent(ngo.primaryCause)}" class="btn btn-primary btn-sm" aria-label="Support cause for ${escapeHTML(ngo.name)}">
              SUPPORT CAUSE
            </a>
          </div>
        </article>
      `;
      })
      .join('');
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      activeCategory = btn.getAttribute('data-ngo-filter') || 'all';
      renderDirectory();
    });
  });

  if (searchInput) {
    let timerId = null;
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (timerId) window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        timerId = null;
        renderDirectory();
      }, 60);
    });
  }

  renderDirectory();
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
