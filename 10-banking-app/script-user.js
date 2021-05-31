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
// ? 4. empties array first invoking the function
// ?    -- passes expense id which was from the hidden column expense id
// ? 5. empties array first invoking the function
// ?    -- passes expense id which was from the hidden column expense id
// ?    -- passes to elements inside modal
// ? 6.

// todo
// todo 1.) clear form - ask user if form can already be closed if yes clear out all fields
// todo 2.) update user details
// todo 3.) disable inout fields delete modal
// todo 4.) close modal once CRUD is done
// todo 5.) wrap transaction history to scrollable div

// *****************************
// ! DASHBOARD
// *****************************

// ? generic variables
let usersKey = JSON.parse(localStorage.getItem('users'));
let userEmail = 'lee1@mail.com'; // ? assigned valued for debugging purposes
let itemsKey = JSON.parse(localStorage.getItem('items'));
let obj; // ? Readme (item 2)
let items; // ? items key gets re-assigned here for readability purposes
let users; // ? same desc. as items
// ? declared to store the object retreived in an array so the function to retreive can be re-used
let expenseArr = [];
let userArr = [];

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

// ? edit expense
// ? pop-up window
let txtEditCost = document.getElementById('cost-edit');
let txtEditName = document.getElementById('item-edit');
let btnSaveChanges = document.getElementById('edit-btn');

// ? edit or delete pop-up window
// ? buttons
let btnEditOption = document.getElementById('option-edit-btn');
let btnDeleteOption = document.getElementById('option-delete-btn');

// ? delete expense pop-up window
let txtDeleteCost = document.getElementById('cost-delete');
let txtDeleteName = document.getElementById('item-delete');
// ? buttons
let btnDeleteCancel = document.getElementById('delete-cancel-btn');
let btnDeleteYes = document.getElementById('delete-yes-btn');

// ? DASHBOARD
// ? expense table list
let tableList = document.getElementById('expense-list-table');
let tableTbody = document.getElementById('expense-list-tbody');
let tableTr = document.getElementsByTagName('tr');
let tableTd = document.getElementsByTagName('td');
let currentRow;
let txtBalance = document.querySelector('h2');

// ? amounts

// ? profile
let btnLogout = document.getElementById('btn-logout');

//   ===============================
// !    Functions
//   ===============================

// =================================
// !          USER CLASS
// =================================
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
    users = User.getUsers();
    for (let i = 0; i < users.length; i++) {
      // ? represents one obj in the array of objects
      obj = users[i];
      if (isLoggedIn == obj.isLoggedIn) {
        userArr.push(obj);
      }
    }
    return userArr[0];
  }

  // ? updates isLoggedIn status back to false and re-directs back to login page
  static logoutUser(email) {
    users = User.getUsers();
    for (let i = 0; i < users.length; i++) {
      obj = users[i];
      if (email === obj.email) {
        obj.isLoggedIn = false;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }

    displayAlert('Successfully logged out.');
    window.location.href = 'index.html';
  }

  // ? accepts parameter id which is the email of the user
  // ? get users balance first through search user function
  static updateUserBalance(id, amount, transaction) {
    let runningBalance;
    users = User.getUsers();
    for (let i = 0; i < users.length; i++) {
      obj = users[i];
      if (id === obj.email) {
        if (transaction === 'add') {
          runningBalance = parseFloat(obj.balance) - parseFloat(amount);
        } else if (transaction === 'delete') {
          runningBalance = parseFloat(obj.balance) + parseFloat(amount);
        }
        obj.balance = runningBalance;
        localStorage.setItem('users', JSON.stringify(users));
        txtBalance.innerHTML = toMoneyFormat.format(runningBalance);
      }
    }
  }
}

// log(User.updateUserBalance());

