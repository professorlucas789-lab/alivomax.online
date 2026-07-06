// Email validation utility
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation utility
export function isValidPassword(password) {
  return password && password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

// Phone number validation (US format)
export function isValidPhone(phone) {
  const phoneRegex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Credit card validation (Luhn algorithm)
export function isValidCreditCard(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// ZIP code validation (US)
export function isValidZipCode(zipCode) {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
}
