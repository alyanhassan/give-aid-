/**
 * Give-AID Platform — User Accounts, Registration, Login & Profile Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initRegistration();
  initLogin();
  initPasswordToggles();
  initUserProfile();
  initDonationHistory();
  initInterestRegistration();
});

/* Password Visibility Toggles */
function initPasswordToggles() {
  document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-toggle-password');
      const input = document.getElementById(targetId);
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'Hide';
      } else {
        input.type = 'password';
        btn.textContent = 'Show';
      }
    });
  });
}

/* Registration Form */
function initRegistration() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelectorAll('.form-error').forEach((err) => err.classList.remove('visible'));

    let isValid = true;
    const name = document.getElementById('regName')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim();
    const phone = document.getElementById('regPhone')?.value.trim();
    const password = document.getElementById('regPassword')?.value;
    const confirmPassword = document.getElementById('regConfirmPassword')?.value;
    const city = document.getElementById('regCity')?.value.trim();
    const occupation = document.getElementById('regOccupation')?.value.trim();
    const terms = document.getElementById('regTerms')?.checked;

    if (!name || name.length < 2) {
      showError('errRegName', 'Please enter your full name.');
      isValid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('errRegEmail', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!phone || phone.length < 10) {
      showError('errRegPhone', 'Please enter a valid contact phone number.');
      isValid = false;
    }

    if (!password || password.length < 6) {
      showError('errRegPassword', 'Password must be at least 6 characters long.');
      isValid = false;
    }

    if (password !== confirmPassword) {
      showError('errRegConfirmPassword', 'Passwords do not match.');
      isValid = false;
    }

    if (!city) {
      showError('errRegCity', 'Please enter your city.');
      isValid = false;
    }

    if (!terms) {
      showError('errRegTerms', 'You must accept the terms and conditions.');
      isValid = false;
    }

    if (!isValid) return;

    const user = {
      fullName: name,
      email: email,
      phone: phone,
      city: city,
      occupation: occupation || 'Welfare Supporter',
      memberSince: 'November 2026',
    };

    sessionStorage.setItem('giveAidUser', JSON.stringify(user));
    if (window.showToast) window.showToast('Account created successfully! Redirecting to profile...', 'success');

    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 800);
  });
}

/* Login Form */
function initLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelectorAll('.form-error').forEach((err) => err.classList.remove('visible'));

    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('errLoginEmail', 'Please enter a valid email.');
      return;
    }

    if (!password) {
      showError('errLoginPassword', 'Please enter your password.');
      return;
    }

    // Default demo user if none exists
    let existingUser = null;
    try {
      existingUser = JSON.parse(sessionStorage.getItem('giveAidUser'));
    } catch (e) {}

    if (!existingUser) {
      existingUser = {
        fullName: 'Dr. Tariq Mansoor',
        email: email,
        phone: '0300-8459123',
        city: 'Lahore, Pakistan',
        occupation: 'Medical Consultant & Philanthropist',
        memberSince: 'January 2026',
      };
      sessionStorage.setItem('giveAidUser', JSON.stringify(existingUser));
    }

    if (window.showToast) window.showToast('Logged in successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 600);
  });
}

/* User Profile Management */
function initUserProfile() {
  const profileContainer = document.getElementById('userProfileContainer');
  if (!profileContainer) return;

  // Retrieve current user
  let user = {
    fullName: 'Dr. Tariq Mansoor',
    email: 'tariq.mansoor@example.org',
    phone: '0300-8459123',
    city: 'Lahore, Pakistan',
    occupation: 'Medical Consultant & Philanthropist',
    memberSince: 'January 2026',
  };

  try {
    const stored = JSON.parse(sessionStorage.getItem('giveAidUser'));
    if (stored) user = stored;
  } catch (e) {}

  // Populate profile fields
  const elName = document.getElementById('profName');
  const elEmail = document.getElementById('profEmail');
  const elPhone = document.getElementById('profPhone');
  const elCity = document.getElementById('profCity');
  const elOccupation = document.getElementById('profOccupation');
  const elMemberSince = document.getElementById('profMemberSince');
  const elAvatarInitial = document.getElementById('profAvatarInitial');

  if (elName) elName.textContent = user.fullName;
  if (elEmail) elEmail.textContent = user.email;
  if (elPhone) elPhone.textContent = user.phone;
  if (elCity) elCity.textContent = user.city;
  if (elOccupation) elOccupation.textContent = user.occupation;
  if (elMemberSince) elMemberSince.textContent = user.memberSince;
  if (elAvatarInitial) elAvatarInitial.textContent = user.fullName.charAt(0);

  // Edit Profile Modal
  const editProfileForm = document.getElementById('editProfileForm');
  if (editProfileForm) {
    const editName = document.getElementById('editFullName');
    const editEmail = document.getElementById('editEmail');
    const editPhone = document.getElementById('editPhone');
    const editCity = document.getElementById('editCity');
    const editOccupation = document.getElementById('editOccupation');

    if (editName) editName.value = user.fullName;
    if (editEmail) editEmail.value = user.email;
    if (editPhone) editPhone.value = user.phone;
    if (editCity) editCity.value = user.city;
    if (editOccupation) editOccupation.value = user.occupation;

    editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      user.fullName = editName?.value || user.fullName;
      user.email = editEmail?.value || user.email;
      user.phone = editPhone?.value || user.phone;
      user.city = editCity?.value || user.city;
      user.occupation = editOccupation?.value || user.occupation;

      sessionStorage.setItem('giveAidUser', JSON.stringify(user));
      if (window.closeAllModals) window.closeAllModals();
      if (window.showToast) window.showToast('Profile updated successfully!', 'success');
      setTimeout(() => window.location.reload(), 400);
    });
  }

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem('giveAidUser');
      if (window.showToast) window.showToast('You have been logged out.', 'info');
      setTimeout(() => (window.location.href = 'index.html'), 500);
    });
  }
}

