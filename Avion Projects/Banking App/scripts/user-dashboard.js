// GLOBAL VARS
let EXPENSESTotalAmount = 0.00;
let INCOMETotalAmount = 0.00;
let currentExpense;
let currentIncome;

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
// ================================ PROFILE SECTION ========================================
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

// ================================ TRANSACTION HISTORY SECTION =============================
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

// =====================================  BUDGET TRACKER ======================================
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

// ---------------------------------------- MAIN -----------------------------------------
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
    tdTableIncome.textContent = `${totalIncome.textContent.slice(1)}`;
    tdTableExpenses.textContent = `(${totalExpense.textContent.slice(1)})`;
    tdTableNetSavings.textContent = '₱' + display_balance((currentUser.balance + INCOMETotalAmount - EXPENSESTotalAmount));
    if (tdTableNetSavings.textContent.includes('(')) {
        tdTableNetSavings.style.color = "red";
    } else tdTableNetSavings.style.color = "green";
}

// --------------------------------------- INCOME -----------------------------------------
// Modal
const modalIncomeTitle = document.querySelector('#income-title');
const addIncomeBtn = document.querySelector('#add-income');
const modalIncome = document.querySelector('#add-income-modal');
const formAddIncome = document.querySelector('#add-income-modal-content');
const modalIncomeInputs = [...formAddIncome.getElementsByTagName('input')];
const incomeName = document.querySelector('#income-name');
const incomeAmount = document.querySelector('#income-amount');
const incomeType = document.querySelector('#income-type');
const incomeDate = document.querySelector('#income-date');
const incomeTime = document.querySelector('#income-time');
const modalIncomeClose = document.querySelector('#close-income');
const modalIncomeSubmit = document.querySelector('#income-modal-submit');

// income table
const incomeTable = document.querySelector('#budget-cost-income-table');

// unhide modal
addIncomeBtn.addEventListener('click', function() {
    modalIncome.classList.remove('hide');
    modalIncomeTitle.textContent = "Add Income Transaction";
    modalIncomeSubmit.textContent = "Add Income";
    formAddIncome.reset();
    // sets date and time input to current time
    var date = new Date();
    var hour = date.getHours(),
        min  = date.getMinutes();
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;

    incomeDate.valueAsDate = new Date();
    incomeTime.value = hour + ":" + min;
})

// Close clicked on 'x' or outside the modal content window
modalIncomeClose.onclick = hideModals;

window.addEventListener('click', function(event) {
if (event.target == modalIncome) hideModals();
});

// hideModals included in expense function

// Pressing ESC in an input box clears its value
modalIncomeInputs.forEach(function(item) {
    item.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            this.value = null;
        }
    });
})

// force amount to be 2 decimal places
incomeAmount.addEventListener('change', function(e) {
    this.value = parseFloat(this.value).toFixed(2);
})

// form submission
formAddIncome.addEventListener('submit', function(e) {
    formCreateIncomeItem(); // add transaction
    e.preventDefault(); // prevent page reload
    formAddIncome.reset() // reset form
    hideModals(); // hide modal
    return false;
});

// ##FUNCTIONS##
function formCreateIncomeItem() {
    if (modalIncomeSubmit.textContent === "Add Income") {
        // ADDS
        let item = new IncomeItem(incomeName.value, parseFloat(incomeAmount.value),
            incomeType.value, spanAccountNo.value, incomeDate.value, incomeTime.value);
        User.add_income(item);
    } else {
        // EDITS
        IncomeItem.update(incomeName.value, parseFloat(incomeAmount.value),
            incomeType.value, spanAccountNo.value, incomeDate.value, incomeTime.value);
    }
    User.sort_incomeItems();
    createIncomeTable();
    // update local storage
    updateJSONClientList();
}

function createIncomeTable() {
    let innerHTML = "";
    currentUser.incomeItems.forEach(function(item) {
        let dateParts = item.transactionDate.split('-');
        let parsedDate = new Date(dateParts[0], dateParts[1] -1, dateParts[2]);
        innerHTML += `
        <tr>
            <td rowspan="2"><div class="icon icon-${item.incomeType.toLowerCase()}"></td>
            <td rowspan="2">
                <span class="span-date-month">${parsedDate.toLocaleString('default', { month: 'short' }).toUpperCase()}</span><br>
                <span class="span-date-day">${dateParts[2]}</span>
            </td>
            <td class="table-name">${item.name}</td>
            <td rowspan="2" class="table-action-btns"><img class="edit-income-icon" src="assets/feathericons/edit.svg" title="Edit transaction"><img class="delete-income-icon" src="assets/feathericons/trash-2.svg" title="Delete transaction"></td>
            <td class="table-amount table-amount-income">${display_balance(item.amount)}</td>
        </tr>
        <tr class="table-row-end">
            <td class="table-type">${item.incomeType}</td>
        </tr>`
    });
    incomeTable.innerHTML = innerHTML;
    getDisplayIncomeTotal();
    addDeleteTransactionHandlerIncome();
    addEditTransactionHandlerIncome();
}

// displays total income
const totalIncome = document.querySelector('#total-income');

function getDisplayIncomeTotal() {
    var total = currentUser.incomeItems.reduce(function(acc, item) {
        return acc + parseFloat(item.amount);
    }, 0);
    totalIncome.textContent = '₱' + display_balance(total);
    INCOMETotalAmount = total;
}

// Action Buttons
// Delete Transaction
const incomePromptModal = document.querySelector('#delete-income-prompt');
const incomePromptCancel = document.querySelector('#income-prompt-cancel');
const incomePromptConfirm = document.querySelector('#income-prompt-confirm');

