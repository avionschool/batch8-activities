// ===============================
//      Global variables
// ===============================
let btnLogin = document.getElementById('btn-submit');
let uID = document.getElementById('email');
let uPW = document.getElementById('password');

// ===============================
//      Functions
// ===============================
function logIn() {
  if (uID.value === 'admin@finbank.com' && uPW.value === '1234') {
    window.location.href = 'dashboard.html';
  } else {
    alert('Incorrect login details!');
  }
}
// ===============================
//      Event listeners
// ===============================
btnLogin.addEventListener('click', () => {
  logIn();
});
