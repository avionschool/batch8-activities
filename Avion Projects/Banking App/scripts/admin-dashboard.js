// ===================
// == GLOBAL VARS  ===
// ===================

let clientList = []; // Array of User objects
let generatedAccountNos = []; // Array of unique account nos.

// // Creation of the BankingApp module
// const bankingApp = (() => {
//     let clientList = [];

//     const create_user = (user) => {
//         clientList.push(user);
//         console.log(clientList);
//     }
//     const deposit = (user, amount) => {
//         // code
//     }
//     const withdraw = (user, amount) => {
//         // code
//     }
//     const send = (from_user, amount, to_user) => {
//         // code
//     }
//     const get_balance = () => {
//         // code
//     }
//     const list_users = () => {
//         console.log('Users');
//     }
//     return {create_user, deposit, withdraw, send, get_balance, list_users};
// })();

// helper functions
function generateAccountNo() {
    let randomAccountNo = "";
    for (let i = 0; i < 6; i++) {
        randomAccountNo += Math.floor(Math.random()*10);
    }
    // On the improbable chance it was already generated, generate another code
    if (generatedAccountNos.includes(randomAccountNo)) {
        return generateAccountNo();
    } else {
        generatedAccountNos.push(randomAccountNo);
        return randomAccountNo;
    }
}

function generateRandomPassword() {
    let randomPassword = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 9; i++) {
        randomPassword.push(characters.charAt(Math.floor(Math.random()* characters.length)));
    }
    return randomPassword.join('');
}

class User {
    constructor(accountNo, username, email, password, fname, lname, balance, isAdmin) {
        this.accountNo = (accountNo !== 'admin') ? generateAccountNo() : undefined;
        this.username = username;
        this.email = email;
        this.password = (password === undefined) ? generateRandomPassword(): password;
        this.fname = fname;
        this.lname = lname;
        this.balance = balance;
        this.expenseItems = [];
        this.isAdmin = isAdmin;
    }

    add() {
        // code for expense items
    }

    delete() {
        // code for expense items
    }

    list() {
        // code for expense items
    }
}

let admin = new User("admin", "admin", undefined, 1234, undefined, undefined, 0, true);
let john = new User('user', 'johndoe', '2@email.com', '12345', 'John', 'Doe', 2000, false);

// ===================
// == A. Nav Bar   ===
// ===================

const navItems = [...document.querySelectorAll('.nav-item')];
const navHome = document.querySelector('.nav-home');
const navClientList = document.querySelector('.nav-client-list');
const navAddClient = document.querySelector('.nav-add-client');
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

// Run function on click on nav
navClientList.addEventListener('click', list_users);

// Edit table contents
const tableBody = document.querySelector('.table-content');

function get_balance(user) {
    // displays in ₱ and commas
    let string = '₱' + user.balance.toLocaleString();
    if (string.includes('.')) {
        return string;
    } else return string + '.00'; // display whole numbers with trailing zeros
}

function list_users() {
    // refactor to not use innerHTML
    let div = "";

    clientList.forEach(function(item) {
        div += `
        <tr>
            <td>${item.accountNo}</td>
            <td>${item.fname} ${item.lname}</td>
            <td>${get_balance(item)}</td>
            <td>View Details</td>
            <td>Transact</td>
        </tr>`
    })
    tableBody.innerHTML = div;
}

// Add New Client button simulates click on Add Client nav
const clientListBtn = document.querySelector('.client-list-addBtn');
clientListBtn.addEventListener('click', function() {
    navAddClient.click();
})

// ====================
// == C. ADD CLIENT  ==
// ====================
const fnameInput = document.querySelector('#fname');
const lnameInput = document.querySelector('#lname');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const initialDepositInput = document.querySelector('#initial-deposit-amount');

function add_user() {
    // validates unique username
    if (clientList.some(function(item) {
        return usernameInput.value === item.username;
    })) {
        alert('Username already exists!');
        return;
    }
    
    // validates unique email
    if (clientList.some(function(item) {
        return emailInput.value === item.email;
    })) {
        alert('Email already in use!');
        return;
    }

    let user = new User('user', usernameInput.value, emailInput.value, undefined, 
    fnameInput.value, lnameInput.value, parseFloat(initialDepositInput.value), false);
    create_user(user);
    // Reset fields
    fnameInput.value = "";
    lnameInput.value = "";
    usernameInput.value = "";
    emailInput.value = "";
    initialDepositInput.value = "";
}

function create_user(user) {
    clientList.push(user);
}
// =====================
// == D. TRANSACTIONS ==
// =====================
// Da. NAVIGATION
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

// Db. Deposit
const depositBtn = document.querySelector('#deposit-btn');
const depositAccountNoInput = document.querySelector('#deposit-account-no');
const depositAmountInput = document.querySelector('#deposit-amount');

function deposit(user, amount) {
    let index = clientList.findIndex(function(item) {
        return item.accountNo == depositAccountNoInput.value;
    })
    if (index === -1) {
        alert('Account No. does not exist!');
        return;
    }

    if (!depositAmountInput.value) {
        alert('Please enter valid amount.');
        return;
    }

    let selectedUser = clientList[index];
    selectedUser.balance += parseFloat(depositAmountInput.value);

    //reset values
    depositAccountNoInput.value = "";
    depositAmountInput.value = "";
    return;
}

depositBtn.addEventListener('click', deposit);

// Dc. Withdraw
const withdrawBtn = document.querySelector('#withdraw-btn');
const withdrawAccountNoInput = document.querySelector('#withdraw-account-no');
const withdrawAmountInput = document.querySelector('#withdraw-amount');

function withdraw(user, amount) {
    let index = clientList.findIndex(function(item) {
        return item.accountNo == withdrawAccountNoInput.value;
    })
    if (index === -1) {
        alert('Account No. does not exist!');
        return;
    }

    if (!withdrawAmountInput.value) {
        alert('Please enter valid amount.');
        return;
    }

    let selectedUser = clientList[index];
    if (selectedUser.balance < withdrawAmountInput.value) {
        alert('Insufficient account balance. Cancelling transaction.');
        return;
    }
    selectedUser.balance -= parseFloat(withdrawAmountInput.value);

    //reset values
    withdrawAccountNoInput.value = "";
    withdrawAmountInput.value = "";
    return;
}

withdrawBtn.addEventListener('click', withdraw);

// Dd. Transfer
const transferBtn = document.querySelector('#transfer-btn');
const transferSenderNoInput = document.querySelector('#transfer-sender-no');
const transferAmountInput = document.querySelector('#transfer-amount');
const transferReceiverNoInput = document.querySelector('#transfer-receiver-no');

function send(from_user, to_user, amount) {
    // code
}

// ================================
// == E. INITIALIZE TRANSACTIONS ==
// ================================
// create two user accounts
create_user(new User(undefined, "ANormalGuy31", "atlas3@g.com", "911Emergency", "Johnny", "Smith", 498087.54, false));
create_user(new User(undefined, "GirlOnFire", "dragoon66@ymail.com", "DragonLady", "Vicky", "Bella", 210498087.98, false));