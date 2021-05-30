// ===============================
// !    Global variables
// ===============================

// ! README -- for other notes
// ? 1. window.onclick for modals - modal will be closed if user clicks anywhere outside of it
// ? 2. obj - represents one object on the users' array of objects
// ? 3. returns all values stores in users key
// ?    -- if no existing data
// ?    -- will create an empty array
// ?    -- or convert key to string

// *****************************
// ! DASHBOARD
// *****************************

// ? generic variables
let usersKey = JSON.parse(localStorage.getItem('users'));
let userEmail = 'lee1@mail.com'; // assigned valued for debugging purposes
let itemsKey = JSON.parse(localStorage.getItem('items'));

// ? modals
let modalsUser = document.getElementsByClassName('modal');

// ? navigation bar
let linkProfile = document.getElementById('profile-link');

// ? add expense
let btnModal = document.getElementById('add-btn');
// ? pop-up window
let btnSaveItem = document.getElementById('expense-btn');
let txtExpenseCost = document.getElementById('cost');
let txtExpenseName = document.getElementById('item');
let expenseID;

// ? profile
let btnLogout = document.getElementById('btn-logout');

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
      if (isLoggedIn == obj.isLoggedIn) {
        userEmail = obj.email;
      }
    }
    return userEmail;
  }

  // ? updates isLoggedIn status back to false and re-directs back to login page
  static logoutUser(email) {
    const users = User.getUsers();
    for (let i = 0; i < users.length; i++) {
      let obj = users[i];
      if (email === obj.email) {
        obj.isLoggedIn = false;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }

    displayAlert('Successfully logged out.');
    window.location.href = 'index.html';
  }
}

class ExpenseItem {
  constructor(expenseName, cost, expenseId, owner) {
    this.expenseName = expenseName;
    this.cost = cost;
    this.expenseId = expenseId;
    this.owner = owner;
  }

  // ? ReadMe (item 3)
  static getItems() {
    return (itemsKey = localStorage.getItem('items') === null ? [] : JSON.parse(localStorage.getItem('items')));
  }

  static AddItem(item) {
    const items = ExpenseItem.getItems();
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
  }

  static isFilledOut(input1, input2) {
    let results = true;
    input1 === '' || input2 === '' ? (results = false) : results;
    return results;
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

// ? pop-up window
btnSaveItem.addEventListener('click', () => {
  // let item1 = new ExpenseItem('name2', 2.0, 2, 'lee2');
  // ExpenseItem.AddItem(item1);
  // let item = new ExpenseItem(txtExpenseName.value, txtExpenseCost.value, 1, userEmail);
  // ExpenseItem.AddItem(item);
  // log(userEmail);

  // ? validation if fields are filleout
  if (ExpenseItem.isFilledOut(txtExpenseName.value, txtExpenseCost.value) == false) {
    displayAlert('Please fill out missing fields. Transacation failed.');
  } else {
    // ? will add item if validation(s) was/were passed
    displayAlert('Item added successfully.');
    let item = new ExpenseItem(txtExpenseName.value, txtExpenseCost.value, 1, userEmail);
    ExpenseItem.AddItem(item);
  }
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

// ? call function to logout user
btnLogout.addEventListener('click', () => {
  User.logoutUser(userEmail);
});
