var test = require('node:test');
var assert = require('node:assert/strict');
var validators = require('./registration-validation');

test('validateFullName accepts valid names', function () {
  assert.equal(validators.validateFullName('John Doe'), null);
  assert.equal(validators.validateFullName('Ab'), null);
  assert.equal(validators.validateFullName('  Mary Ann  '), null);
});

test('validateFullName rejects invalid names', function () {
  assert.equal(validators.validateFullName(''), 'Full name is required.');
  assert.equal(validators.validateFullName('   '), 'Full name is required.');
  assert.equal(validators.validateFullName('A'), 'Full name must be at least 2 characters.');
  assert.equal(validators.validateFullName('John123'), 'Full name may only contain letters and spaces.');
  assert.equal(validators.validateFullName('Jane-Doe'), 'Full name may only contain letters and spaces.');
});

test('validateEmail accepts valid emails', function () {
  assert.equal(validators.validateEmail('name@example.com'), null);
  assert.equal(validators.validateEmail('user.name+tag@domain.co.uk'), null);
  assert.equal(validators.validateEmail('  test@mail.org  '), null);
});

test('validateEmail rejects invalid emails', function () {
  assert.equal(validators.validateEmail(''), 'Email address is required.');
  assert.equal(validators.validateEmail('   '), 'Email address is required.');
  assert.equal(validators.validateEmail('not-an-email'), 'Please enter a valid email address (e.g. name@example.com).');
  assert.equal(validators.validateEmail('missing@domain'), 'Please enter a valid email address (e.g. name@example.com).');
  assert.equal(validators.validateEmail('@example.com'), 'Please enter a valid email address (e.g. name@example.com).');
});
