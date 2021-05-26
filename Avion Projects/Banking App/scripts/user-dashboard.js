// LOAD CURRENTLY LOGGED IN USER FROM LOCAL STORAGE
var currentUserIndex_str = localStorage.getItem("currentUserIndex");
var currentUserIndex = JSON.parse(currentUserIndex_str);
var currentUser = clientList[currentUserIndex];

// FUNCTIONS FROM ADMIN-DASHBOARD
function get_balance(user) {
    // displays in ₱ and commas
    let string = '₱' + user.balance.toLocaleString();
    if (string.includes('.')) {
        return string;
    } else return string + '.00'; // display whole numbers with trailing zeros
}

function display_balance(amount) {
    amount = amount.toLocaleString(); // convert to string
    ans = "";
    if (amount.includes('.')) {
        ans = amount;
    } else ans = amount + '.00';
    
    if (ans.includes('-')) {
        ans = `(${ans.slice(1)})`;
    }
    return ans; 
}

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
