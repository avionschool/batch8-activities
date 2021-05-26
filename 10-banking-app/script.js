// ===============================
//      Global variables
// ===============================
let btnLogin = document.getElementById('btn-submit');
let uID = document.getElementById('email');
let uPW = document.getElementById('password');

// pincode modal
let modalPin = document.getElementById('pin-modal');
let txtPin = document.querySelector('#pincode');

// ===============================
//      Functions
// ===============================
function logIn() {
  // checks first if the credentials entered belongs to an admin
  if (uID.value === 'admin@finbank.com' && uPW.value === '1234') {
    // if it belong to an admin the pincode will popup asking for a 4 digit pincode
    modalPin.classList.add('show');
    modalPin.classList.remove('hide');

    // window.location.href = 'dashboard.html';
  } else {
    // alert('Incorrect login details!');
  }
}
// ===============================
//      Event listeners
// ===============================

window.onload = function () {};

// triggers login function
btnLogin.addEventListener('click', () => {
  logIn();

  // closes modal if clicked anywhere outside the window
  window.onclick = function (e) {
    if (e.target == modalPin) {
      modalPin.classList.add('hide');
      modalPin.classList.remove('show');
    }
  };
});

// triggers function once pin is entered
txtPin.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    logIn();
  }
});
