// ===============================
//      Global variables
// ===============================

// modal
let addExpenseModal = document.getElementById('add-modal');
let btnModal = document.getElementById('add-btn');

// ===============================
//      Event listeners
// ===============================

// modal
btnModal.onclick = function () {
  addExpenseModal.style.display = 'block';
};

// modal will be closed if user clicks anywhere outside of it
window.onclick = function (e) {
  e.target == addExpenseModal ? (addExpenseModal.style.display = 'none') : null;
};