// =================================
// !      EXPENSE ITEM CLASS
// =================================
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

  // ? adds 1 to the last expense ID
  static generateExpenseID() {
    let lastExpenseID;
    // ? get last expense id from local storage
    const items = ExpenseItem.getItems();
    // ? if there's no items yet will assign length of items key (0) to last expense id variable
    if (items.length == 0) {
      lastExpenseID = items.length;
    } else {
      for (let i = 0; i < items.length; i++) {
        // ? Readme (item 2)
        obj = items[i];
        // ? declared this so i's value won't change
        let j = i + 1;
        if ((j = items.length)) {
          // ? assigned to lastExpenseID scope variable
          lastExpenseID = obj.expenseId;
        }
      }
    }

    return parseInt(lastExpenseID) + 1;
  }

  static addItem(item) {
    const items = ExpenseItem.getItems();
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    displayAlert('Item added successfully.');
  }

  static loadSampleItems() {
    // let item = new ExpenseItem('Spotify', 194.0, 1, 'lee1@mail.com');
    let item = new ExpenseItem('Netflix', 500.0, 4, 'lee1@mail.com');
    ExpenseItem.addItem(item);
  }

  static displayItemClicked() {
    let table = tableTbody;
    let rows = tableTr;

    for (let i = 0; i < rows.length; i++) {
      currentRow = table.rows[i];
      let createClickHandler = function (row) {
        return function () {
          expenseID = row.getElementsByTagName('td')[2].innerHTML;

          // ? calls the edit or delete pop up
          function showOptionModal() {
            modalsUser[4].classList.add('show');
            modalsUser[4].classList.remove('hide');

            // ? see readme above (1)
            window.onclick = function (e) {
              if (e.target == modalsUser[4]) {
                modalsUser[4].classList.add('hide');
                modalsUser[4].classList.remove('show');
              }
            };
          }

          showOptionModal();
        };
      };
      currentRow.onclick = createClickHandler(currentRow);
    }
  }

  // ? shows/hides pop-up edit modal
  static showEditModal() {
    // ? hide option modal
    modalsUser[4].classList.add('hide');
    modalsUser[4].classList.remove('show');

    // ? show edit modal
    modalsUser[2].classList.add('show');
    modalsUser[2].classList.remove('hide');

    // ? see readme above (1)
    window.onclick = function (e) {
      if (e.target == modalsUser[2]) {
        // ? hide edit modal
        modalsUser[2].classList.add('hide');
        modalsUser[2].classList.remove('show');
      }
    };

    function populateModal() {
      // ? empties array first invoking the function
      expenseArr = [];
      // ? passes expense id which was from the hidden column expense id
      ExpenseItem.retreiveItemObj(expenseID);
      // ? passes to elements inside modal
      txtEditCost.value = expenseArr[0].cost;
      txtEditName.value = expenseArr[0].expenseName;
    }
    populateModal();
  }

  // ? shows/hide pop-up delete modal
  static showDeleteModal() {
    // ? hide option modal
    modalsUser[4].classList.add('hide');
    modalsUser[4].classList.remove('show');

    // ? show delete modal
    modalsUser[3].classList.add('show');
    modalsUser[3].classList.remove('hide');

    // ? see readme above (1)
    window.onclick = function (e) {
      if (e.target == modalsUser[3]) {
        // ? hide delete modal
        modalsUser[3].classList.add('hide');
        modalsUser[3].classList.remove('show');
      }
    };

    // disables textboxes
    txtDeleteCost.disabled = true;
    txtDeleteName.disabled = true;

    function populateModal() {
      // ? Readme (Item 5)
      expenseArr = [];
      ExpenseItem.retreiveItemObj(expenseID);
      txtDeleteCost.value = expenseArr[0].cost;
      txtDeleteName.value = expenseArr[0].expenseName;
    }
    populateModal();
  }

  static updateItem(id, name, cost) {
    items = ExpenseItem.getItems();
    for (let i = 0; i < items.length; i++) {
      // ? Readme (item 2)
      obj = items[i];
      if (id == obj.expenseId) {
        obj.expenseName = name;
        obj.cost = cost;
        localStorage.setItem('items', JSON.stringify(items));
        displayAlert('Item edited successfully');
      }
    }
  }

  static deleteItem(id) {
    items = ExpenseItem.getItems();
    for (let i = 0; i < items.length; i++) {
      // ? Readme (item 2)
      obj = items[i];
      if (id == obj.expenseId) {
        items.splice(i, 1);
        localStorage.setItem('items', JSON.stringify(items));
        displayAlert('Item deleted successfully');
      }
    }
  }

  // ? accepts expense id to be search returns expense item obj and stores keys into an array
  static retreiveItemObj(id) {
    items = ExpenseItem.getItems();
    for (let i = 0; i < items.length; i++) {
      obj = items[i];
      if (obj.expenseId == id) {
        expenseArr.push(obj);
      }
    }
    return expenseArr[0];
  }

  static refreshExpenseList() {
    const items = ExpenseItem.getItems();
    tableTbody.innerHTML = '';

    // ? clears list first before populating it with (`new)values
    for (let i = 0; i < items.length; i++) {
      obj = items[i];
      tableTbody.innerHTML += '<tr><td>' + obj.expenseName + '</td><td>' + obj.cost + '</td><td>' + obj.expenseId + '</></tr>';
    }
    ExpenseItem.displayItemClicked();
  }
}

