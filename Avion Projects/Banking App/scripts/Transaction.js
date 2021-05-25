// GLOBAL VARS
var transactionHistory_str = localStorage.getItem("transactionHistory");

// Initialize clientlist from local storage, or if not in local storage, from empty array
if (!transactionHistory_str) {
    var transactionHistory = [];
} else {
    var transactionHistory = JSON.parse(transactionHistory_str);
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