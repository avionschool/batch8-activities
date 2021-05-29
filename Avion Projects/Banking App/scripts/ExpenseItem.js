class ExpenseItem {
    constructor(name, amount, expenseType, accountNo, transactionDate, transactionTime) {
        this.name = name;
        this.amount = amount;
        this.expenseType = expenseType;
        this.owner = accountNo;
        this.transactionDate = transactionDate;
        this.transactionTime = transactionTime;
    }

    static update(name, amount, expenseType, accountNo, transactionDate,transactionTime) {
        currentExpense.name = name;
        currentExpense.amount = amount;
        currentExpense.expenseType = expenseType;
        currentExpense.owner = accountNo;
        currentExpense.transactionDate = transactionDate;
        currentExpense.transactionTime = transactionTime;
    }
}
