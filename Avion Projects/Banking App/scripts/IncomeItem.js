class IncomeItem {
    constructor(name, amount, accountNo) {
        this.name = name;
        this.amount = amount;
        this.owner = accountNo;
        this.transactionDate = new Date();
    }

    update(name, amount, accountNo) {
        this.name = name;
        this.amount = amount;
        this.owner = accountNo;
    }
}