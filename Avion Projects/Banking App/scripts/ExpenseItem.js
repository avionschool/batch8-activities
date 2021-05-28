class ExpenseItem {
    constructor(name, amount, expenseType, accountNo, transactionDate, transactionTime) {
        this.name = name;
        this.amount = amount;
        this.expenseType = expenseType;
        this.owner = accountNo;
        this.transactionDate = transactionDate;
        this.transactionTime = transactionTime;
    }

    update(name, amount, expenseType, accountNo, transactionDate,transactionTime) {
        this.name = name;
        this.amount = amount;
        this.expenseType = expenseType;
        this.owner = accountNo;
        this.transactionDate = transactionDate;
        this.transactionTime = transactionTime;
    }
}