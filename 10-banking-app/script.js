// ===============================
// !    Global variables
// ===============================

// *****************************
//        ! LOGIN
// *****************************

// ? generic
let usersKey = JSON.parse(localStorage.getItem('users'));
let isUserExisting = false;

// ? login
let btnLogin = document.getElementById('btn-submit');
let uID = document.getElementById('email');
let uPW = document.getElementById('password');

// ? pincode modal
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
    // ? this section validate user's details
    for (let i = 0; i < usersKey.length; i++) {
      // ? obj represents one object per array
      let obj = usersKey[i];
      // ? will validate username and password
      if (uID.value === obj.email && uPW.value === obj.password.toString()) {
        displayAlert(`Welcome, ${obj.fullName}!`);
        // ? loads user dashboard if successful
        window.location.href = 'user.html';
        return;
      } else {
        displayAlert(`Incorrect details. Login failed.`);
        return;
      }
    }
  }
}

// ? additional layer of security (for admin only)
function validatePinCode(pin) {
  console.log(pin);
  pin === '1234' ? (window.location.href = 'dashboard.html') : alert('Pin incorrect. Please try again.');
}

//   ===============================
// !     HELPERS
//   ===============================

// ? helper for alert
function displayAlert(msg) {
  return alert(msg);
}

// ? helper for console log
function log(x) {
  console.log(x);
}

//   ===============================
// !     EVENT LISTENERS
//   ===============================

window.onload = function () {};

// *****************************
//       ! LOGIN PAGE
// *****************************

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
// ? triggers function once pin is entered
txtPin.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    validatePinCode(txtPin.value);
  }
});