function addDeleteTransactionHandlerIncome() {
    let deleteBtns = [...document.querySelectorAll('.delete-income-icon')];
    deleteBtns.forEach(function(item, index) {
        item.addEventListener('click', function() {
            incomePromptModal.classList.remove('hide');
            // add click event on confirm so it can access index variable
            // confirm button will delete transaction
            incomePromptConfirm.onclick = function() {
                hideModals(); // hide modals
                User.delete_income(index);
                createIncomeTable();
                updateJSONClientList();
            }
        })
    })
}

// Edit transaction
// Makes use of the Add Income Modal
function addEditTransactionHandlerIncome() {
    let editBtns = [...document.querySelectorAll('.edit-income-icon')];
    editBtns.forEach(function(item, index) {
        item.addEventListener('click', function() {
            let selectedIncome = currentUser.incomeItems[index];
            modalIncome.classList.remove('hide');
            modalIncomeTitle.textContent = "Edit Income Transaction";
            modalIncomeSubmit.textContent = "Edit Income";
            incomeName.value = selectedIncome.name;
            incomeAmount.value = selectedIncome.amount;
            incomeType.value = selectedIncome.incomeType;
            incomeType.dispatchEvent(new Event('input')); // trigger input event
            incomeDate.value = selectedIncome.transactionDate;
            incomeTime.value = selectedIncome.transactionTime;
            currentIncome = selectedIncome; // modify global variable
        })
    })
}

// cancel button closes prompt modal
incomePromptCancel.onclick = () => incomePromptModal.classList.add('hide');

// -------------------------------------- EXPENSES -----------------------------------------
// Modal
const modalExpenseTitle = document.querySelector('#expense-title');
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
const modalExpenseSubmit = document.querySelector('#expense-modal-submit');

// expense table
const expenseTable = document.querySelector('#budget-cost-expense-table');

// unhide modal
addExpenseBtn.addEventListener('click', function() {
    modalExpense.classList.remove('hide');
    modalExpenseTitle.textContent = "Add Expense Transaction";
    modalExpenseSubmit.textContent = "Add Expense";
    formAddExpense.reset();
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

window.addEventListener('click', function(event) {
if (event.target == modalExpense) hideModals();
});

function hideModals() {
    modalExpense.classList.add('hide');
    expensePromptModal.classList.add('hide');    
    modalIncome.classList.add('hide');
    incomePromptModal.classList.add('hide');
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
        this.className = "modal-content-input modal-type"; // reset classes
        this.classList.add(`icon-${this.value.toLowerCase()}`);
    } else {
        this.className = "modal-content-input modal-type"; // reset classes
        this.classList.add('icon-miscellaneous');
    }
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
    if (modalExpenseSubmit.textContent === "Add Expense") {
        // ADDS
        let item = new ExpenseItem(expenseName.value, parseFloat(expenseAmount.value),
            expenseType.value, spanAccountNo.value, expenseDate.value, expenseTime.value);
        User.add(item);
    } else {
        // EDITS
        ExpenseItem.update(expenseName.value, parseFloat(expenseAmount.value),
            expenseType.value, spanAccountNo.value, expenseDate.value, expenseTime.value);
    }
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
            <td rowspan="2" class="table-action-btns"><img class="edit-expense-icon" src="assets/feathericons/edit.svg" title="Edit transaction"><img class="delete-expense-icon" src="assets/feathericons/trash-2.svg" title="Delete transaction"></td>
            <td class="table-amount">${display_balance(item.amount)}</td>
        </tr>
        <tr class="table-row-end">
            <td class="table-type">${item.expenseType}</td>
        </tr>`
    });
    expenseTable.innerHTML = innerHTML;
    getDisplayExpenseTotal();
    addDeleteTransactionHandler();
    addEditTransactionHandler();
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
const expensePromptModal = document.querySelector('#delete-expense-prompt');
const expensePromptCancel = document.querySelector('#expense-prompt-cancel');
const expensePromptConfirm = document.querySelector('#expense-prompt-confirm');

function addDeleteTransactionHandler() {
    let deleteBtns = [...document.querySelectorAll('.delete-expense-icon')];
    deleteBtns.forEach(function(item, index) {
        item.addEventListener('click', function() {
            expensePromptModal.classList.remove('hide');
            // add click event on confirm so it can access index variable
            // confirm button will delete transaction
            expensePromptConfirm.onclick = function() {
                hideModals(); // hide modals
                User.delete(index);
                createExpenseTable();
                updateJSONClientList();
            }
        })
    })
}

// Edit transaction
// Makes use of the Add Expense Modal
function addEditTransactionHandler() {
    let editBtns = [...document.querySelectorAll('.edit-expense-icon')];
    editBtns.forEach(function(item, index) {
        item.addEventListener('click', function() {
            let selectedExpense = currentUser.expenseItems[index];
            modalExpense.classList.remove('hide');
            modalExpenseTitle.textContent = "Edit Expense Transaction";
            modalExpenseSubmit.textContent = "Edit Expense";
            expenseName.value = selectedExpense.name;
            expenseAmount.value = selectedExpense.amount;
            expenseType.value = selectedExpense.expenseType;
            expenseType.dispatchEvent(new Event('input')); // trigger input event
            expenseDate.value = selectedExpense.transactionDate;
            expenseTime.value = selectedExpense.transactionTime;
            currentExpense = selectedExpense; // modify global variable
        })
    })
}

// cancel button closes prompt modal
expensePromptCancel.onclick = () => expensePromptModal.classList.add('hide');

// INITIALIZE
createIncomeTable();
createExpenseTable();
updateBudgetSummary();