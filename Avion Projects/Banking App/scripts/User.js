// GLOBAL VARS
let generatedAccountNos = []; // Array of unique account nos.

// Initialize clientlist from local storage, or if not in local storage, from empty array
var clientList_str = localStorage.getItem("clientList");
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
        this.isAdmin = isAdmin;
        this.memberSince = new Date();
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

let x = new User(undefined, 'admin', undefined, '1234', undefined, undefined, undefined, true);

let admin = {
    username: "admin",
    password: "1234",
    isAdmin: true};
clientList.push(admin);