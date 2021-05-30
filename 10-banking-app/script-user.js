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

// todo
// todo 1.) clear form - ask user if form can already be closed if yes clear out all fields
// todo 2.) update user details
// todo 3.) disable inout fields delete modal
// todo 4.) close modal once CRUD is done

// *****************************
// ! DASHBOARD
// *****************************

// ? generic variables
let usersKey = JSON.parse(localStorage.getItem('users'));
let userEmail = 'lee1@mail.com'; // ? assigned valued for debugging purposes
let itemsKey = JSON.parse(localStorage.getItem('items'));
let obj;
let items;
let expenseArr = [];

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

// ? DASHBOARD
// ? expense table list
let tableList = document.getElementById('expense-list-table');
let tableTbody = document.getElementById('expense-list-tbody');
let tableTr = document.getElementsByTagName('tr');
let tableTd = document.getElementsByTagName('td');
let currentRow;

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

  static refreshExpenseList() {
    const items = ExpenseItem.getItems();
    // ? clears list first before populating it with (`new)values
    tableTbody.innerHTML = '';
    for (let i = 0; i < items.length; i++) {
      obj = items[i];
      tableTbody.innerHTML += '<tr><td>' + obj.expenseName + '</td><td>' + obj.cost + '</td><td>' + obj.expenseId + '</></tr>';
    }
  }

  static displayItemClicked() {
    let table = tableTbody;
    let rows = tableTr;

    for (let i = 0; i < rows.length; i++) {
      currentRow = table.rows[i];
      let createClickHandler = function (row) {
        return function () {
          expenseID = row.getElementsByTagName('td')[2].innerHTML;
          // ? shows/hides popup edit modal
          function showEditModal() {
            modalsUser[2].classList.add('show');
            modalsUser[2].classList.remove('hide');

            // ? see readme above (1)
            window.onclick = function (e) {
              if (e.target == modalsUser[2]) {
                modalsUser[2].classList.add('hide');
                modalsUser[2].classList.remove('show');
              }
            };
          }

          function populateModal() {
            // ? empties array first invoking the function
            expenseArr = [];
            // ? passes expense id which was from the hidden column expense id
            ExpenseItem.retreiveItemObj(expenseID);
            // ? passes to elements inside modal
            txtEditCost.value = expenseArr[0].cost;
            txtEditName.value = expenseArr[0].expenseName;
          }

          showEditModal();
          populateModal();
        };
      };
      currentRow.onclick = createClickHandler(currentRow);
    }
  }

  static updateItem(id, name, cost) {
    items = ExpenseItem.getItems();
    // log(id + name + cost);
    for (let i = 0; i < items.length; i++) {
      obj = items[i];
      if (id == obj.expenseId) {
        obj.expenseName = name;
        obj.cost = cost;
        localStorage.setItem('items', JSON.stringify(items));
        displayAlert('Item edited successfully');
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
}

//   ===============================
// !     HELPERS
//   ===============================

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
  ExpenseItem.refreshExpenseList();
  ExpenseItem.displayItemClicked();

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
  }
});

// ! edit expense item
// btnSaveChanges.onclick = function () {
//   if (isFilledOut(txtEditName.value, txtEditCost.value) == false) {
//     displayAlert('Please fill out missing fields. Transacation failed.');
//   } else {
//     // update codes here
//   }
// };

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
});

// ? call function to logout user
btnLogout.addEventListener('click', () => {
  User.logoutUser(userEmail);
});
