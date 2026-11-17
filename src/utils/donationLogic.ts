/**
 * Give-AID Platform Core Business & Validation Logic
 * Decoupled pure functions for calculations, formatting, and validation.
 */

export interface DonorInfo {
  fullName: string;
  email: string;
  phone: string;
  amount: number;
  cause: string;
  isAnonymous?: boolean;
  message?: string;
}

export interface CardPaymentInfo {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface DonationRecord {
  reference: string;
  date: string;
  cause: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  donorName: string;
  isAnonymous: boolean;
}

/**
 * Format currency amount in Pakistani Rupees (PKR)
 */
export function formatPKR(amount: number): string {
  if (isNaN(amount) || amount < 0) return 'Rs. 0';
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

/**
 * Generate a unique, professional transaction reference for donations
 */
export function generateDonationReference(prefix = 'GA'): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${randomSuffix}`;
}

/**
 * Validate Pakistani & International phone numbers
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Accepts standard Pakistani formats (e.g., 03001234567, +923001234567) or general 10-15 digit numbers
  const phoneRegex = /^(\+92|0)?3[0-9]{9}$|^(\+[1-9]{1}[0-9]{1,14})$/;
  return phoneRegex.test(cleaned) || cleaned.length >= 10;
}

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Format credit card number with spaces every 4 digits
 */
export function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  const parts = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.substring(i, i + 4));
  }
  return parts.join(' ');
}

/**
 * Validate card expiry date (MM/YY format, must not be expired)
 */
export function isValidCardExpiry(expiry: string, currentYear = 2026, currentMonth = 11): boolean {
  if (!expiry) return false;
  const match = expiry.trim().match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/);
  if (!match) return false;

  const month = parseInt(match[1], 10);
  const year = 2000 + parseInt(match[2], 10);

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  return true;
}

/**
 * Validate CVV (3 or 4 digits)
 */
export function isValidCVV(cvv: string): boolean {
  if (!cvv) return false;
  return /^\d{3,4}$/.test(cvv.trim());
}

/**
 * Validate donor information
 */
export function validateDonorInfo(donor: Partial<DonorInfo>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!donor.fullName || donor.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!donor.email || !isValidEmail(donor.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!donor.phone || !isValidPhone(donor.phone)) {
    errors.phone = 'Please provide a valid phone number.';
  }

  if (!donor.cause || donor.cause.trim() === '') {
    errors.cause = 'Please select a welfare cause.';
  }

  if (!donor.amount || donor.amount < 100) {
    errors.amount = 'Minimum donation amount is Rs. 100.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Filter items by category and search keyword
 */
export function filterItems<T extends { title?: string; name?: string; category?: string; description?: string }>(
  items: T[],
  categoryFilter: string,
  searchQuery: string
): T[] {
  const query = searchQuery.trim().toLowerCase();
  const cat = categoryFilter.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory =
      !cat || cat === 'all' || (item.category && item.category.toLowerCase() === cat);

    const textToSearch = `${item.title || ''} ${item.name || ''} ${item.description || ''}`.toLowerCase();
    const matchesQuery = !query || textToSearch.includes(query);

    return matchesCategory && matchesQuery;
  });
}
