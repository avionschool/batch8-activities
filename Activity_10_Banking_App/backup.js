var newArr = [];

//if there an accountNumber key, get the accountNumber. If there's none, start with 100
//you call values via key
if (JSON.parse(localStorage.getItem('accountNumber'))) {
    //you need to put JSON or else it will return "accountNumber" : "101"
    //with JSON 101
    accountNumber = JSON.parse(localStorage.getItem('accountNumber'));
} else {
    accountNumber = 100;
}


if (JSON.parse(localStorage.getItem('newArr'))) {
    newArr = JSON.parse(localStorage.getItem('newArr'));
} else {
    newArr = [];
}


//Why is it null? I can get the key and value from the previous page
document.getElementById('greetUser').innerHTML = greeting();

function greeting() {
    let urlString = window.location.search;
    let keyAndValue = new URLSearchParams(urlString);
     //use "new URLSearchParams" to get the key and value
    let userName = keyAndValue.get('userName');
    //this line is using the "name" of the input that's in the html file
    // let greetUser = "Hi " + userName + "!" + " How are you?";
    let greetUser = "Hi there! How are you?";
    return greetUser;
}

function createAccount() {
    let newAccountName = document.getElementById('newAccountName');
    let initialBalance = document.getElementById('initialBalance');
    let RegisteredAccountName = document.getElementById('RegisteredAccountName');
    let balance = document.getElementById('balance');
    
    let newAccount = {
        name: newAccountName.value,
        balance: initialBalance.value
    }

    // let accountDetails = JSON.parse(localStorage.getItem('data'));
    //always convert string back to object so it's readable
    // console.log(accountDetails.name);
    // console.log(accountDetails.balance);

    // if (newAccountName.value == accountDetails.name) {
    //    alert ('Error: Account name already taken!');
    // } 
    if (newAccountName.value.length == 0 && initialBalance.value.length == 0) {
        return alert ('Error: Please fill out the details required!');
    } else if (newAccountName.value.length == 0) {
        return alert ('Error: Please type in your new account name.');
    } else if (initialBalance.value.length == 0) {
        return alert ('Error: Please type in your initial balance.');
    } else {
        accountNumber = accountNumber + 1;
        // console.log(accountNumber);
        localStorage.setItem(accountNumber, JSON.stringify(newAccount));
        //value of the key
        localStorage.setItem('accountNumber', JSON.stringify(accountNumber));
        //key
        //displaying the lastest accountNumber
        let accountNumberParsed = JSON.parse(localStorage.getItem(accountNumber));
        //Output without JSON.stringify = [Object Object]
        newArr.push(accountNumberParsed);
        //console.log(newArr);

        // arrayNumber = `array${accountNumber}`;
        // //naming convention
        // localStorage.setItem(arrayNumber, JSON.stringify(newArr));
        // newArr = JSON.parse(localStorage.getItem(arrayNumber));
        // //updated the value of the new array

        let listAccountName = document.createElement('p');
        listAccountName.innerHTML = newArr[newArr.length-1].name;
        // console.log(newArr[newArr.length-1].name);
        RegisteredAccountName.appendChild(listAccountName);

        let listBalance = document.createElement('p');
        listBalance.innerHTML = newArr[newArr.length-1].balance;
        // console.log(newArr[newArr.length-1].balance);
        balance.appendChild(listBalance);
    }
}

function deposit() {
    let depositTo = document.getElementById('depositTo');
    let depositAmount = document.getElementById('depositAmount');
    let balance = document.getElementById('balance');
    // let accountDetails = JSON.parse(localStorage.getItem('data'));

    // if (depositTo.value.length == 0 && depositAmount.value.length == 0) {
    //     alert ('Error: Please fill out the deposit details required!');
    // } else if (depositTo.value.length == 0) {
    //     alert ('Error: Please type in your account name.');
    // } else if (depositAmount.value.length == 0) {
    //     alert ('Error: Please type in the amount.');
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].name != depositTo.value) {
                console.log('Error: Account name not found!');
            } else {        
                //apple 5 index 0
                newArr.name == depositTo.value;
                //apple[0] == apple
                newBalance = Number(depositAmount.value) + Number(newArr[i].balance);
                //newBalance = 1 + 5
                newArr[i].balance = newBalance;
                //5 = 6
                localStorage.setItem(i + 101, JSON.stringify(newArr[i]));
                //you need to target the key"101"(for example) and the value ("name": "", "balance": "")
                //0 + 101 = 101. 101 = index 0. index 0 = apple. setItem-push newArr[i]balance
                let newArr = JSON.parse(localStorage.getItem(i + 101));
                //sa key ka lang lagi pwde mag shoot
                balance.innerText = newArr[i].balance;
                alert ('Sucess: Deposit successful!');
                // console.log(test)
            }            
    // }
    }
}

// function withdraw() {
//     let withdrawFrom = document.getElementById('withdrawFrom');
//     let withdrawAmount = document.getElementById('withdrawAmount');
//     let balance = document.getElementById('balance');
//     let accountDetails = JSON.parse(localStorage.getItem('data'));

//     if (withdrawFrom.value.length == 0 && withdrawAmount.value.length == 0) {
//         alert ('Error: Please fill out the withdraw details required!');
//     } else if (withdrawFrom.value.length == 0) {
//         alert ('Error: Please type in your account name.');
//     } else if (withdrawAmount.value.length == 0) {
//         alert ('Error: Please type in the amount.');
//     } else if (withdrawFrom.value != accountDetails.name) {
//         alert ('Error: Account name not found!');
//     } else { (withdrawFrom.value == accountDetails.name)
//         newBalance = Number(accountDetails.balance) - Number(withdrawAmount.value);
//         // console.log(accountDetails.balance);
//         balance.innerText = newBalance;
//         alert ('Sucess: Withdraw successful!');
//     }
// }
// }