/* Donation History Table */
function initDonationHistory() {
  const tableBody = document.getElementById('donationHistoryBody');
  if (!tableBody) return;

  // Default demonstration records
  const defaultHistory = [
    {
      reference: 'GA-2026-94821',
      date: '02 Nov 2026',
      cause: "Children's Welfare",
      amount: 5000,
      status: 'Completed',
      donorName: 'Dr. Tariq Mansoor',
    },
    {
      reference: 'GA-2026-81934',
      date: '18 Oct 2026',
      cause: 'Healthcare & Dialysis Support',
      amount: 10000,
      status: 'Completed',
      donorName: 'Dr. Tariq Mansoor',
    },
    {
      reference: 'GA-2026-77312',
      date: '04 Sep 2026',
      cause: 'Emergency Flood Relief Ration',
      amount: 2500,
      status: 'Completed',
      donorName: 'Dr. Tariq Mansoor',
    },
    {
      reference: 'GA-2026-62109',
      date: '15 Jul 2026',
      cause: "Women's Vocational Skill Centre",
      amount: 3000,
      status: 'Completed',
      donorName: 'Dr. Tariq Mansoor',
    },
  ];

  let history = defaultHistory;
  try {
    const stored = JSON.parse(sessionStorage.getItem('donationHistory'));
    if (stored && stored.length > 0) {
      history = [...stored, ...defaultHistory];
    }
  } catch (e) {}

  tableBody.innerHTML = '';
  history.forEach((rec) => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid var(--border-color)';
    const safeRef = escapeHTML(rec.reference || 'GA-2026-00000');
    const safeDate = escapeHTML(rec.date || '');
    const safeCause = escapeHTML(rec.cause || "Children's Welfare");
    const safeStatus = escapeHTML(rec.status || 'Completed');
    const safeAmount = parseInt(rec.amount, 10) || 0;

    tr.innerHTML = `
      <td style="padding: 16px 12px; font-weight: 700; font-family: var(--font-heading);">${safeRef}</td>
      <td style="padding: 16px 12px; color: var(--text-secondary); font-size: 0.875rem;">${safeDate}</td>
      <td style="padding: 16px 12px; font-weight: 600;">${safeCause}</td>
      <td style="padding: 16px 12px; font-weight: 700;">Rs. ${safeAmount.toLocaleString('en-PK')}</td>
      <td style="padding: 16px 12px;">
        <span style="color: var(--text-primary); background-color: var(--accent-light); padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700;">
          ${safeStatus}
        </span>
      </td>
      <td style="padding: 16px 12px; text-align: right;">
        <button class="btn btn-sm btn-outline view-receipt-btn" data-ref="${safeRef}" data-amount="${safeAmount}" data-cause="${safeCause}" data-date="${safeDate}">
          Receipt
        </button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  // Attach receipt modal click handlers
  document.querySelectorAll('.view-receipt-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const ref = btn.getAttribute('data-ref');
      const amount = btn.getAttribute('data-amount');
      const cause = btn.getAttribute('data-cause');
      const date = btn.getAttribute('data-date');

      const receiptModal = document.getElementById('receiptModal');
      if (receiptModal) {
        document.getElementById('receiptModalRef').textContent = ref;
        document.getElementById('receiptModalAmount').textContent = `Rs. ${parseInt(amount, 10).toLocaleString('en-PK')}`;
        document.getElementById('receiptModalCause').textContent = cause;
        document.getElementById('receiptModalDate').textContent = date;
        if (window.openModal) window.openModal('receiptModal');
      } else {
        window.location.href = `confirmation.html?ref=${ref}&amount=${amount}&cause=${encodeURIComponent(cause)}`;
      }
    });
  });
}

/* Programme Interest Registration */
function initInterestRegistration() {
  const form = document.getElementById('interestForm');
  if (!form) return;

  // Handle URL preselect for programme
  const urlParams = new URLSearchParams(window.location.search);
  const progParam = urlParams.get('prog');
  const progSelect = document.getElementById('interestProgramme');
  if (progParam && progSelect) {
    progSelect.value = progParam;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('interestName')?.value.trim();
    const email = document.getElementById('interestEmail')?.value.trim();
    const phone = document.getElementById('interestPhone')?.value.trim();
    const prog = progSelect?.value;

    if (!name || !email || !phone || !prog) {
      if (window.showToast) window.showToast('Please fill in all required fields.', 'error');
      return;
    }

    const confirmationBanner = document.getElementById('interestSuccessCard');
    if (confirmationBanner) {
      confirmationBanner.style.display = 'block';
      form.style.display = 'none';
    } else {
      if (window.showToast) window.showToast('Your interest has been registered! We will contact you soon.', 'success');
      form.reset();
    }
  });
}

function showError(id, message) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
    el.classList.add('visible');
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