//   ===============================
// !     HELPERS
//   ===============================

// ? ormats numnber to a money format (Example: from 100 to Php 100.00)
let toMoneyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'PHP',
});

// ? checks if fields have been filled out
function isFilledOut(input1, input2) {
  let results = true;
  input1 === '' || input2 === '' ? (results = false) : results;
  return results;
}

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

// ! main dashboard
window.onload = function () {
  User.retreiveUserData(true);
  userEmail = userArr[0].email;
  txtBalance.innerHTML = toMoneyFormat.format(parseFloat(userArr[0].balance));

  // ? assigns e-mail of user to a global variable upon log-in/onload
  ExpenseItem.refreshExpenseList();

  // for testing purposes only
  // ExpenseItem.loadSampleItems();
};

// ! add expense
btnModal.addEventListener('click', () => {
  modalsUser[0].classList.add('show');
  modalsUser[0].classList.remove('hide');

  // ? modal will be closed if user clicks anywhere outside of it
  window.onclick = function (e) {
    if (e.target == modalsUser[0]) {
      modalsUser[0].classList.add('hide');
      modalsUser[0].classList.remove('show');
    }
  };
});

// ? pop-up window
btnSaveItem.addEventListener('click', () => {
  // ? validation if fields are filleout
  if (isFilledOut(txtExpenseName.value, txtExpenseCost.value) == false) {
    displayAlert('Please fill out missing fields. Transaction failed.');
  } else {
    // ? will add item if validation(s) was/were passed
    let item = new ExpenseItem(txtExpenseName.value, txtExpenseCost.value, ExpenseItem.generateExpenseID(), userEmail);
    ExpenseItem.addItem(item);
    ExpenseItem.refreshExpenseList();

    // ? update balance of user
    User.updateUserBalance(userEmail, txtExpenseCost.value, 'add');
  }
});

// ! edit expense item
btnSaveChanges.addEventListener('click', () => {
  if (isFilledOut(txtEditName.value, txtEditCost.value) == false) {
    displayAlert('Please fill out missing fields. Transaction failed.');
  } else {
    // update codes here
    ExpenseItem.updateItem(expenseID, txtEditName.value, txtEditCost.value);
    ExpenseItem.refreshExpenseList();
  }
});

// ! edit profile
// ? nav link
linkProfile.addEventListener('click', () => {
  modalsUser[1].classList.add('show');
  modalsUser[1].classList.remove('hide');

  // ? see readme above (1)
  window.onclick = function (e) {
    if (e.target == modalsUser[1]) {
      modalsUser[1].classList.add('hide');
      modalsUser[1].classList.remove('show');
    }
  };

  // disables textbox
});

// ? call function to logout user
btnLogout.addEventListener('click', () => {
  User.logoutUser(userEmail);
});

// ! edit or delete pop-up
// ? edit
btnEditOption.addEventListener('click', () => {
  ExpenseItem.showEditModal();
});
// ? delete
btnDeleteOption.addEventListener('click', () => {
  ExpenseItem.showDeleteModal();
});

// ! delete expense item
// ? cancel button
btnDeleteCancel.addEventListener('click', () => {
  modalsUser[3].classList.add('hide');
  modalsUser[3].classList.remove('show');
});
// ? yes button

btnDeleteYes.addEventListener('click', () => {
  ExpenseItem.deleteItem(expenseID);
  ExpenseItem.refreshExpenseList();
  User.updateUserBalance(userEmail, txtDeleteCost.value, 'delete');
});
