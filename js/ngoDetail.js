/**
 * Give-AID Platform — NGO Detail View Controller
 * Dynamically binds organization details from window.NGO_DIRECTORY_DATA
 * based on the URL parameter ?id=...
 */

document.addEventListener('DOMContentLoaded', () => {
  initNgoDetailPage();
});

function initNgoDetailPage() {
  if (!window.NGO_DIRECTORY_DATA) return;

  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = urlParams.get('id') || 'edhi-foundation';

  const ngo = window.getNGOById ? window.getNGOById(requestedId) : window.NGO_DIRECTORY_DATA.find(n => n.id === requestedId);

  // Fallback to first NGO if ID not found
  const activeNgo = ngo || window.NGO_DIRECTORY_DATA[0];

  // Update Page Title
  document.title = `${activeNgo.name} — Give-AID | Associated NGOs`;

  // Breadcrumb
  const breadcrumbEl = document.getElementById('detailBreadcrumbName');
  if (breadcrumbEl) breadcrumbEl.textContent = activeNgo.name;

  // Header Logo
  const logoImgEl = document.getElementById('detailLogoImg');
  if (logoImgEl) {
    logoImgEl.decoding = 'async';
    logoImgEl.src = activeNgo.logoUrl;
    logoImgEl.alt = `${activeNgo.name} official logo`;
    if (logoImgEl.parentElement) {
      logoImgEl.parentElement.className = activeNgo.expandLogo
        ? 'ngo-detail-logo-box ngo-detail-logo-box--expanded'
        : 'ngo-detail-logo-box';
    }
  }

  const nameEl = document.getElementById('detailName');
  if (nameEl) nameEl.textContent = activeNgo.name;

  const catBadgeEl = document.getElementById('detailCategoryBadge');
  if (catBadgeEl) catBadgeEl.textContent = activeNgo.category;

  const taglineEl = document.getElementById('detailTagline');
  if (taglineEl) taglineEl.textContent = activeNgo.tagline;

  const locationEl = document.getElementById('detailLocation');
  if (locationEl) locationEl.textContent = activeNgo.location;

  const foundedEl = document.getElementById('detailFounded');
  if (foundedEl) foundedEl.textContent = activeNgo.founded || 'Public Record';

  // Website Links
  const topWebsiteBtn = document.getElementById('detailOfficialWebsiteBtn');
  if (topWebsiteBtn) {
    topWebsiteBtn.href = activeNgo.website;
  }

  const sidebarWebsiteLink = document.getElementById('detailWebsiteLink');
  if (sidebarWebsiteLink) {
    sidebarWebsiteLink.href = activeNgo.website;
  }

  // Donation Links
  const donateUrl = `donate.html?cause=${encodeURIComponent(activeNgo.primaryCause)}`;
  const topDonateBtn = document.getElementById('detailDonateTopBtn');
  if (topDonateBtn) topDonateBtn.href = donateUrl;

  const sidebarDonateBtn = document.getElementById('detailDonateSidebarBtn');
  if (sidebarDonateBtn) sidebarDonateBtn.href = donateUrl;

  // About & Operational Reach
  const aboutEl = document.getElementById('detailAbout');
  if (aboutEl) aboutEl.textContent = activeNgo.about;

  const coverageEl = document.getElementById('detailCoverage');
  if (coverageEl) coverageEl.textContent = activeNgo.areasOfOperation;

  const relatedProgEl = document.getElementById('detailRelatedProgTitle');
  if (relatedProgEl) relatedProgEl.textContent = activeNgo.relatedProgramme || 'Community Relief Drive';

  // Contact Information
  const hqEl = document.getElementById('detailHeadquarters');
  if (hqEl) hqEl.textContent = activeNgo.headquarters;

  const phoneEl = document.getElementById('detailPhone');
  if (phoneEl) {
    phoneEl.innerHTML = `<a href="tel:${activeNgo.phone.replace(/[^+\d]/g, '')}" style="color: inherit; text-decoration: underline;">${escapeHTML(activeNgo.phone)}</a>`;
  }

  const emailEl = document.getElementById('detailEmail');
  if (emailEl) {
    emailEl.innerHTML = `<a href="mailto:${activeNgo.email}" style="color: inherit; text-decoration: underline;">${escapeHTML(activeNgo.email)}</a>`;
  }

  const causeLabelEl = document.getElementById('detailCauseLabel');
  if (causeLabelEl) causeLabelEl.textContent = activeNgo.causeLabel || activeNgo.primaryCause;

  // Categories Tags
  const tagsContainer = document.getElementById('detailCategoriesTags');
  if (tagsContainer) {
    tagsContainer.innerHTML = activeNgo.categories.map(c => `
      <a href="ngos.html?category=${encodeURIComponent(c)}" class="ngo-subtag" style="text-decoration: none;">
        ${escapeHTML(c)}
      </a>
    `).join('');
  }

  // Activities Cards
  const activitiesContainer = document.getElementById('detailActivitiesList');
  if (activitiesContainer && activeNgo.activities) {
    activitiesContainer.innerHTML = activeNgo.activities.map((act, idx) => `
      <div class="ngo-activity-card">
        <div style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: var(--accent-primary); margin-bottom: 8px;">
          0${idx + 1}. ${escapeHTML(act.title)}
        </div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0;">
          ${escapeHTML(act.desc)}
        </p>
      </div>
    `).join('');
  }

  // Render 3 Related NGOs
  const relatedContainer = document.getElementById('detailRelatedNgos');
  if (relatedContainer) {
    const others = window.NGO_DIRECTORY_DATA.filter(n => n.id !== activeNgo.id);
    const related = others.slice(0, 3);

    relatedContainer.innerHTML = related.map(n => `
      <article class="ngo-directory-card">
        <div>
          <div class="${n.expandLogo ? 'ngo-logo-wrapper ngo-logo-wrapper--expanded' : 'ngo-logo-wrapper'}">
            <img src="${escapeHTML(n.logoUrl)}" alt="${escapeHTML(n.name)} official logo" class="ngo-logo-img" loading="lazy" />
          </div>

          <div class="ngo-card-header">
            <span class="ngo-category-pill">${escapeHTML(n.category)}</span>
            <span class="ngo-acronym-badge">${escapeHTML(n.acronym)}</span>
          </div>

          <h3 class="ngo-card-title">${escapeHTML(n.name)}</h3>

          <div class="ngo-card-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${escapeHTML(n.location)}</span>
          </div>

          <p class="ngo-card-desc">
            ${escapeHTML(n.description)}
          </p>
        </div>

        <div class="ngo-card-actions">
          <a href="ngo-detail.html?id=${encodeURIComponent(n.id)}" class="btn btn-outline btn-sm">
            VIEW ORGANIZATION
          </a>
          <a href="donate.html?cause=${encodeURIComponent(n.primaryCause)}" class="btn btn-primary btn-sm">
            SUPPORT CAUSE
          </a>
        </div>
      </article>
    `).join('');
  }
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
