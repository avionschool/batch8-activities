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
let txtBalSend = document.getElementById('balance-sender');
let isUsingSend = true; // later on will be used whether to change color of sender's or receiver's textbox to green or red
// receiver
let txtReceiver = document.getElementById('account-no-to');
let txtBalRec = document.getElementById('balance-receiver');
// send button
let btnSendMoney = document.getElementById('btn-send');
let senderBal; // this later on will be used to check sender's balance is enough
let txtAmtSend = document.getElementById('amount-to-send');

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
  function searchUser() {
    if (localStorage.getItem('users') == null) {
      addSuccessful();
    } else {
      for (let i = 0; i < userObj.length; i++) {
        key = userObj[i];
        if (key.fullName === txtFNameU.value || key.accountNo === txtAcctNoU.value) {
          isUserFound = true;
          return;
        } else {
          isUserFound = false;
        }
      }
    }
  }

  searchUser();

  // error handling: user must not exist to be added

  if (isUserFound == true) {
    alert('User exists. Transaction failed.');
    return;
  } else {
    addSuccessful();
    alert('User added successfully');
  }

  function addSuccessful() {
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

    // invoke functions here
    searchUser();
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
      FName = key.fullName; // updates value of FName variable to details of the user found, same with AcctNum and bal (global variables that can be re-used)
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
  // console.table(usersKey);
  bal = runningBal; // updates bal variable to the running balance
  for (let i = 0; i < userObj.length; i++) {
    key = userObj[i];
    if (key.accountNo === AcctNum) {
      // if no existing data, create an array
      // or, convert the localstorage string to an array

      // console.log(typeof usersKey);
      // original code
      // usersKey = usersKey ? JSON.parse(usersKey) : [];

      usersKey = usersKey ? JSON.parse(usersKey) : [];

      // adds new data to localstorage Array
      usersKey[i].balance = runningBal.toString();
      // saves back to localstorage
      localStorage.setItem('users', JSON.stringify(usersKey));
    }
  }

  // console.table(usersKey);
}

function withdrawMoney() {
  // error handling - checks if there's enough balance to withdraw
  parseFloat(txtAmtW.value) > bal ? (isMoneyEnough = false) : (isMoneyEnough = true);

  // updates value of variable to re-use update balance function
  txtAmt = document.getElementById('amount_with');

  // displays message if balance is not sufficient or will update balance
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

// searches for the sender and receiver's details whichever is applicable
function searchSenderReceiver() {
  // additional notes: highlights sender/receiver's textbox when user is found and populates balance textboxes
  if (isUsingSend == true) {
    if (isUserFound == true) {
      txtAcctNo.style.backgroundColor = '#81DA77';
      txtBalSend.value = bal;
      senderBal = bal;
    } else {
      txtAcctNo.style.backgroundColor = '#FAE1E1';
      txtBalSend.value = '';
    }
  } else {
    if (isUserFound == true) {
      txtAcctNo.style.backgroundColor = '#81DA77';
      txtBalSend.value = bal;
    } else {
      txtAcctNo.style.backgroundColor = '#FAE1E1';
      txtBalSend.value = '';
    }
  }
}

function sendMoney() {
  // used for error handling, will update value depending whether certain validation had been met
  let isFilledOut = false;
  let isUsersSame = false;
  let isBalEnough = false;

  // error handling: textboxes shouldn't be empty/blank
  function checkIfFilledOut() {
    if (txtBalRec.value === '' || txtBalSend.value === '') {
      alert('Please fill-out missing details. Transaction failed.');
      isFilledOut = false;
      return;
    } else {
      isFilledOut = true;
    }
  }

  // error handling: checks if sender and receiver's the same user
  function areUsersSame() {
    if (isFilledOut == true) {
      if (txtSender.value === txtReceiver.value) {
        alert('Sender and receiver are the same. Transaction failed.');
        isUsersSame = true;
        return;
      } else {
        isUsersSame = false;
      }
    }
  }

  // error handling: check if Sender has enough money
  function checkSenderBalance() {
    if (senderBal < parseFloat(txtAmtSend.value)) {
      alert('Insufficient balance. Transaction failed.');
      isBalEnough = false;
      return;
    } else {
      isBalEnough = true;
    }
  }

  // update sender's balance once validations have been passed
  function updateRunBalSend() {
    // re-assigns to original element to be used in the computation below
    txtBalSend = document.getElementById('balance-sender');
    // gets value of sender's account no. to be passed on to update balance function
    AcctNum = document.getElementById('account-no-from').value;
    // running bal will be passed on to update balance function
    runningBal = parseFloat(txtBalSend.value) - parseFloat(txtAmtSend.value);

    updateBalance();
  }

  // similar function as updateRunBalSend except that it updates receiver's data -- see description above
  function updateRunBalRec() {
    txtBalSend = document.getElementById('balance-receiver');
    AcctNum = document.getElementById('account-no-to').value;
    runningBal = parseFloat(txtBalSend.value) + parseFloat(txtAmtSend.value);

    updateBalance();
  }

  // will only go through updating sender's and receiver's balance once validations have been passed
  function sendMoneySuccess() {
    if (isFilledOut == true && isUsersSame == false && isBalEnough == true) {
      updateRunBalSend();
      updateRunBalRec();
    }
  }

  // invoke functions here
  checkIfFilledOut();
  areUsersSame();
  checkSenderBalance();
  sendMoneySuccess();
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

  // disables sender's and receiver's balance
  txtBalRec.disabled = true;
  txtBalSend.disabled = true;
});

// triggers function to search for sender's details
txtSender.addEventListener('keyup', (e) => {
  // re-assigns value to variables for function re-usability
  // this will allow search user function to be re-used
  txtAcctNo = document.getElementById('account-no-from');
  // see above for description
  isUsingSend = true;
  txtBalSend = document.getElementById('balance-sender'); // re-assigned to original element since the function on the receiver txtbox will change it to another element
  if (e.code === 'Enter') {
    searchUser();
    searchSenderReceiver();
  }
});

// triggers function to search for receiver's details
txtReceiver.addEventListener('keyup', (e) => {
  // re-assigns value to variables for function re-usability
  // this will allow search user function to be re-used
  txtAcctNo = document.getElementById('account-no-to');
  // see above for description
  txtBalSend = document.getElementById('balance-receiver'); // to avoid declaring another variable for receiver's balance txtbox (re-usability)
  isUsingSend = false;
  if (e.code === 'Enter') {
    searchUser();
    searchSenderReceiver();
  }
});

// trigger function to send money to receiver
btnSendMoney.addEventListener('click', () => {
  sendMoney();
});
