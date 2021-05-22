// ===================
// == GLOBAL VARS  ===
// ===================
var clientList_str = localStorage.getItem("clientList");

// Initialize clientlist from local storage, or if not in local storage, from empty array
if (!clientList_str) {
    var clientList = [];
} else {
    var clientList = JSON.parse(clientList_str);
}

// JSON
function updateJSONClientList() {
    clientList_str = JSON.stringify(clientList);
    localStorage.setItem("clientList", clientList_str);
}

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
    addViewProfileHandler();
    addTransactHandler();
    return clientList;
}

// modal
let modal = document.querySelector('.profile-modal');
let modalClose = document.querySelector('.close');
let spanAccountNo = document.querySelector('#profile-account-no');
let spanEmail = document.querySelector('#profile-email');
let spanFname = document.querySelector('#profile-fname');
let spanLname = document.querySelector('#profile-lname');
let spanBalance = document.querySelector('#profile-balance');
let spanIsAdmin = document.querySelector('#profile-isAdmin');

// Close modal when user clicks on Modal's 'x' or outside the modal window
modalClose.onclick = function() {
    modal.style.display = "none";
  }

window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

// Open Modal to view Profile
function addViewProfileHandler() {
    let rows = [...tableBody.getElementsByTagName('tr')]; // targets table rows
    rows.forEach(function(row, index) {
        // select user
        let selectedUser = clientList[index];
        // in each row, target View Profile and style
        let viewProfile = row.children[3]; 
        viewProfile.style.textDecoration = "underline";
        viewProfile.style.cursor = "pointer";
        // On click, Open modal and manipulate contents
        viewProfile.addEventListener('click', function() {
            modal.style.display = "block";
            spanAccountNo.textContent = selectedUser.accountNo;
            spanEmail.textContent = selectedUser.email;
            spanFname.textContent = selectedUser.fname;
            spanLname.textContent = selectedUser.lname;
            spanBalance.textContent = get_balance(selectedUser);
            spanIsAdmin.textContent = selectedUser.isAdmin;
        })
    })
}

