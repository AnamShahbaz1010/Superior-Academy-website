/**
 * Registration form field validators.
 * Returns an error message string when invalid, or null when valid.
 */

function validateFullName(value) {
  var trimmed = (value || '').trim();

  if (trimmed.length === 0) {
    return 'Full name is required.';
  }

  if (!/^[A-Za-z\s]+$/.test(trimmed)) {
    return 'Full name may only contain letters and spaces.';
  }

  if (trimmed.length < 2) {
    return 'Full name must be at least 2 characters.';
  }

  return null;
}

function validateEmail(value) {
  var trimmed = (value || '').trim();

  if (trimmed.length === 0) {
    return 'Email address is required.';
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
    return 'Please enter a valid email address (e.g. name@example.com).';
  }

  return null;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateFullName: validateFullName,
    validateEmail: validateEmail
  };
}
