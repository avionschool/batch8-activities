// GLOBAL VARS
let EXPENSESTotalAmount = 0.00;
let INCOMETotalAmount = 0.00;

// LOAD CURRENTLY LOGGED IN USER FROM LOCAL STORAGE
var currentUserIndex_str = localStorage.getItem("currentUserIndex");
var currentUserIndex = JSON.parse(currentUserIndex_str);
var currentUser = clientList[currentUserIndex];

// NAV BAR
const navItems = [...document.querySelectorAll('.nav-item')];
const navProfile = document.querySelector('.user-home');
const navTransactionHistory = document.querySelector('.user-transaction-history');
const navBudgetTracker = document.querySelector('.user-budget');
const sectionContents = [...document.querySelectorAll('.content-item')];

// Add click event on nav items to style itself and unhide relevant section
navItems.forEach(function(item, index) {
    item.addEventListener('click', function() {
        clearNavItem();
        this.classList.add('active');

        const selectedSection = sectionContents[index];
        hideSections();
        selectedSection.classList.remove('hide');
    })
});

function clearNavItem() {
    navItems.forEach(function(item) {
        item.classList.remove('active');
    })
}

function hideSections() {
    sectionContents.forEach(function(item) {
        item.classList.add('hide');
    }) 
}

// ================
// === SECTIONS ===
// ================
// PROFILE SECTION
const profileMessage = document.querySelector('.home-message');
const spanAccountNo = document.querySelector('#profile-account-no');
const spanUsername = document.querySelector('#profile-username');
const spanEmail = document.querySelector('#profile-email');
const spanFname = document.querySelector('#profile-fname');
const spanLname = document.querySelector('#profile-lname');
const spanBalance = document.querySelector('#profile-balance');
const spanMemberSince = document.querySelector('#profile-member-since');
const spanViewTransactionHistory = document.querySelector('#profile-transaction-history');

(function setCurrentUserProfile() {
    profileMessage.textContent = `Welcome ${currentUser.fname}!`;
    spanBalance.textContent = get_balance(currentUser);
    spanAccountNo.textContent = currentUser.accountNo;
    spanFname.textContent = currentUser.fname;
    spanLname.textContent = currentUser.lname;
    spanUsername.textContent = currentUser.username;
    spanEmail.textContent = currentUser.email;
    let today = new Date(currentUser.memberSince); // convert to Date object first
    spanMemberSince.textContent = today.toLocaleString();
})();

// Clicking on View transaction History simulates click on navBar
spanViewTransactionHistory.addEventListener('click', function() {
    navTransactionHistory.click();
})

// TRANSACTION HISTORY SECTION
const historyTable = document.querySelector('.history-content');

(function show_history() {
    // modified to get transactions and filter only account No's activities
    // refactor to not use innerHTML
    let accountNo = currentUser.accountNo;
    let div = "";

    transactionHistory.forEach(function(item) {
        if (item.accountNo === accountNo) {
            div += `
            <tr>
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td>${item.accountNo}</td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.details}</td>
                <td>${display_balance((item.amount))}</td>
                <td>₱${display_balance((item.runningBalance))}</td>
            </tr>`
        }
    })
    historyTable.innerHTML = div;
    return transactionHistory;
})();

// BUDGET TRACKER
// NAV
const budgetBtns = [...document.querySelectorAll('.user-nav-btn')];
const budgetMain = budgetBtns[0];
const budgetIncome = budgetBtns[1];
const budgetExpenses = budgetBtns[2];
const budgetSections = [...document.querySelectorAll('.budget-section')];

// Add click event on budget buttons to style itself and unhide relevant section
budgetBtns.forEach(function(item, index) {
    item.addEventListener('click', function() {
        clearBudgetBtns();
        this.classList.add('active-btn');

        const selectedSection = budgetSections[index];
        hideBudgetSections();
        selectedSection.classList.remove('hide');
    })
});

function clearBudgetBtns() {
    budgetBtns.forEach(function(item) {
        item.classList.remove('active-btn');
    })
}

function hideBudgetSections() {
    budgetSections.forEach(function(item) {
        item.classList.add('hide');
    }) 
}

// MAIN
const spanTableINCOME = document.querySelector('#table-INCOME');
const spanTableEXPENSES = document.querySelector('#table-EXPENSES');
const tdTableAccountBalance = document.querySelector('#table-account-balance');
const tdTableIncome = document.querySelector('#table-income');
const tdTableExpenses = document.querySelector('#table-expenses');
const tdTableNetSavings = document.querySelector('#table-net-savings');

// Clickable INCOME & EXPENSES in Table Summary
spanTableINCOME.onclick = () => budgetIncome.click();
spanTableEXPENSES.onclick = () => budgetExpenses.click();

// Update amounts in table upon click of MAIN
budgetMain.addEventListener('click', updateBudgetSummary);

