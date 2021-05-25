// ===================
// == GLOBAL VARS  ===
// ===================
var clientList_str = localStorage.getItem("clientList");
var transactionHistory_str = localStorage.getItem("transactionHistory");

// Initialize clientlist from local storage, or if not in local storage, from empty array
if (!clientList_str) {
    var clientList = [];
} else {
    var clientList = JSON.parse(clientList_str);
}

if (!transactionHistory_str) {
    var transactionHistory = [];
} else {
    var transactionHistory = JSON.parse(transactionHistory_str);
}

// JSON
function updateJSONClientList() {
    clientList_str = JSON.stringify(clientList);
    localStorage.setItem("clientList", clientList_str);
    transactionHistory_str = JSON.stringify(transactionHistory);
    localStorage.setItem("transactionHistory", transactionHistory_str);
}

// ===================
// == A. Nav Bar   ===
// ===================

const navItems = [...document.querySelectorAll('.nav-item')];
const navHome = document.querySelector('.nav-home');
const navClientList = document.querySelector('.nav-client-list');
const navAddClient = document.querySelector('.nav-add-client');
const navTransactions = document.querySelector('.nav-transactions');
const navHistory = document.querySelector('.nav-history');
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

// initial transactions
const loadInitialTransBtn = document.querySelector('#test-transactions');
loadInitialTransBtn.addEventListener('click', function() {
    // create three user accounts
    create_user(new User(undefined, "ANormalGuy31", "atlas3@google.com", "911Emergency", "Johnny", "Smith", 498087.54, false));
    create_user(new User(undefined, "GirlOnFire", "dragoon66@ymail.com", "DragonLady", "Vicky", "Bella", 9987.98, false));
    create_user(new User(undefined, "HighBaller", "bennyBenny@proton.com", "FalloutNV", "Benny", "Baller", 21498087.98, false));
    // deposit, withdraw, transfer
    deposit(clientList[0], 3000);
    withdraw(clientList[1], 5007.88);
    send(clientList[2], clientList[1], 222.22);
    remove_user(0);
    // hide the button
    loadInitialTransBtn.style.display = "none";
});

