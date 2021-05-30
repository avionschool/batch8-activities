class IncomeItem {
    constructor(name, amount, incomeType, accountNo, transactionDate, transactionTime) {
        this.name = name;
        this.amount = amount;
        this.incomeType = incomeType;
        this.owner = accountNo;
        this.transactionDate = transactionDate;
        this.transactionTime = transactionTime;
    }

    static update(name, amount, incomeType, accountNo, transactionDate, transactionTime) {
        currentIncome.name = name;
        currentIncome.amount = amount;
        currentIncome.incomeType = incomeType;
        currentIncome.owner = accountNo;
        currentIncome.transactionDate = transactionDate;
        currentIncome.transactionTime = transactionTime;
    }
}