function updateBudgetSummary() {
    tdTableAccountBalance.textContent = get_balance(currentUser);
    tdTableExpenses.textContent = `(${totalExpense.textContent.slice(1)})`;
    tdTableNetSavings.textContent = '₱' + display_balance((currentUser.balance - EXPENSESTotalAmount));
    if (tdTableNetSavings.textContent.includes('(')) {
        tdTableNetSavings.style.color = "red";
    } else tdTableNetSavings.style.color = "green";
}

// INCOME

// EXPENSES
// Modal
const addExpenseBtn = document.querySelector('#add-expense');
const modalExpense = document.querySelector('#add-expense-modal');
const formAddExpense = document.querySelector('#add-expense-modal-content');
const modalExpenseInputs = [...formAddExpense.getElementsByTagName('input')];
const expenseName = document.querySelector('#expense-name');
const expenseAmount = document.querySelector('#expense-amount');
const expenseType = document.querySelector('#expense-type');
const expenseDate = document.querySelector('#expense-date');
const expenseTime = document.querySelector('#expense-time');
const modalExpenseClose = document.querySelector('#close-expense');

// expense table
const expenseTable = document.querySelector('.budget-cost-table');

// unhide modal
addExpenseBtn.addEventListener('click', function() {
    modalExpense.classList.remove('hide');
    // sets date and time input to current time
    var date = new Date();
    var hour = date.getHours(),
        min  = date.getMinutes();
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;

    expenseDate.valueAsDate = new Date();
    expenseTime.value = hour + ":" + min;
})

// Close clicked on 'x' or outside the modal content window
modalExpenseClose.onclick = hideModals;

window.onclick = function(event) {
if (event.target == modalExpense) hideModals();
}

function hideModals() {
    modalExpense.classList.add('hide');
}

// Pressing ESC in an input box clears its value
modalExpenseInputs.forEach(function(item) {
    item.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            this.value = null;
        }
    });
})

// force amount to be 2 decimal places
expenseAmount.addEventListener('change', function(e) {
    this.value = parseFloat(this.value).toFixed(2);
})

// change logo on change event
expenseType.addEventListener('input', function() {
    // create list of icon names
    let listOfIconNames = [];
    let options = [...document.querySelector('#type').children];
    options.forEach(function(item) {
        listOfIconNames.push(item.value);
    })
    // dynamically change icon to represent expense type
    if (listOfIconNames.includes(this.value)) {
        this.className = `icon-${this.value.toLowerCase()}`
    } else this.className = 'icon-miscellaneous';
})

// form submission
formAddExpense.addEventListener('submit', function(e) {
    formCreateExpenseItem(); // add transaction
    e.preventDefault(); // prevent page reload
    formAddExpense.reset() // reset form
    hideModals(); // hide modal
    return false;
});

// ##FUNCTIONS##
function formCreateExpenseItem() {
    let item = new ExpenseItem(expenseName.value, parseFloat(expenseAmount.value),
        expenseType.value, spanAccountNo.value, expenseDate.value, expenseTime.value);
    User.add(item);
    User.sort_expenseItems();
    createExpenseTable();
    // update local storage
    updateJSONClientList();
}

function createExpenseTable() {
    let innerHTML = "";
    currentUser.expenseItems.forEach(function(item) {
        let dateParts = item.transactionDate.split('-');
        let parsedDate = new Date(dateParts[0], dateParts[1] -1, dateParts[2]);
        innerHTML += `
        <tr>
            <td rowspan="2"><div class="icon icon-miscellaneous icon-${item.expenseType.toLowerCase()}"></td>
            <td rowspan="2">
                <span class="span-date-month">${parsedDate.toLocaleString('default', { month: 'short' }).toUpperCase()}</span><br>
                <span class="span-date-day">${dateParts[2]}</span>
            </td>
            <td class="table-name">${item.name}</td>
            <td rowspan="2" class="table-action-btns"><img src="assets/feathericons/edit.svg" title="Edit transaction"><img src="assets/feathericons/trash-2.svg" title="Delete transaction"></td>
            <td class="table-amount">${display_balance(item.amount)}</td>
        </tr>
        <tr class="table-row-end">
            <td class="table-type">${item.expenseType}</td>
        </tr>`
    });
    expenseTable.innerHTML = innerHTML;
    getDisplayExpenseTotal();
}

// displays total expense
const totalExpense = document.querySelector('#total-expense');

function getDisplayExpenseTotal() {
    var total = currentUser.expenseItems.reduce(function(acc, item) {
        return acc + parseFloat(item.amount);
    }, 0);
    totalExpense.textContent = '₱' + display_balance(total);
    EXPENSESTotalAmount = total;
}

// Action Buttons
// Delete Transaction
const tableActionBtns = document.querySelector('.table-action-btns').children;

// INITIALIZE
createExpenseTable();
updateBudgetSummary();