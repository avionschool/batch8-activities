// ===============================
//      GLOBAL VARIABLES
// ===============================

// generic variables - used by more than 1 functions
let userObj = JSON.parse(localStorage.getItem('users'));
let usersKey = localStorage.getItem('users'); // gets existing data
// note: key is the key in an object for readability purposes
let key, FName, bal, AcctNum, runningBal;
let isUserFound = true;
let isMoneyEnough = true;

// top nav bar
let btnPayments = document.getElementsByClassName('pay-buttons');

// side nav bar
let btnUserNav = document.getElementById('user-nav-btn');
let btnPayNav = document.getElementById('pay-nav-btn');

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
let txtAcctNo = document.getElementById('account_no_dep'); // this variable gets re-used by other features and gets re-assigned to another element
let txtFName = document.getElementById('fullname_dep');
let txtAmt = document.getElementById('amount_dep');
let txtBalDep = document.getElementById('balance_dep');
let btnAddDep = document.getElementById('btn-deposit');

// withdraw
let withModal = document.getElementById('withdraw-modal');
let btnModalWith = document.getElementById('withdraw-btn');
// withdraw window
let txtAccNoW = document.getElementById('account_no_with');
let txtAmtW = document.getElementById('amount_with');
let btnWith = document.getElementById('btn-withdraw');

// send money
let sendModal = document.getElementById('send-money-modal');
let btnModalSend = document.getElementById('send-money-btn');
// sender
let txtSender = document.getElementById('account-no-from');
let isUsingSend = true; // later on will be used whether to change color of sender's or receiver's textbox to green

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

// adds deposited amount to user's balance
function depositMoney() {
  runningBal = bal + parseFloat(txtAmt.value);
}

// updates balance of user after entering a new amount
function updateBalance() {
  console.table(usersKey);
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

function withdrawMoney() {
  // error handling - checks if there's enough balance to withdraw
  parseFloat(txtAmtW.value) > bal ? (isMoneyEnough = false) : (isMoneyEnough = true);

  // updates value of variable to re-use update balance function
  txtAmt = document.getElementById('amount_with');

  // displays message if balance is not suffi cient or will update balance
  if (isMoneyEnough == false) {
    alert('Insufficient balance');
    return;
  } else {
    // deducts withdrawal amount from balance then passes on to running bal variable & calls update balance function
    runningBal = bal - parseFloat(txtAmtW.value);
    updateBalance();
    populateUser();
  }
}

function sendMoney() {
  // highlights sender/receiver's textbox when user is found
  // for user-friendly purposes
  function highlightTxtbox() {
    if (isUsingSend == true) {
      if (isUserFound == true) {
        txtAcctNo.style.backgroundColor = '#81DA77';
      } else {
        txtAcctNo.style.backgroundColor = '#FAE1E1';
      }
    } else {
      if (isUserFound == true) {
        txtAcctNo.style.backgroundColor = '#81DA77';
      } else {
        txtAcctNo.style.backgroundColor = '#FAE1E1';
      }
    }
  }
  highlightTxtbox();
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
// displays add user modal
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
  // displays deposit modal
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
  depositMoney();
  updateBalance();
  populateUser();
});

// WITHDRAW
btnModalWith.addEventListener('click', () => {
  // displays withdraw modal
  withModal.style.display = 'block';

  // modal(s) will be closed if user clicks anywhere outside of it
  window.onclick = function (e) {
    e.target == withModal ? (withModal.style.display = 'none') : null;
  };
});

txtAccNoW.addEventListener('keyup', (e) => {
  // re-assigns value to variables for function re-usability
  // this will allow search user function to be re-used
  txtAcctNo = document.getElementById('account_no_with');
  txtFName = document.getElementById('fullname_with');
  txtBalDep = document.getElementById('balance_with');

  if (e.code === 'Enter') {
    searchUser();
    populateUser();
  }
});

// submit button on withdraw button
btnWith.addEventListener('click', () => {
  withdrawMoney();
});

// SEND MONEY
btnModalSend.addEventListener('click', () => {
  sendModal.style.display = 'block';

  // modal(s) will be closed if user clicks anywhere outside of it
  window.onclick = function (e) {
    e.target == sendModal ? (sendModal.style.display = 'none') : null;
  };
});

// triggers function to search for sender's details
txtSender.addEventListener('keyup', (e) => {
  // re-assigns value to variables for function re-usability
  // this will allow search user function to be re-used
  txtAcctNo = document.getElementById('account-no-from');
  // see above for description
  isUsingSend = true;
  if (e.code === 'Enter') {
    searchUser();
    sendMoney();
  }
});
