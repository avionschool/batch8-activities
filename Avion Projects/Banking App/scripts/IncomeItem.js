class IncomeItem {
    constructor(name, amount, accountNo, transactionDate, transactionTime) {
        this.name = name;
        this.amount = amount;
        this.owner = accountNo;
        this.transactionDate = transactionDate;
        this.transactionTime = transactionTime;
    }

    update(name, amount, accountNo, transactionDate, transactionTime) {
        this.name = name;
        this.amount = amount;
        this.owner = accountNo;
        this.transactionDate = transactionDate;
        this.transactionTime = transactionTime;
    }
}