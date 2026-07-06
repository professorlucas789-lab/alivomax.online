import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidCreditCard,
  isValidZipCode,
} from '../../src/utils/validation';

describe('Email Validation', () => {
  test('should accept valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('john.doe@company.co.uk')).toBe(true);
    expect(isValidEmail('test123@domain.org')).toBe(true);
  });

  test('should reject invalid emails', () => {
    expect(isValidEmail('invalid.email')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('user @example.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('Password Validation', () => {
  test('should accept valid passwords', () => {
    expect(isValidPassword('SecurePass123')).toBe(true);
    expect(isValidPassword('MyPassword99')).toBe(true);
    expect(isValidPassword('Passw0rd')).toBe(true);
  });

  test('should reject passwords that are too short', () => {
    expect(isValidPassword('Short1')).toBe(false);
    expect(isValidPassword('P1')).toBe(false);
  });

  test('should reject passwords without uppercase', () => {
    expect(isValidPassword('password123')).toBe(false);
    expect(isValidPassword('nouppercas1')).toBe(false);
  });

  test('should reject passwords without numbers', () => {
    expect(isValidPassword('NoNumbers')).toBe(false);
    expect(isValidPassword('OnlyLetters')).toBe(false);
  });

  test('should reject empty password', () => {
    expect(isValidPassword('')).toBe(false);
    expect(isValidPassword(null)).toBe(false);
  });
});

describe('Phone Validation', () => {
  test('should accept valid US phone numbers', () => {
    expect(isValidPhone('2125551234')).toBe(true);
    expect(isValidPhone('212-555-1234')).toBe(true);
    expect(isValidPhone('(212) 555-1234')).toBe(true);
  });

  test('should reject invalid phone numbers', () => {
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPhone('12345')).toBe(false);
    expect(isValidPhone('invalid')).toBe(false);
    expect(isValidPhone('')).toBe(false);
  });
});

describe('Credit Card Validation', () => {
  test('should accept valid credit card numbers', () => {
    // Test with known valid Luhn numbers
    expect(isValidCreditCard('4532015112830366')).toBe(true);
    expect(isValidCreditCard('5425233010103442')).toBe(true);
  });

  test('should reject invalid credit card numbers', () => {
    expect(isValidCreditCard('4532015112830367')).toBe(false);
    expect(isValidCreditCard('123')).toBe(false);
    expect(isValidCreditCard('99999999999999')).toBe(false);
    expect(isValidCreditCard('')).toBe(false);
  });

  test('should accept cards with spaces and dashes', () => {
    expect(isValidCreditCard('4532-0151-1283-0366')).toBe(true);
    expect(isValidCreditCard('4532 0151 1283 0366')).toBe(true);
  });
});

describe('ZIP Code Validation', () => {
  test('should accept valid US ZIP codes', () => {
    expect(isValidZipCode('12345')).toBe(true);
    expect(isValidZipCode('12345-6789')).toBe(true);
    expect(isValidZipCode('10001')).toBe(true);
  });

  test('should reject invalid ZIP codes', () => {
    expect(isValidZipCode('1234')).toBe(false);
    expect(isValidZipCode('123456')).toBe(false);
    expect(isValidZipCode('ABC12')).toBe(false);
    expect(isValidZipCode('12345-')).toBe(false);
    expect(isValidZipCode('')).toBe(false);
  });
});
