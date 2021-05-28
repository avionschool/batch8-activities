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
}

// INCOME

// EXPENSES
// Modal
const modalExpense = document.querySelector('#add-expense-modal');
const addExpense = document.querySelector('#add-expense');
const modalExpenseClose = document.querySelector('#close-expense');

addExpense.addEventListener('click', function() {
    modalExpense.classList.remove('hide');
})

// Close clicked on 'x' or outside the modal content window
modalExpenseClose.onclick = hideModals;

window.onclick = function(event) {
if (event.target == modalExpense) hideModals();
}

function hideModals() {
    modalExpense.classList.add('hide');
}

// inputs
const expenseType = document.querySelector('#expense-type');
expenseType.addEventListener('change', function() {
    // this.style.backgroundImage = "url(../assets/fontawesome/bolt-solid.svg);";
    this.style.backgroundImage = "url(/Avion%20Projects/Banking%20App/assets/fontawesome/bolt-solid.svg)";
})

// change logo on change


// INITIALIZE
updateBudgetSummary();