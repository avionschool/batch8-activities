// ===============================
//      GLOBAL VARIABLES
// ===============================

// generic variables - used by more than 1 functions
let userObj = JSON.parse(localStorage.getItem('users'));
let usersKey = localStorage.getItem('users'); // gets existing data
// note: key is the key in an object for readability purposes
let key, FName, bal, AcctNum, runningBal;
let isUserFound = true;

// top nav bar
let btnPayments = document.getElementsByClassName('pay-buttons');

// add user
let addUserModal = document.getElementById('add-modal');
let btnModal = document.getElementById('add-btn');
let btnAddUser = document.getElementById('btn-add-user');
// add user window
let txtAcctNoU = document.getElementById('account_no');
let txtFNameU = document.getElementById('fullname');
let txtBal = document.getElementById('balance');

// deposit
let depModal = document.getElementById('deposit-modal');
let btnModalDep = document.getElementById('deposit-btn');
// deposit window
let txtAcctNo = document.getElementById('account_no_dep');
let txtFName = document.getElementById('fullname_dep');
let txtAmt = document.getElementById('amount_dep');
let txtBalDep = document.getElementById('balance_dep');
let btnAddDep = document.getElementById('btn-deposit');

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
function addUser() {
  // 'users' = key
  let allUsers = {
    accountNo: txtAcctNoU.value,
    fullName: txtFNameU.value,
    balance: txtBal.value,
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

  // console.log('added user');
}

// populates table with name and balance of user
function loadUserList() {
  let tbody = document.getElementById('tbody');
  // iterates keys and values of the users object
  for (let i = 0; i < userObj.length; i++) {
    let tr = '<tr>';
    tr += '<td>' + userObj[i].fullName + '</td>' + '<td>Php ' + userObj[i].balance + '</td></tr>';
    tbody.innerHTML += tr;
  }
}

// returns details of user
function searchUser() {
  for (let i = 0; i < userObj.length; i++) {
    key = userObj[i];
    if (key.accountNo === txtAcctNo.value) {
      isUserFound = true;
      FName = key.fullName; // updates value of FName variable to details of the user found
      AcctNum = key.accountNo;
      bal = parseFloat(key.balance);
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
  txtBalDep.value = bal;
}

// updates balance of user after entering a new amount
function updateBalance() {
  console.table(usersKey);
  runningBal = bal + parseFloat(txtAmt.value);
  bal = runningBal; // updates bal variable to the running balance
  for (let i = 0; i < userObj.length; i++) {
    key = userObj[i];
    if (key.accountNo === AcctNum) {
      // if no existing data, create an array
      // or, convert the localstorage string to an array
      usersKey = usersKey ? JSON.parse(usersKey) : [];

      // adds new data to localstorage Array
      usersKey[i].balance = runningBal.toString();
      // saves back to localstorage
      localStorage.setItem('users', JSON.stringify(usersKey));
    }
  }

  console.table(usersKey);
}

// ===============================
//      EVENT LISTENERS
// ===============================

// SIDE NAV BAR
// users button
btnUserNav.addEventListener('click', () => {
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

// submit button on deposit window
btnAddDep.addEventListener('click', () => {
  updateBalance();
  // for balance textbox to reflect running balance
  populateUser();
});
