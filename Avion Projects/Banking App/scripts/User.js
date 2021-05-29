// ===================
// == GLOBAL VARS  ===
// ===================

// JSON
function updateJSONClientList() {
    clientList_str = JSON.stringify(clientList);
    localStorage.setItem("clientList", clientList_str);
    transactionHistory_str = JSON.stringify(transactionHistory);
    localStorage.setItem("transactionHistory", transactionHistory_str);
}

let generatedAccountNos = []; // Array of unique account nos.

// Initialize clientlist from local storage, or if not in local storage, from empty array
var clientList_str = localStorage.getItem("clientList");
var transactionHistory_str = localStorage.getItem("transactionHistory");

if (!transactionHistory_str) {
    var transactionHistory = [];
} else {
    var transactionHistory = JSON.parse(transactionHistory_str);
}

if (!clientList_str) {
    var clientList = [];
} else {
    var clientList = JSON.parse(clientList_str);
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
        this.incomeItems = [];
        this.isAdmin = isAdmin;
        this.memberSince = new Date();
        }

    static add(transaction) {
        currentUser.expenseItems.unshift(transaction);
    }

    static delete(transaction) {
        // code for expense items
    }

    static list() {
        createExpenseTable();
    }
}

class Transaction {
    constructor(accountNo, name, type, details, amount, runningBalance) {
        this.date = new Date().toLocaleDateString();
        this.time = new Date().toLocaleTimeString('en-US', { hour12: false });
        this.accountNo = accountNo;
        this.name = name;
        this.type = type;
        this.details = details;
        this.amount = amount;
        this.runningBalance = runningBalance;
    }
}

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

// ===========================================
// == ADMIN                                 ==
// ===========================================
// Check if there is already an admin user in clientList; if none, add one
(function addAdmin() {
    let i = clientList.findIndex(function(item) {
        return item.isAdmin;
    })
    if (i === -1) {
        let admin = {
            username: "admin",
            password: "1234",
            isAdmin: true
        };
        clientList.push(admin);
    }
})();