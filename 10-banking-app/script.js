// ===============================
//      Global variables
// ===============================

// ===============================
//      Functions
// ===============================
function logIn(form) {
  form.email.value === 'admin@finbank.com' && form.password.value == '1234' ? (form.action = 'dashboard.html') : alert('Incorrect login details!');
}

// ===============================
//      Event listeners
// ===============================
