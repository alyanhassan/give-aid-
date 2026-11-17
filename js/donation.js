/**
 * Give-AID Platform — Donation Workflow & Card Simulation
 * Handles preset amounts, card formatting, live card preview, validation, and submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDonationForm();
});

function initDonationForm() {
  const form = document.getElementById('donationForm');
  if (!form) return;

  const amountButtons = document.querySelectorAll('.amount-btn');
  const customAmountInput = document.getElementById('customAmount');
  const causeSelect = document.getElementById('donationCause');
  const anonymousCheckbox = document.getElementById('isAnonymous');
  const donorNameInput = document.getElementById('donorFullName');

  // Summary elements
  const summaryCause = document.getElementById('summaryCause');
  const summaryAmount = document.getElementById('summaryAmount');
  const summaryTotal = document.getElementById('summaryTotal');

  // Card input elements
  const cardHolderInput = document.getElementById('cardHolderName');
  const cardNumberInput = document.getElementById('cardNumber');
  const cardExpiryInput = document.getElementById('cardExpiry');
  const cardCvvInput = document.getElementById('cardCvv');

  // Card preview visualizer elements
  const previewName = document.getElementById('previewCardHolder');
  const previewNumber = document.getElementById('previewCardNumber');
  const previewExpiry = document.getElementById('previewCardExpiry');

  // State
  let currentAmount = 2500;

  // Handle URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const paramAmount = urlParams.get('amount');
  const paramCause = urlParams.get('cause');

  if (paramCause && causeSelect) {
    let matched = false;
    const lowerParam = paramCause.toLowerCase().trim();
    for (let i = 0; i < causeSelect.options.length; i++) {
      const optVal = causeSelect.options[i].value.toLowerCase();
      if (optVal === lowerParam || optVal.includes(lowerParam) || lowerParam.includes(optVal)) {
        causeSelect.selectedIndex = i;
        matched = true;
        break;
      }
    }
    if (!matched) {
      const customOpt = document.createElement('option');
      customOpt.value = paramCause;
      customOpt.textContent = `${paramCause} Welfare Fund`;
      customOpt.selected = true;
      causeSelect.appendChild(customOpt);
    }
    if (summaryCause) {
      summaryCause.textContent = causeSelect.value;
    }
  }

  if (paramAmount) {
    const parsedAmount = parseInt(paramAmount, 10);
    if (!isNaN(parsedAmount) && parsedAmount >= 100) {
      currentAmount = parsedAmount;
    }
  }

  updateAmountUI(currentAmount);

  // Preset button clicks
  amountButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = parseInt(btn.getAttribute('data-value') || '0', 10);
      currentAmount = val;
      if (customAmountInput) customAmountInput.value = '';
      updateAmountUI(currentAmount);
    });
  });

  // Custom amount typing
  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      const val = parseInt(customAmountInput.value, 10);
      if (!isNaN(val) && val > 0) {
        currentAmount = val;
        amountButtons.forEach((b) => b.classList.remove('active'));
        updateSummary();
      }
    });
  }

  // Cause select change
  if (causeSelect) {
    causeSelect.addEventListener('change', () => {
      updateSummary();
    });
  }

  // Anonymous toggle
  if (anonymousCheckbox && donorNameInput) {
    anonymousCheckbox.addEventListener('change', () => {
      if (anonymousCheckbox.checked) {
        donorNameInput.value = 'Anonymous Donor';
        donorNameInput.setAttribute('readonly', 'true');
        if (previewName) previewName.textContent = 'GIVE-AID SUPPORTER';
      } else {
        donorNameInput.value = '';
        donorNameInput.removeAttribute('readonly');
        if (previewName) previewName.textContent = 'YOUR NAME HERE';
      }
    });
  }

  // Live Card Visualizer
  if (cardHolderInput && previewName) {
    cardHolderInput.addEventListener('input', () => {
      const val = cardHolderInput.value.trim();
      previewName.textContent = val ? val.toUpperCase() : 'YOUR NAME HERE';
    });
  }

  if (cardNumberInput && previewNumber) {
    cardNumberInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').slice(0, 16);
      let formatted = '';
      for (let i = 0; i < val.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += val[i];
      }
      e.target.value = formatted;
      previewNumber.textContent = formatted.length > 0 ? formatted : '•••• •••• •••• ••••';
    });
  }

  if (cardExpiryInput && previewExpiry) {
    cardExpiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
      previewExpiry.textContent = val.length > 0 ? val : 'MM/YY';
    });
  }

  if (cardCvvInput) {
    cardCvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });
  }

  function updateAmountUI(amount) {
    let matched = false;
    amountButtons.forEach((btn) => {
      if (parseInt(btn.getAttribute('data-value'), 10) === amount) {
        btn.classList.add('active');
        matched = true;
      } else {
        btn.classList.remove('active');
      }
    });

    if (!matched && customAmountInput) {
      customAmountInput.value = amount;
    }

    updateSummary();
  }

  function updateSummary() {
    const formatted = `Rs. ${currentAmount.toLocaleString('en-PK')}`;
    if (summaryAmount) summaryAmount.textContent = formatted;
    if (summaryTotal) summaryTotal.textContent = formatted;
    if (summaryCause && causeSelect) {
      summaryCause.textContent = causeSelect.value || "Children's Welfare";
    }
  }

  // Submission & Validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear existing errors
    document.querySelectorAll('.form-error').forEach((err) => err.classList.remove('visible'));

    let hasError = false;

    const fullName = donorNameInput?.value.trim() || '';
    const email = document.getElementById('donorEmail')?.value.trim() || '';
    const phone = document.getElementById('donorPhone')?.value.trim() || '';
    const cause = causeSelect?.value || '';
    const cardHolder = cardHolderInput?.value.trim() || '';
    const cardNumber = cardNumberInput?.value.replace(/\s/g, '') || '';
    const cardExpiry = cardExpiryInput?.value.trim() || '';
    const cardCvv = cardCvvInput?.value.trim() || '';

    if (!fullName) {
      showFieldError('errorFullName', 'Please enter your name.');
      hasError = true;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFieldError('errorEmail', 'Please enter a valid email address.');
      hasError = true;
    }

    if (!phone || phone.length < 10) {
      showFieldError('errorPhone', 'Please enter a valid contact phone number.');
      hasError = true;
    }

    if (!cause) {
      showFieldError('errorCause', 'Please select a cause.');
      hasError = true;
    }

    if (currentAmount < 100) {
      showFieldError('errorAmount', 'Minimum donation amount is Rs. 100.');
      hasError = true;
    }

    if (!cardHolder) {
      showFieldError('errorCardHolder', 'Please enter the name on the card.');
      hasError = true;
    }

    if (cardNumber.length < 15) {
      showFieldError('errorCardNumber', 'Please enter a valid 16-digit card number.');
      hasError = true;
    }

    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(cardExpiry)) {
      showFieldError('errorCardExpiry', 'Enter MM/YY (e.g. 12/28).');
      hasError = true;
    }

    if (cardCvv.length < 3) {
      showFieldError('errorCardCvv', 'Enter 3 or 4 digit CVV.');
      hasError = true;
    }

    if (hasError) {
      if (window.showToast) window.showToast('Please fix the errors indicated in the form.', 'error');
      return;
    }

    // Simulate Processing State
    const submitBtn = document.getElementById('submitDonationBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span style="display:inline-block; animation: spin 1s infinite linear;">↻</span>
      Processing Secure Donation...
    `;

    setTimeout(() => {
      // Generate transaction details
      const year = new Date().getFullYear();
      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const reference = `GA-${year}-${randomSuffix}`;
      const now = new Date();
      const dateFormatted = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      const donationData = {
        reference,
        amount: currentAmount,
        cause,
        donorName: anonymousCheckbox && anonymousCheckbox.checked ? 'Anonymous Donor' : fullName,
        donorEmail: email,
        donorPhone: phone,
        date: dateFormatted,
        isAnonymous: anonymousCheckbox ? anonymousCheckbox.checked : false,
        message: document.getElementById('donorMessage')?.value.trim() || 'General Humanitarian Welfare Contribution',
      };

      // Store in sessionStorage for the confirmation view
      sessionStorage.setItem('lastDonation', JSON.stringify(donationData));

      // Append to donation history demo records
      let history = [];
      try {
        history = JSON.parse(sessionStorage.getItem('donationHistory') || '[]');
      } catch (err) {
        history = [];
      }
      history.unshift({
        reference,
        date: dateFormatted,
        cause,
        amount: currentAmount,
        status: 'Completed',
        donorName: donationData.donorName,
      });
      sessionStorage.setItem('donationHistory', JSON.stringify(history));

      // Redirect to confirmation page
      window.location.href = `confirmation.html?ref=${reference}`;
    }, 900);
  });

  function showFieldError(id, msg) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = msg;
      el.classList.add('visible');
    }
  }
}
