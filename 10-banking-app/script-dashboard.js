// ===============================
//      GLOBAL VARIABLES
// ===============================

// generic variables - used by more than 1 functions
let userObj = JSON.parse(localStorage.getItem('users'));
// note: key is the key in an object for readability purposes
let key, FName, bal;
let isUserFound = true;

// top nav bar
let btnPayments = document.getElementsByClassName('pay-buttons');

// add user
let addUserModal = document.getElementById('add-modal');
let btnModal = document.getElementById('add-btn');
let btnAddUser = document.getElementById('btn-add-user');

// deposit
let depModal = document.getElementById('deposit-modal');
let btnModalDep = document.getElementById('deposit-btn');
// deposit window
let txtAcctNo = document.getElementById('account_no_dep');
let txtFName = document.getElementById('fullname_dep');
let txtBal = document.getElementById('balance_dep');

// side nav bar
let btnUserNav = document.getElementById('user-nav-btn');
let btnPayNav = document.getElementById('pay-nav-btn');

// ===============================
//      FUNCTIONS
// ===============================

function hideElements() {
  btnPayments[0].style.display = 'none';
  btnPayments[1].style.display = 'none';
  btnPayments[2].style.display = 'none';
}

// adding a new user
function addUser(form) {
  // 'users' = key
  let allUsers = {
    accountNo: form.account_no.value,
    fullName: form.fullname.value,
    balance: form.balance.value,
  };

  let userArr = [];

  if (localStorage.getItem('users') == null) {
    userArr.push(allUsers);
    localStorage.setItem('users', JSON.stringify(userArr));
  } else {
    userArr = JSON.parse(localStorage.getItem('users'));
    userArr.push(allUsers);
    localStorage.setItem('users', JSON.stringify(userArr));
  }
  console.log('Added a user');
}

// populates table with name and balance of user
function loadUserList() {
  let tbody = document.getElementById('tbody');
  // iterates keys and values of the users object
  for (let i = 0; i < userObj.length; i++) {
    let tr = '<tr>';
    tr += '<td>' + userObj[i].fullName + '</td>' + '<td>$' + userObj[i].balance + '</td></tr>';
    tbody.innerHTML += tr;
  }
}

function searchUser() {
  console.log(userObj);
  for (let i = 0; i < userObj.length; i++) {
    key = userObj[i];
    if (key.accountNo === txtAcctNo.value) {
      isUserFound = true;
      FName = key.fullName; // updates value of FName variable to details of the user found
      bal = key.balance;
      return;
    } else {
      isUserFound = false;
    }
  }

  // alerts when user doesnt exist otherwise, variable will remain to true value
  isUserFound == false ? alert("User doesn't exist") : (isUserFound = true);
}

// populates textfields based on the result of searchUser function
function populateUser() {
  txtFName.value = FName;
  txtBal.value = bal;
}

// ===============================
//      EVENT LISTENERS
// ===============================

// SIDE NAV BAR
// users button
btnUserNav.addEventListener('click', () => {
  console.log('users');
  btnModal.style.display = 'block'; //displays + add user button on top nav bar
  btnPayments[0].style.display = 'none'; // hides payments related buttons on top nav bar
  btnPayments[1].style.display = 'none';
  btnPayments[2].style.display = 'none';
});

// payments button
btnPayNav.addEventListener('click', () => {
  btnModal.style.display = 'none'; //hide + add user button on top nav bar
  btnPayments[0].style.display = 'block'; // displays payments related buttons on top nav bar
  btnPayments[1].style.display = 'block';
  btnPayments[2].style.display = 'block';
});

// ADD USER
// using regular function
btnModal.onclick = function () {
  addUserModal.style.display = 'block';

  // modal(s) will be closed if user clicks anywhere outside of it
  window.onclick = function (e) {
    e.target == addUserModal ? (addUserModal.style.display = 'none') : null;
  };
};

window.onload = function () {
  hideElements();
  loadUserList();
};

// DEPOSIT
// sample of using arrow function
btnModalDep.addEventListener('click', () => {
  currentModal = 'depModal';
  depModal.style.display = 'block';

  // modal(s) will be closed if user clicks anywhere outside of it
  window.onclick = function (e) {
    e.target == depModal ? (depModal.style.display = 'none') : null;
  };
});

// execute a function when user releases key on keyboard
txtAcctNo.addEventListener('keyup', (e) => {
  // triggers when user presses enter
  if (e.code === 'Enter') {
    searchUser();
    populateUser();
  }
});