// Navigate to Transactions section with Profile's details
function addTransactHandler() {
    let rows = [...tableBody.getElementsByTagName('tr')]; // targets table rows
    rows.forEach(function(row, index) {
        // select user
        let selectedUser = clientList[index];
        // in each row, target View Profile and style
        let transact = row.children[4]; 
        transact.style.textDecoration = "underline";
        transact.style.cursor = "pointer";
        // On click, Open modal and manipulate contents
        transact.addEventListener('click', function() {
            navTransactions.click();
            depositAccountNoInput.value = selectedUser.accountNo;
            withdrawAccountNoInput.value = selectedUser.accountNo;
            transferSenderNoInput.value = selectedUser.accountNo;
        })
    })
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
const formAddClient = document.querySelector('#form-add-client');
formAddClient.addEventListener('submit', function(e) {
    add_user();
    e.preventDefault(); // prevent page reload
    return false;
});

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
    clientList.unshift(user);
    updateJSONClientList();
    showAndFadeAlert(`Successfully added ${user.fname} ${user.lname} as a new client`, 'sucess')
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

// Function for resetting forms in transactions section
function resetTransactionForms() {
    depositAccountNoInput.value = "";
    depositAmountInput.value = "";
    withdrawAccountNoInput.value = "";
    withdrawAmountInput.value = "";
    transferSenderNoInput.value = "";
    transferAmountInput.value = "";
    transferReceiverNoInput.value = "";
}

// Db. Deposit
const depositAccountNoInput = document.querySelector('#deposit-account-no');
const depositAmountInput = document.querySelector('#deposit-amount');
const formDeposit = document.querySelector('#form-deposit');
formDeposit.addEventListener('submit', function(e) {
    form_deposit();
    e.preventDefault(); // prevent page reload
    return false; 
});

function form_deposit() {
    let index = clientList.findIndex(function(item) {
        return item.accountNo == depositAccountNoInput.value;
    })
    if (index === -1) {
        alert('Account No. does not exist!');
        return;
    }

    let selectedUser = clientList[index];
    deposit(selectedUser, parseFloat(depositAmountInput.value));

    //reset values
    resetTransactionForms();
    return;
}

function deposit(user, amount) {
    user.balance += amount;
    showAndFadeAlert(`₱${amount.toLocaleString()} was successfully deposited into Account No. ${user.accountNo}`, 'sucess');
    updateJSONClientList();
    return user.balance;
}

// Dc. Withdraw
const withdrawAccountNoInput = document.querySelector('#withdraw-account-no');
const withdrawAmountInput = document.querySelector('#withdraw-amount');
const formWithdraw = document.querySelector('#form-withdraw');
formWithdraw.addEventListener('submit', function(e) {
    form_withdraw();
    e.preventDefault(); // prevent page reload
    return false; 
});

function form_withdraw() {
    let index = clientList.findIndex(function(item) {
        return item.accountNo == withdrawAccountNoInput.value;
    })
    if (index === -1) {
        alert('Account No. does not exist!');
        return;
    }

    let selectedUser = clientList[index];
    if (selectedUser.balance < withdrawAmountInput.value) {
        alert('Insufficient account balance. Cancelling transaction.');
        return;
    }
    withdraw(selectedUser, parseFloat(withdrawAmountInput.value))

    //reset values
    resetTransactionForms();
    return;
}

function withdraw(user, amount) {
    user.balance -= amount;
    showAndFadeAlert(`₱${amount.toLocaleString()} was successfully withdrawn from Account No. ${user.accountNo}`, 'sucess');
    updateJSONClientList();
    return user.balance;
}

// Dd. Transfer
const transferSenderNoInput = document.querySelector('#transfer-sender-no');
const transferAmountInput = document.querySelector('#transfer-amount');
const transferReceiverNoInput = document.querySelector('#transfer-receiver-no');
const formTransfer = document.querySelector('#form-transfer');
formTransfer.addEventListener('submit', function(e) {
    form_transfer();
    e.preventDefault(); // prevent page reload
    return false; 
});

function form_transfer() {
    let indexA = clientList.findIndex(function(item) {
        return item.accountNo == transferSenderNoInput.value;
    })
    if (indexA === -1) {
        alert('Sender Account No. does not exist!');
        return;
    }

    let indexB = clientList.findIndex(function(item) {
        return item.accountNo == transferReceiverNoInput.value;
    })
    if (indexB === -1) {
        alert('Receiver Account No. does not exist!');
        return;
    }
    let selectedUserA = clientList[indexA];
    let selectedUserB = clientList[indexB];
    if (selectedUserA === selectedUserB) {
        alert('Cannot transfer to/from the same account!');
        return;
    }
    if (selectedUserA.balance < transferAmountInput.value) {
        alert('Insufficient account balance from Sender. Cancelling transaction.');
        return;
    }
    send(selectedUserA, selectedUserB, parseFloat(transferAmountInput.value));

    //reset values
    resetTransactionForms();
    return;
}

function send(from_user, to_user, amount) {
    from_user.balance -= amount;
    to_user.balance += amount;
    showAndFadeAlert(`Account No. ${from_user.accountNo} successfully transferred ₱${amount.toLocaleString()} to Account No. ${to_user.accountNo}`, 'sucess');
    updateJSONClientList();
    return `Sender balance: ${get_balance(from_user)} | Receiver balance: ${get_balance(to_user)}`;
}
// ================================
// == E. SUCCESS/ERROR    ALERTS ==
// ================================
let my_alert = document.querySelector('.my_alert');

function showAndFadeAlert(message, type) {
    // change bg color
    if (type === "failure") {
        my_alert.style.color = "#D8000C";
        my_alert.style.backgroundColor = "#FFD2D2"
    } else {
        my_alert.style.color = "#4F8A10";
        my_alert.style.backgroundColor = "#DFF2BF"
    }

    my_alert.style.display = "initial"; // show alert message
    my_alert.style.opacity = "1";
    if (message) {my_alert.children[0].textContent = message};
    setTimeout(function() {
        my_alert.style.opacity = "0";
        my_alert.style.display = "none";
    }, 5000); // and then fade after 5000ms
}

// ================================
// == F. Testing                 ==
// ================================
// create two user accounts
// create_user(new User(undefined, "ANormalGuy31", "atlas3@g.com", "911Emergency", "Johnny", "Smith", 498087.54, false));
// create_user(new User(undefined, "GirlOnFire", "dragoon66@ymail.com", "DragonLady", "Vicky", "Bella", 210498087.98, false));