// Hide button if clientList already has content
if (clientList.length > 0) {
    loadInitialTransBtn.style.display = "none";
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

function list_users() {
    // refactor to not use innerHTML
    let div = "";

    clientList.forEach(function(item) {
        div += `
        <tr>
            <td>${item.accountNo}</td>
            <td>${item.fname} ${item.lname}</td>
            <td>${get_balance(item)}</td>
            <td class="clickable-view-details">View Details</td>
            <td class="clickable-transact">Transact</td>
        </tr>`
    })
    tableBody.innerHTML = div;
    addViewProfileHandler();
    addTransactHandler();
    return clientList;
}

// MODAL
const modal = document.querySelector('.profile-modal');
const modalContent = document.querySelector('.profile-content');
const modalClose = document.querySelector('.close');
const spanAccountNo = document.querySelector('#profile-account-no');
const spanUsername = document.querySelector('#profile-username');
const spanEmail = document.querySelector('#profile-email');
const spanFname = document.querySelector('#profile-fname');
const spanLname = document.querySelector('#profile-lname');
const spanBalance = document.querySelector('#profile-balance');
const spanMemberSince = document.querySelector('#profile-member-since');
const spanIsAdmin = document.querySelector('#profile-isAdmin');

// Open Modal to view Profile
function addViewProfileHandler() {
    // target all view details
    const viewProfile = [...document.querySelectorAll('.clickable-view-details')];
    // and add click event to open view profile modal
    viewProfile.forEach(function(item, index) {
        let selectedUser = clientList[index];
        item.addEventListener('click', function() {
            modal.classList.remove('hide');
            spanBalance.textContent = get_balance(selectedUser);
            spanAccountNo.textContent = selectedUser.accountNo;
            spanFname.textContent = selectedUser.fname;
            spanLname.textContent = selectedUser.lname;
            spanUsername.textContent = selectedUser.username;
            spanEmail.textContent = selectedUser.email;
            let today = new Date(selectedUser.memberSince); // convert to Date object first
            spanMemberSince.textContent = today.toLocaleString();
            spanIsAdmin.textContent = selectedUser.isAdmin;
        })
    })
}

// DELETE PROMPT INSIDE THE MODAL
const promptModal = document.querySelector('#delete-profile-prompt');
const transHistoryBtn = document.querySelector('#profile-transaction-history');
const deleteProfileBtn = document.querySelector('#profile-trash-btn');
const promptCancel = document.querySelector('#prompt-cancel');
const promptConfirm = document.querySelector('#prompt-confirm');

// Close view profile modal when user clicks on Modal's 'x' or outside the modal window
modalClose.onclick = hideModals;

window.onclick = function(event) {
if (event.target == modal) hideModals();
}

function hideModals() {
    modal.classList.add('hide');
    promptModal.classList.add('hide');
}

// View Transaction History
transHistoryBtn.addEventListener('click', function() {
    hideModals();
    navHistory.click();
    filterInputTable.value = spanAccountNo.textContent;
    filterHistoryTable();
});

// open delete prompt on trash icon click
deleteProfileBtn.addEventListener('click', function() {
    promptModal.classList.remove('hide');
})

// cancel button closes prompt modal
promptCancel.onclick = function() {
    promptModal.classList.add('hide');
}

// confirm button on delete prompt will delete current user
promptConfirm.addEventListener('click', function() {
    // look for specific user index
    let index = clientList.findIndex(function(item) {
        return item.accountNo === spanAccountNo.textContent;
    })
    hideModals(); // hide modals
    remove_user(index);
    list_users(); // refresh table
})

function remove_user(index) {
    let message = `eleted Account No. ${clientList[index].accountNo}`;
    showAndFadeAlert(`Successfully d`+message, 'success');
    newTransaction(clientList[index].accountNo, `${clientList[index].fname} ${clientList[index].lname}`, 'Close', `D`+message, -clientList[index].balance, 0);
    clientList.splice(index, 1); // from index position, remove 1 specific element (itself)
    updateJSONClientList(); // update local storage
}

function addTransactHandler() {
    // target all transact
    const transact = [...document.querySelectorAll('.clickable-transact')];
    // and add click event to open view profile modal
    transact.forEach(function(item, index) {
        let selectedUser = clientList[index];
        item.addEventListener('click', function() {
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

// On form submit, add user
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
    let message = `dded ${user.fname} ${user.lname} as a new client`;
    newTransaction(user.accountNo, `${user.fname} ${user.lname}`, 'Open', `A`+message, user.balance, user.balance);
    updateJSONClientList();
    showAndFadeAlert('Successfully a' + message, 'sucess')
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

// On form submit, deposit
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
    let message = `eposited ₱${amount.toLocaleString()} into Account No. ${user.accountNo}`;
    newTransaction(user.accountNo, `${user.fname} ${user.lname}`, 'Deposit', `D`+message, amount, user.balance);
    showAndFadeAlert('Successfully d'+message, 'success');
    updateJSONClientList();
    return user.balance;
}

// Dc. Withdraw
const withdrawAccountNoInput = document.querySelector('#withdraw-account-no');
const withdrawAmountInput = document.querySelector('#withdraw-amount');
const formWithdraw = document.querySelector('#form-withdraw');

// On form submit, withdraw
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
    let message = `ithdrew ₱${amount.toLocaleString()} from Account No. ${user.accountNo}`;
    newTransaction(user.accountNo, `${user.fname} ${user.lname}`, 'Withdraw', `W`+message, -amount, user.balance);
    showAndFadeAlert(`Successfully w`+message, 'sucess');
    updateJSONClientList();
    return user.balance;
}

// Dd. Transfer
const transferSenderNoInput = document.querySelector('#transfer-sender-no');
const transferAmountInput = document.querySelector('#transfer-amount');
const transferReceiverNoInput = document.querySelector('#transfer-receiver-no');
const formTransfer = document.querySelector('#form-transfer');

// On form submit, transfer
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
    let message1 = `Transferred ₱${display_balance(amount)} to Account No. ${to_user.accountNo}`;
    newTransaction(from_user.accountNo, `${from_user.fname} ${from_user.lname}`, 'Transfer', message1, -amount, from_user.balance);
    let message2 = `Received ₱${display_balance(amount)} from Account No. ${from_user.accountNo}`;
    newTransaction(to_user.accountNo, `${to_user.fname} ${to_user.lname}`, 'Transfer', message2, amount, to_user.balance);
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
// == F. TRANSACTION HISTORY     ==
// ================================
const filterInputTable = document.querySelector('#history-table-filter');
const historyTable = document.querySelector('.history-content');

filterInputTable.addEventListener('keydown', filterHistoryTable);
filterInputTable.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        filterInputTable.value = null;
        filterHistoryTable();
    }
});

function filterHistoryTable() {
    let filter, tr, td, cell;
    filter = filterInputTable.value.toUpperCase();
    tr = historyTable.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        // Hide the row initially.
        tr[i].style.display = "none";
    
        td = tr[i].getElementsByTagName("td");
        for (let j = 0; j < 4; j++) { // only search first 4 columns
          cell = tr[i].getElementsByTagName("td")[j];
          if (cell) {
            if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
              break;
            } 
          }
        }
    }
}

function show_history() {
    // refactor to not use innerHTML
    let div = "";

    transactionHistory.forEach(function(item) {
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
    })
    historyTable.innerHTML = div;
    return transactionHistory;
}

function newTransaction(accountNo, name, type, details, amount, runningBalance) {
    let transaction = new Transaction(accountNo, name, type, details, amount, runningBalance);
    transactionHistory.unshift(transaction);
    show_history();
}

// Initialize
show_history();