// ===================
// == A. Nav Bar   ===
// ===================

const navItems = [...document.querySelectorAll('.nav-item')];
const navHome = document.querySelector('.nav-home');
const navUserList = document.querySelector('.nav-user-list');
const navAddUser = document.querySelector('.nav-add-user');
const navTransactions = document.querySelector('.nav-transactions');

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

// ====================
// == B. CLIENT LIST ==
// ====================


// ====================
// == C. ADD CLIENT  ==
// ====================


// =====================
// == D. TRANSACTIONS ==
// =====================
const transactionBtns = [...document.querySelectorAll('.transaction-navBtn')];
const transactionDepositBtn = transactionBtns[0];
const transactionWithdrawBtn = transactionBtns[1];
const transactionTransferBtn = transactionBtns[2];

const transactionSections = [...document.querySelectorAll('.transaction-section')];

// Add click event on transaction buttons to style itself and unhide relevant section
transactionBtns.forEach(function(item, index) {
    item.addEventListener('click', function() {
        clearTransactionBtns();
        this.classList.add('active-btn');

        const selectedSection = transactionSections[index];
        hideTransactionSections();
        selectedSection.classList.remove('hide');
    })
});

function clearTransactionBtns() {
    transactionBtns.forEach(function(item) {
        item.classList.remove('active-btn');
    })
}

function hideTransactionSections() {
    transactionSections.forEach(function(item) {
        item.classList.add('hide');
    }) 
}