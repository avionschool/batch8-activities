document.getElementById('greetUser').innerHTML = greeting();

function greeting(){
    let urlString = window.location.search;
    let keyAndValue = new URLSearchParams(urlString);
     //use "new URLSearchParams" to get the key and value
    let userName = keyAndValue.get('userName');
    //this line is using the "name" of the input that's in the html file
    let greetUser = "Hi " + userName + "!";
    return greetUser;
}

// let currentBalance = 0;
// document.getElementById('currentBalance').innerHTML = currentBalance;
// let transactionHistory = document.getElementById('transactionHistory');
// let depositButton = document.getElementById('depositButton');
// let withdrawButton = document.getElementById('withdrawButton');

// function deposit() {
//     let depositAmount = Number(document.getElementById('depositAmount').value);
//     //"number()" changing your string into a number
//     let updatedBalance = depositAmount + currentBalance;
//     currentBalance = updatedBalance;
//     document.getElementById('currentBalance').innerHTML = "Php" + currentBalance;
// }

// depositButton.addEventListener('click', function(){
//     let newTransaction = document.createElement('p');
//     newTransaction.innerText = "You deposited Php" + depositAmount.value + " to your acccount.\n" + "Current balance: " + currentBalance;
//     transactionHistory.appendChild(newTransaction);
// })

// function withdraw() {
//     let withdrawAmount = Number(document.getElementById('withdrawAmount').value);
//     let updatedBalance = currentBalance - withdrawAmount;
//     currentBalance = updatedBalance;
//     document.getElementById('currentBalance').innerHTML = "Php" + currentBalance;
// }

// withdrawButton.addEventListener('click', function(){
//     let newTransaction = document.createElement('p');
//     newTransaction.innerText = "You withdrew Php" + withdrawAmount.value + " to your acccount.\n" + "Current balance: " + currentBalance;
//     transactionHistory.appendChild(newTransaction);
// })

let tempBalance = 0;
document.getElementById('currentBalance').innerHTML = tempBalance;
let transactionHistory = document.getElementById('transactionHistory');
let depositButton = document.getElementById('depositButton');
let withdrawButton = document.getElementById('withdrawButton');
let depositAmount = document.getElementById('depositAmount').value;
let withdrawAmount = document.getElementById('withdrawAmount').value;

class User {
    constructor(tempName, tempBalance) {
        this.name = tempName;
        this.balance = tempBalance;
        this.deposit = this.deposit.bind(this);
        this.withdraw = this.withdraw.bind(this);
        //deposit() and withdraw() can't find find this.name and this.balance constructors so you need to use .bind.
    }
    deposit() {
        let depositAmount = Number(document.getElementById('depositAmount').value);
        //"number()" changing your string into a number
        let updatedBalance = depositAmount + this.balance;
        this.balance = updatedBalance;
        //you can put the .addEventListener function together here and call the whole deposit() function below using .addEventListener.
        document.getElementById('currentBalance').innerHTML = "Php" + this.balance;
        let newTransaction = document.createElement('p');
        newTransaction.innerText = "You deposited Php" + depositAmount + " to your acccount.\n" + "Current balance: " + this.balance;
        transactionHistory.appendChild(newTransaction);
    }
    withdraw() {
        let withdrawAmount = Number(document.getElementById('withdrawAmount').value);
        let updatedBalance = this.balance - withdrawAmount;
        this.balance = updatedBalance;
        document.getElementById('currentBalance').innerHTML = "Php" + this.balance;
        let newTransaction = document.createElement('p');
        newTransaction.innerText = "You withdrew Php" + withdrawAmount + " to your acccount.\n" + "Current balance: " + this.balance;
        transactionHistory.appendChild(newTransaction);
    }
}

let userOne = new User ("Jan", 0);
depositButton.addEventListener('click', userOne.deposit);
withdrawButton.addEventListener('click', userOne.withdraw);
//this is how you call a function using .addEventListner
    
// class Player {
// //class doesn't have a ()parameter
//     constructor(tempName, team){
//         this.name = tempName;
//         this.team = team;
//     }
//     inductPlayer(){
//         return `${this.name} is HOF Class 2020`;
//     }
//     //Polymorphysm
//     //log inducteeOne.displayName()
//     displayName(){
//          console.log(this.name);
//     }
// }
    
// class Superstar extends Player {
// //extends gets what Player class has
//         constructor(name, team, tempNumRings, totalCareerScore){
//             super(name, team);
//             //inheriting the name and team
//             this.numRings = tempNumRings;
//             this.totalCareerScore = totalCareerScore;
//         }
//         displayName(){
//             console.log("Superstar Name:" + this.name);
//         //log playerOne.displayName()
//         }
//         displayNumCareerScore(){
//             return `The total career score of ${this.name} is ${this.totalCareerScore}`;
//         }
// }
    
// let playerOne = new Superstar("michaelJordan", "Bulls", 5, 1000);
// let inducteeOne = new Player("kobeBryant", "Lakers");
// let inducteeTwo = new Player("timDuncan", "Spurs");
// let inducteeThree = new Player("kevinGarnett", "Timber Wolves");
    
// console.log(inducteeOne.name);
// console.log(inducteeTwo.inductPlayer());
// console.log(inducteeThree.team);
// console.log(playerOne);
// console.log(playerOne.displayNumCareerScore());