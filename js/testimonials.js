/**
 * Give-AID Platform — Testimonials Review Modal & Interactive Controls (Vanilla JS)
 * Handles accessible 5-star rating selection, character counter, client-side validation,
 * keyboard focus trapping, and demonstration submission state.
 * Ready for future Java/JSP/Servlet (POST /api/ReviewServlet) + SQL Server integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  initReviewModal();
});

function initReviewModal() {
  const modal = document.getElementById('addReviewModal');
  const openBtn = document.getElementById('openReviewModalBtn');
  const form = document.getElementById('reviewForm');
  const successPanel = document.getElementById('reviewSuccessPanel');
  const doneBtn = document.getElementById('reviewDoneBtn');
  const submitBtn = document.getElementById('reviewSubmitBtn');

  if (!modal || !openBtn || !form || !successPanel) return;

  const fullNameInput = document.getElementById('reviewFullName');
  const emailInput = document.getElementById('reviewEmail');
  const roleSelect = document.getElementById('reviewRole');
  const locationInput = document.getElementById('reviewLocation');
  const ratingInput = document.getElementById('reviewRatingValue');
  const ratingStatus = document.getElementById('reviewRatingStatus');
  const starButtons = Array.from(modal.querySelectorAll('.star-rating-btn'));
  const reviewTextarea = document.getElementById('reviewText');
  const charCounter = document.getElementById('reviewCharCounter');

  const MIN_REVIEW_LENGTH = 20;
  const MAX_REVIEW_LENGTH = 400;
  const RATING_LABELS = {
    1: '1 out of 5 stars — Poor',
    2: '2 out of 5 stars — Fair',
    3: '3 out of 5 stars — Good',
    4: '4 out of 5 stars — Very Good',
    5: '5 out of 5 stars — Excellent',
  };

  let selectedRating = 0;
  let hoverRating = 0;
  let isSubmitting = false;
  let submitTimerId = null;

  /* ------------------------------------------------------------------------
     Star Rating Widget
     ------------------------------------------------------------------------ */
  function renderStars(previewValue = 0) {
    const activeValue = previewValue > 0 ? previewValue : selectedRating;

    starButtons.forEach((btn, idx) => {
      const value = idx + 1;
      const isSelected = value <= selectedRating;
      const isHovered = previewValue > 0 && value <= previewValue;

      btn.classList.toggle('is-active', isSelected && previewValue === 0);
      btn.classList.toggle('is-hover', isHovered);
      btn.setAttribute('aria-checked', String(value === selectedRating));

      // Roving tabindex: selected star or first star is keyboard tabbable
      const focusTargetValue = selectedRating > 0 ? selectedRating : 1;
      btn.setAttribute('tabindex', value === focusTargetValue ? '0' : '-1');
    });

    if (ratingStatus) {
      if (activeValue > 0) {
        ratingStatus.textContent = RATING_LABELS[activeValue];
      } else {
        ratingStatus.textContent = 'Select a rating';
      }
    }
  }

  function setRating(value, moveFocus = false) {
    const clamped = Math.max(1, Math.min(5, Number(value) || 0));
    selectedRating = clamped;
    if (ratingInput) ratingInput.value = String(clamped);
    hoverRating = 0;
    renderStars(0);
    clearFieldError('rating');

    if (moveFocus && starButtons[clamped - 1]) {
      starButtons[clamped - 1].focus();
    }
  }

  starButtons.forEach((btn, idx) => {
    const value = idx + 1;

    btn.addEventListener('click', () => {
      setRating(value, false);
    });

    btn.addEventListener('mouseenter', () => {
      hoverRating = value;
      renderStars(hoverRating);
    });

    btn.addEventListener('mouseleave', () => {
      hoverRating = 0;
      renderStars(0);
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        const next = selectedRating > 0 ? Math.min(5, selectedRating + 1) : Math.min(5, value + 1);
        setRating(next, true);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        const prev = selectedRating > 0 ? Math.max(1, selectedRating - 1) : Math.max(1, value - 1);
        setRating(prev, true);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setRating(1, true);
      } else if (e.key === 'End') {
        e.preventDefault();
        setRating(5, true);
      } else if (e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        setRating(Number(e.key), true);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setRating(value, false);
      }
    });
  });

  /* ------------------------------------------------------------------------
     Character Counter & Validation Helpers
     ------------------------------------------------------------------------ */
  function updateCharCounter() {
    if (!reviewTextarea || !charCounter) return;
    const len = reviewTextarea.value.length;
    charCounter.textContent = `${len} / ${MAX_REVIEW_LENGTH} characters (min ${MIN_REVIEW_LENGTH})`;
    charCounter.classList.toggle('is-valid', len >= MIN_REVIEW_LENGTH);
  }

  function showFieldError(fieldKey, message, controlEl) {
    const errEl = document.getElementById(`reviewError-${fieldKey}`);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
    }
    if (controlEl) {
      controlEl.classList.add('is-invalid');
      controlEl.setAttribute('aria-invalid', 'true');
    }
  }

  function clearFieldError(fieldKey, controlEl) {
    const errEl = document.getElementById(`reviewError-${fieldKey}`);
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
    if (controlEl) {
      controlEl.classList.remove('is-invalid');
      controlEl.removeAttribute('aria-invalid');
    }
  }

  function clearAllErrors() {
    clearFieldError('fullName', fullNameInput);
    clearFieldError('email', emailInput);
    clearFieldError('role', roleSelect);
    clearFieldError('location', locationInput);
    clearFieldError('rating');
    clearFieldError('reviewText', reviewTextarea);
  }

  function validateForm() {
    clearAllErrors();
    let firstInvalid = null;

    const fullName = fullNameInput ? fullNameInput.value.trim() : '';
    if (fullName.length < 2) {
      showFieldError('fullName', 'Please enter your full name (at least 2 characters).', fullNameInput);
      firstInvalid = firstInvalid || fullNameInput;
    }

    const email = emailInput ? emailInput.value.trim() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      showFieldError('email', 'Please enter a valid email address.', emailInput);
      firstInvalid = firstInvalid || emailInput;
    }

    const role = roleSelect ? roleSelect.value.trim() : '';
    if (!role) {
      showFieldError('role', 'Please select your role.', roleSelect);
      firstInvalid = firstInvalid || roleSelect;
    }

    const location = locationInput ? locationInput.value.trim() : '';
    if (location.length < 2) {
      showFieldError('location', 'Please enter your city or location.', locationInput);
      firstInvalid = firstInvalid || locationInput;
    }

    if (selectedRating < 1 || selectedRating > 5) {
      showFieldError('rating', 'Please select a star rating from 1 to 5.', null);
      firstInvalid = firstInvalid || starButtons[0];
    }

    const reviewBody = reviewTextarea ? reviewTextarea.value.trim() : '';
    if (reviewBody.length < MIN_REVIEW_LENGTH) {
      showFieldError(
        'reviewText',
        `Please share at least ${MIN_REVIEW_LENGTH} characters about your experience.`,
        reviewTextarea
      );
      firstInvalid = firstInvalid || reviewTextarea;
    } else if (reviewBody.length > MAX_REVIEW_LENGTH) {
      showFieldError(
        'reviewText',
        `Please keep your review within ${MAX_REVIEW_LENGTH} characters.`,
        reviewTextarea
      );
      firstInvalid = firstInvalid || reviewTextarea;
    }

    if (firstInvalid && typeof firstInvalid.focus === 'function') {
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  /* Clear field errors on user interaction */
  if (fullNameInput) fullNameInput.addEventListener('input', () => clearFieldError('fullName', fullNameInput));
  if (emailInput) emailInput.addEventListener('input', () => clearFieldError('email', emailInput));
  if (roleSelect) roleSelect.addEventListener('change', () => clearFieldError('role', roleSelect));
  if (locationInput) locationInput.addEventListener('input', () => clearFieldError('location', locationInput));
  if (reviewTextarea) {
    reviewTextarea.addEventListener('input', () => {
      updateCharCounter();
      clearFieldError('reviewText', reviewTextarea);
    });
  }

  /* ------------------------------------------------------------------------
     Modal Open, Close, Reset & Focus Trap
     ------------------------------------------------------------------------ */
  function resetModalState() {
    if (submitTimerId) {
      window.clearTimeout(submitTimerId);
      submitTimerId = null;
    }
    isSubmitting = false;
    form.reset();
    form.hidden = false;
    successPanel.hidden = true;
    selectedRating = 0;
    hoverRating = 0;
    if (ratingInput) ratingInput.value = '';
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
      submitBtn.textContent = 'SUBMIT REVIEW';
    }
    clearAllErrors();
    renderStars(0);
    updateCharCounter();
  }

  function getFocusableElements() {
    const selectors = [
      'a[href]',
      'button:not([disabled]):not([hidden])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    return Array.from(modal.querySelectorAll(selectors)).filter(
      (el) => el.offsetParent !== null && !el.closest('[hidden]')
    );
  }

  function openReviewModal() {
    resetModalState();
    if (typeof window.openModal === 'function') {
      window.openModal('addReviewModal');
    } else {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    window.requestAnimationFrame(() => {
      if (fullNameInput) fullNameInput.focus();
    });
  }

  function closeReviewModal() {
    if (!modal.classList.contains('active')) return;
    if (typeof window.closeAllModals === 'function') {
      window.closeAllModals();
    } else {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /* Sync cleanup + focus return whenever modal closes by any trigger (close button, backdrop, Escape) */
  const classObserver = new MutationObserver(() => {
    const isActive = modal.classList.contains('active');
    if (!isActive) {
      resetModalState();
      if (openBtn && document.activeElement !== openBtn) {
        openBtn.focus();
      }
    }
  });
  classObserver.observe(modal, { attributes: true, attributeFilter: ['class'] });

  openBtn.addEventListener('click', openReviewModal);
  if (doneBtn) doneBtn.addEventListener('click', closeReviewModal);

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeReviewModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = getFocusableElements();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ------------------------------------------------------------------------
     Form Submission (Frontend-Only Demonstration Flow)
     ------------------------------------------------------------------------ */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) return;

    isSubmitting = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
      submitBtn.textContent = 'SUBMITTING...';
    }

    /* Demonstration submission delay; replace with fetch(form.action, ...) for Java Servlet backend */
    submitTimerId = window.setTimeout(() => {
      isSubmitting = false;
      form.hidden = true;
      successPanel.hidden = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
        submitBtn.textContent = 'SUBMIT REVIEW';
      }
      if (doneBtn) doneBtn.focus();
    }, 550);
  });

  /* Initialize default star & counter UI */
  renderStars(0);
  updateCharCounter();
}
