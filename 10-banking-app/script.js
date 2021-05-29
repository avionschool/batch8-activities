// ===============================
// !    Global variables
// ===============================

// ! Readme

// 1. obj represents one object per array

// *****************************
//        ! LOGIN
// *****************************

// ? generic
let usersKey = JSON.parse(localStorage.getItem('users'));
let isUserValidated = false;
let fullName;
// let userEmail;

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
      // log(`${obj.email} ${obj.password}`);
      // log(uID.value);
      if (obj.email === uID.value && obj.password.toString() === uPW.value) {
        isUserValidated = true;
        fullName = obj.fullName;
        log(obj.email);
      }
    }

    if (isUserValidated == true) {
      // ? loads user dashboard and updates login status if successful
      displayAlert(`Welcome, ${fullName}!`);
      updateLogInStatus();
      window.location.href = 'user.html';
    } else {
      displayAlert(`Incorrect details. Login failed.`);
    }
  }
}

// ? additional layer of security (for admin only)
function validatePinCode(pin) {
  // console.log(pin);
  pin === '1234' ? (window.location.href = 'dashboard.html') : alert('Pin incorrect. Please try again.');
}

// ? updates logged in status to true
// ? later on will be used to check which user is logged in to populate user dashboard details
function updateLogInStatus() {
  // ? will perform search function first
  for (let i = 0; i < usersKey.length; i++) {
    // ? Readme (Item 1)
    let obj = usersKey[i];
    // ? searches for the key inside the object
    if (uID.value === obj.email) {
      // ? if no existing data
      // ? will create an empty array
      // ? or convert key to string
      if (localStorage.getItem('users') === null) {
        usersKey = [];
      } else {
        usersKey = JSON.parse(localStorage.getItem('users'));
      }
      // ? assigned value key
      usersKey[i].isLoggedIn = true;

      // ? updates key
      localStorage.setItem('users', JSON.stringify(usersKey));
      // displayAlert('Log in updates');
    }
  }
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

window.onload = function () {
  // userEmail = uID.value;
  // log('index email' + userEmail);
};

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
