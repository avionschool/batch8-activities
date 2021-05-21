// ===============================
//      Global variables
// ===============================

// modal
// add user
let addUserModal = document.getElementById('add-modal');
let btnModal = document.getElementById('add-btn');

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
