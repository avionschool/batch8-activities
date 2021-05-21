// ===============================
//      Global variables
// ===============================

// add user
let addUserModal = document.getElementById('add-modal');
let btnModal = document.getElementById('add-btn');
let btnAddUser = document.getElementById('btn-add-user');

// ===============================
//      Functions
// ===============================

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

// ===============================
//      Event listeners
// ===============================

// add user
btnModal.onclick = function () {
  addUserModal.style.display = 'block';
};

// modal will be closed if user clicks anywhere outside of it
window.onclick = function (e) {
  e.target == addUserModal ? (addUserModal.style.display = 'none') : null;
};

// for debugging purposes
window.onload = function () {
  userObj = JSON.parse(localStorage.getItem('users'));
  let tbody = document.getElementById('tbody');
  // iterates keys and values of the users object
  for (let i = 0; i < userObj.length; i++) {
    let tr = '<tr>';
    tr += '<td>' + userObj[i].fullName + '</td>' + '<td>$' + userObj[i].balance + '</td></tr>';
    tbody.innerHTML += tr;
  }
};
