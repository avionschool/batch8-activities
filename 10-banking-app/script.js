// ===============================
// !    Global variables
// ===============================
let btnLogin = document.getElementById('btn-submit');
let uID = document.getElementById('email');
let uPW = document.getElementById('password');

// pincode modal
let modalPin = document.getElementById('pin-modal');
let txtPin = document.querySelector('#pincode');

//   ===============================
// !    Functions
//   ===============================
function logIn() {
  // ? checks first if the credentials entered belongs to an admin
  if (uID.value === 'admin@finbank.com' && uPW.value === '1234') {
    // ? if it belong to an admin the pincode will popup asking for a 4 digit pincode
    modalPin.classList.add('show');
    modalPin.classList.remove('hide');
  } else {
    // ? calls function to validate user's details
    // ? if details aren't valid will display msg
  }
}

function validatePinCode(pin) {
  console.log(pin);
  pin === '1234' ? (window.location.href = 'dashboard.html') : alert('Pin incorrect. Please try again.');
}
//   ===============================
// !     Event listeners
//   ===============================

window.onload = function () {};

// ! Login button
// ? triggers login function
btnLogin.addEventListener('click', () => {
  logIn();

  // ? closes modal if clicked anywhere outside the window
  window.onclick = function (e) {
    if (e.target == modalPin) {
      modalPin.classList.add('hide');
      modalPin.classList.remove('show');
    }
  };
});

// ! pincode window
// triggers function once pin is entered
txtPin.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    validatePinCode(txtPin.value);
  }
});
