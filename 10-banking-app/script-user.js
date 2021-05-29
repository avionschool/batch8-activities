// ===============================
// !    Global variables
// ===============================

// ! README -- for other notes
// ? 1. window.onclick for modals - modal will be closed if user clicks anywhere outside of it
// ? 2.

// *****************************
// ! DASHBOARD
// *****************************

// ? generic variables
let usersKey = JSON.parse(localStorage.getItem('users'));

let userEmail;

// ? navigation bar
let linkProfile = document.getElementById('profile-link');

// ? modals
let modalsUser = document.getElementsByClassName('modal');

// ? add expense
let btnModal = document.getElementById('add-btn');

// ? profile
// let profileModal = document.getElementById('');

//   ===============================
// !    Functions
//   ===============================

class User {
  // ? returns all values stored in users key (array of objects)
  static getUsers() {
    // ? if no existing data
    // ? will create an empty array
    // ? or convert key to string
    if (localStorage.getItem('users') === null) {
      usersKey = [];
    } else {
      usersKey = JSON.parse(localStorage.getItem('users'));
    }
    return usersKey;
  }

  // ? returns the email of user who has a true isLoggedin status
  static retreiveUserData(isLoggedIn) {
    const users = User.getUsers();
    for (let i = 0; i < users.length; i++) {
      // ? represents one obj in the array of objects
      let obj = users[i];
      isLoggedIn == obj.isLoggedIn ? (userEmail = obj.email) : null;
    }
    return userEmail;
  }
}

// ! functions invoked during onload
User.retreiveUserData(true);

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
// *****************************
//       ! DASHBOARD
// *****************************

// ! add expense
btnModal.addEventListener('click', () => {
  modalsUser[0].classList.add('show');
  modalsUser[0].classList.remove('hide');

  // modal will be closed if user clicks anywhere outside of it
  window.onclick = function (e) {
    if (e.target == modalsUser[0]) {
      modalsUser[0].classList.add('hide');
      modalsUser[0].classList.remove('show');
    }
  };
});

// ! edit profile
// nav link
linkProfile.addEventListener('click', () => {
  modalsUser[1].classList.add('show');
  modalsUser[1].classList.remove('hide');

  // see readme above (1)
  window.onclick = function (e) {
    if (e.target == modalsUser[1]) {
      modalsUser[1].classList.add('hide');
      modalsUser[1].classList.remove('show');
    }
  };
});
