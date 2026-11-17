import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPKR,
  generateDonationReference,
  isValidPhone,
  isValidEmail,
  formatCardNumber,
  isValidCardExpiry,
  isValidCVV,
  validateDonorInfo,
  filterItems,
} from './donationLogic';

test('formatPKR correctly formats positive amounts and zero', () => {
  assert.equal(formatPKR(500), 'Rs. 500');
  assert.equal(formatPKR(2500), 'Rs. 2,500');
  assert.equal(formatPKR(100000), 'Rs. 100,000');
  assert.equal(formatPKR(0), 'Rs. 0');
  assert.equal(formatPKR(-50), 'Rs. 0');
});

test('generateDonationReference produces correct structure', () => {
  const ref = generateDonationReference('GA');
  assert.match(ref, /^GA-20\d\d-\d{5}$/);
});

test('isValidEmail validates emails properly', () => {
  assert.equal(isValidEmail('donor@example.com'), true);
  assert.equal(isValidEmail('karachi.welfare@giveaid.org'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('@example.com'), false);
  assert.equal(isValidEmail(''), false);
});

test('isValidPhone handles Pakistani and international phone numbers', () => {
  assert.equal(isValidPhone('03001234567'), true);
  assert.equal(isValidPhone('+923001234567'), true);
  assert.equal(isValidPhone('+14155552671'), true);
  assert.equal(isValidPhone('123'), false);
  assert.equal(isValidPhone(''), false);
});

test('formatCardNumber groups digits into fours', () => {
  assert.equal(formatCardNumber('4532112233445566'), '4532 1122 3344 5566');
  assert.equal(formatCardNumber('4532abc1122'), '4532 1122');
});

test('isValidCardExpiry checks expiration accurately against future dates', () => {
  assert.equal(isValidCardExpiry('12/28', 2026, 11), true);
  assert.equal(isValidCardExpiry('11/26', 2026, 11), true);
  assert.equal(isValidCardExpiry('10/26', 2026, 11), false); // Expired month in current year
  assert.equal(isValidCardExpiry('01/25', 2026, 11), false); // Past year
  assert.equal(isValidCardExpiry('invalid', 2026, 11), false);
});

test('isValidCVV validates 3 or 4 digits', () => {
  assert.equal(isValidCVV('123'), true);
  assert.equal(isValidCVV('9876'), true);
  assert.equal(isValidCVV('12'), false);
  assert.equal(isValidCVV('abcd'), false);
});

test('validateDonorInfo catches missing and invalid fields', () => {
  const invalid = validateDonorInfo({
    fullName: '',
    email: 'bad',
    phone: '12',
    cause: '',
    amount: 50,
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.cause);
  assert.ok(invalid.errors.amount);

  const valid = validateDonorInfo({
    fullName: 'Ahmed Khan',
    email: 'ahmed.khan@example.com',
    phone: '03001234567',
    cause: "Children's Welfare",
    amount: 2500,
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('filterItems filters by category and search keyword', () => {
  const causes = [
    { name: 'Clean Water Initiative', category: 'Healthcare', description: 'Safe drinking water plants' },
    { name: 'Street Children Education', category: 'Education', description: 'School kits and books' },
    { name: 'Emergency Food Aid', category: 'Emergency Assistance', description: 'Ration packs for families' },
  ];

  const filteredEdu = filterItems(causes, 'Education', '');
  assert.equal(filteredEdu.length, 1);
  assert.equal(filteredEdu[0].name, 'Street Children Education');

  const filteredSearch = filterItems(causes, 'all', 'water');
  assert.equal(filteredSearch.length, 1);
  assert.equal(filteredSearch[0].name, 'Clean Water Initiative');
});
