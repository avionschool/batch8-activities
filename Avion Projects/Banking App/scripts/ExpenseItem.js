class ExpenseItem {
    constructor(name, amount, expenseType, accountNo) {
        this.name = name;
        this.amount = amount;
        this.expenseType = expenseType;
        this.owner = accountNo;
        this.transactionDate = new Date();
    }

    update(name, amount, expenseType, accountNo) {
        this.name = name;
        this.amount = amount;
        this.expenseType = expenseType;
        this.owner = accountNo;
    }
}