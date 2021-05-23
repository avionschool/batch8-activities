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

// global vars
let generatedAccountNos = []; // Array of unique account nos.

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