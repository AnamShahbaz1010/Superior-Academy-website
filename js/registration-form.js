(function () {
  var validators = {
    fullName: validateFullName,
    email: validateEmail
  };

  function showFieldError(fieldId, message) {
    var errorEl = document.getElementById(fieldId + '-error');
    if (errorEl) {
      errorEl.textContent = message || '';
    }
  }

  function validateField(fieldId, value) {
    var validate = validators[fieldId];
    if (!validate) {
      return true;
    }

    var error = validate(value);
    showFieldError(fieldId, error);
    return error === null;
  }

  function validateForm(form) {
    var fullNameValid = validateField('fullName', form.fullName.value);
    var emailValid = validateField('email', form.email.value);
    return fullNameValid && emailValid;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.registration-form');
    if (!form) {
      return;
    }

    ['fullName', 'email'].forEach(function (fieldId) {
      var input = form.elements[fieldId];
      if (!input) {
        return;
      }

      input.addEventListener('input', function () {
        validateField(fieldId, input.value);
      });

      input.addEventListener('blur', function () {
        validateField(fieldId, input.value);
      });
    });

    form.addEventListener('submit', function (event) {
      if (!validateForm(form)) {
        event.preventDefault();
      }
    });

    form.addEventListener('reset', function () {
      window.setTimeout(function () {
        showFieldError('fullName', '');
        showFieldError('email', '');
      }, 0);
    });
  });
})();
