// ===============================
// !    Global variables
// ===============================

// ! README -- for other notes
// ? 1. window.onclick for modals - modal will be closed if user clicks anywhere outside of it
// ? 2.

// *****************************
// ! DASHBOARD
// *****************************

// ? navigation bar
let linkProfile = document.getElementById('profile-link');

// ? modals
let modalsUser = document.getElementsByClassName('modal');

// ? add expense
let btnModal = document.getElementById('add-btn');

// ? profile
let profileModal = document.getElementById('');

//   ===============================
// !    Functions
//   ===============================

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

// add expense
btnModal.onclick = function () {
  modalsUser[0].classList.add('show');
  modalsUser[0].classList.remove('hide');

  // modal will be closed if user clicks anywhere outside of it
  window.onclick = function (e) {
    if (e.target == modalsUser[0]) {
      modalsUser[0].classList.add('hide');
      modalsUser[0].classList.remove('show');
    }
  };
};

// ! profile
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
