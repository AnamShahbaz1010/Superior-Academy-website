(function () {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('registration-form');
  const authTabs = document.querySelectorAll('.auth-tab');
  const formStatus = document.getElementById('form-status');

  if (!loginForm && !registerForm) return;

  const validators = {
    email(value) {
      if (!value.trim()) return 'Email address is required.';
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!pattern.test(value.trim())) return 'Please enter a valid email address.';
      return '';
    },

    password(value) {
      if (!value) return 'Password is required.';
      if (value.length < 6) return 'Password must be at least 6 characters.';
      return '';
    },

    fullName(value) {
      if (!value.trim()) return 'Full name is required.';
      if (value.trim().length < 2) return 'Full name must be at least 2 characters.';
      if (!/^[a-zA-Z\s.'-]+$/.test(value.trim())) {
        return 'Full name may only contain letters, spaces, and hyphens.';
      }
      return '';
    },

    phone(value) {
      if (!value.trim()) return 'Phone number is required.';
      const digits = value.replace(/[\s-]/g, '');
      const pattern = /^(\+92|0)?3[0-9]{9}$/;
      if (!pattern.test(digits)) {
        return 'Enter a valid Pakistani mobile number (e.g. 03001234567 or +923001234567).';
      }
      return '';
    },

    city(value) {
      if (!value.trim()) return '';
      if (value.trim().length < 2) return 'City name must be at least 2 characters.';
      return '';
    },

    select(value, label) {
      if (!value) return `Please ${label}.`;
      return '';
    },

    classMode(form) {
      if (!form.querySelector('input[name="classMode"]:checked')) {
        return 'Please select a preferred class mode.';
      }
      return '';
    },

    terms(checked) {
      if (!checked) return 'You must agree to the terms and conditions.';
      return '';
    },
  };

  function getFieldWrapper(field) {
    if (field.type === 'checkbox') {
      return field.closest('.form-field');
    }
    return field.closest('.form-field') || field.closest('.radio-group');
  }

  function showFieldError(field, message) {
    const wrapper = getFieldWrapper(field);
    if (!wrapper) return;

    wrapper.classList.add('has-error');
    wrapper.classList.remove('is-valid');

    let errorEl = wrapper.querySelector('.field-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'field-error';
      errorEl.setAttribute('role', 'alert');
      wrapper.appendChild(errorEl);
    }
    errorEl.textContent = message;
    field.setAttribute('aria-invalid', 'true');
  }

  function clearFieldError(field) {
    const wrapper = getFieldWrapper(field);
    if (!wrapper) return;

    wrapper.classList.remove('has-error');
    const errorEl = wrapper.querySelector('.field-error');
    if (errorEl) errorEl.remove();
    field.removeAttribute('aria-invalid');
  }

  function markFieldValid(field) {
    const wrapper = getFieldWrapper(field);
    if (!wrapper) return;

    wrapper.classList.remove('has-error');
    wrapper.classList.add('is-valid');
    field.removeAttribute('aria-invalid');
    const errorEl = wrapper.querySelector('.field-error');
    if (errorEl) errorEl.remove();
  }

  function showFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = 'form-status form-status--' + type;
    formStatus.hidden = false;
    formStatus.focus();
  }

  function hideFormStatus() {
    if (!formStatus) return;
    formStatus.hidden = true;
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }

  function validateLoginField(field) {
    const name = field.name;
    let error = '';

    if (name === 'loginEmail') error = validators.email(field.value);
    if (name === 'loginPassword') error = validators.password(field.value);

    if (error) {
      showFieldError(field, error);
      return false;
    }

    markFieldValid(field);
    return true;
  }

  function validateRegisterField(field) {
    const name = field.name;
    let error = '';

    switch (name) {
      case 'fullName':
        error = validators.fullName(field.value);
        break;
      case 'email':
        error = validators.email(field.value);
        break;
      case 'phone':
        error = validators.phone(field.value);
        break;
      case 'city':
        error = validators.city(field.value);
        break;
      case 'course':
        error = validators.select(field.value, 'select a course');
        break;
      case 'terms':
        error = validators.terms(field.checked);
        break;
      default:
        break;
    }

    if (error) {
      showFieldError(field, error);
      return false;
    }

    if (name !== 'newsletter') markFieldValid(field);
    return true;
  }

  function validateClassMode(form) {
    const error = validators.classMode(form);
    const fieldset = form.querySelector('.radio-group');
    const firstRadio = form.querySelector('input[name="classMode"]');

    if (error) {
      showFieldError(firstRadio, error);
      return false;
    }

    if (fieldset) {
      fieldset.classList.remove('has-error');
      fieldset.classList.add('is-valid');
      const errorEl = fieldset.querySelector('.field-error');
      if (errorEl) errorEl.remove();
    }
    return true;
  }

  function validateLoginForm() {
    hideFormStatus();
    const fields = loginForm.querySelectorAll('input[name="loginEmail"], input[name="loginPassword"]');
    let isValid = true;

    fields.forEach(function (field) {
      if (!validateLoginField(field)) isValid = false;
    });

    return isValid;
  }

  function validateRegisterForm() {
    hideFormStatus();
    const fields = registerForm.querySelectorAll(
      '#fullName, #email, #phone, #city, #course, #terms'
    );
    let isValid = true;

    fields.forEach(function (field) {
      if (!validateRegisterField(field)) isValid = false;
    });

    if (!validateClassMode(registerForm)) isValid = false;

    return isValid;
  }

  function clearFormValidation(form) {
    form.querySelectorAll('.has-error, .is-valid').forEach(function (el) {
      el.classList.remove('has-error', 'is-valid');
    });
    form.querySelectorAll('.field-error').forEach(function (el) {
      el.remove();
    });
    form.querySelectorAll('[aria-invalid]').forEach(function (el) {
      el.removeAttribute('aria-invalid');
    });
  }

  authTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = tab.dataset.tab;
      authTabs.forEach(function (t) {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });

      loginForm.hidden = target !== 'login';
      registerForm.hidden = target !== 'register';
      hideFormStatus();
    });
  });

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (validateLoginForm()) {
        showFormStatus('Login successful! Welcome back to Superior Academy.', 'success');
        loginForm.reset();
        clearFormValidation(loginForm);
      } else {
        showFormStatus('Please fix the errors below before logging in.', 'error');
      }
    });

    loginForm.addEventListener('blur', function (event) {
      const field = event.target;
      if (field.matches('input[name="loginEmail"], input[name="loginPassword"]')) {
        validateLoginField(field);
      }
    }, true);

    loginForm.addEventListener('input', function (event) {
      const field = event.target;
      if (field.matches('input[name="loginEmail"], input[name="loginPassword"]')) {
        clearFieldError(field);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (validateRegisterForm()) {
        showFormStatus('Registration submitted successfully! We will contact you shortly.', 'success');
        registerForm.reset();
        clearFormValidation(registerForm);
      } else {
        showFormStatus('Please fix the errors below before submitting.', 'error');
      }
    });

    registerForm.addEventListener('blur', function (event) {
      const field = event.target;
      if (field.matches('#fullName, #email, #phone, #city, #course, #terms')) {
        validateRegisterField(field);
      }
      if (field.matches('input[name="classMode"]')) {
        validateClassMode(registerForm);
      }
    }, true);

    registerForm.addEventListener('input', function (event) {
      const field = event.target;
      if (field.matches('#fullName, #email, #phone, #city, #course, #terms')) {
        clearFieldError(field);
      }
    });

    registerForm.addEventListener('change', function (event) {
      const field = event.target;
      if (field.matches('input[name="classMode"]')) {
        validateClassMode(registerForm);
      }
      if (field.matches('#course, #terms')) {
        validateRegisterField(field);
      }
    });

    registerForm.addEventListener('reset', function () {
      clearFormValidation(registerForm);
      hideFormStatus();
    });
  }
})();
