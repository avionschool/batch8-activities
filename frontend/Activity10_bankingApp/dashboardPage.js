//logout function
let logout = document.getElementById('logout');
logout.addEventListener('click', function() {
    return window.location.replace('loginPage.html');
});

//displaying functions
//popup IDs
let initialPopup = document.getElementById('initialPopup');
let createPopup = document.getElementById('createPopup');
let depositPopup = document.getElementById('depositPopup');
let withdrawPopup = document.getElementById('withdrawPopup');
let transferPopup = document.getElementById('transferPopup');
let budgetPopup = document.getElementById('budgetPopup');
//addEventListener targets
let goToCreatePopup = document.getElementById('goToCreatePopup');
let goToDepositPopup = document.getElementById('goToDepositPopup');
let goToWithdrawPopup = document.getElementById('goToWithdrawPopup');
let goToTransferPopup = document.getElementById('goToTransferPopup');
let goToBudgetPopup = document.getElementById('goToBudgetPopup');
//addEventListener functions
goToCreatePopup.addEventListener('click', function() {
    initialPopup.classList.add('hidden');
    createPopup.classList.remove('hidden');
    depositPopup.classList.add('hidden');
    withdrawPopup.classList.add('hidden');
    transferPopup.classList.add('hidden');
    budgetPopup.classList.add('hidden');
});
goToDepositPopup.addEventListener('click', function() {
    initialPopup.classList.add('hidden');
    createPopup.classList.add('hidden');
    depositPopup.classList.remove('hidden');
    withdrawPopup.classList.add('hidden');
    transferPopup.classList.add('hidden');
    budgetPopup.classList.add('hidden');
});
goToWithdrawPopup.addEventListener('click', function() {
    initialPopup.classList.add('hidden');
    createPopup.classList.add('hidden');
    depositPopup.classList.add('hidden');
    withdrawPopup.classList.remove('hidden');
    transferPopup .classList.add('hidden');
    budgetPopup.classList.add('hidden');
});
goToTransferPopup.addEventListener('click', function() {
    initialPopup.classList.add('hidden');
    createPopup.classList.add('hidden');
    depositPopup.classList.add('hidden');
    withdrawPopup.classList.add('hidden');
    transferPopup.classList.remove('hidden');
    budgetPopup.classList.add('hidden');
});
goToBudgetPopup.addEventListener('click', function() {
    initialPopup.classList.add('hidden');
    createPopup.classList.add('hidden');
    depositPopup.classList.add('hidden');
    withdrawPopup.classList.add('hidden');
    transferPopup.classList.add('hidden');
    budgetPopup.classList.remove('hidden');
});

//global variables
let newArr = [];
let listBalanceID = 0;

//avoid resetting of accountNumber
if (JSON.parse(localStorage.getItem('accountNumber'))) {
    accountNumber = JSON.parse(localStorage.getItem('accountNumber'));
} else {
    accountNumber = 100;
}
//if there is an accountNumber key in the localstorage then accountNumber will be equivalent to that otherwise, start with 100
//you need to call the key of your accountNumber to call the value

//functions
function createAccount() {
    let newAccountName = document.getElementById('newAccountName');
    let initialBalance = document.getElementById('initialBalance');
    let RegisteredAccountName = document.getElementById('RegisteredAccountName');
    let balance = document.getElementById('balance');
    let newAccount = {
        name: newAccountName.value,
        balance: initialBalance.value
    }

    for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].name == newAccountName.value) {
            return alert ('Error: Duplicate account name.')
        }
    }

    if (newAccountName.value.length == 0 && initialBalance.value.length == 0) {
        return alert ('Error: Please fill out the details required!');
    } else if (newAccountName.value.length == 0) {
        return alert ('Error: Please type in the new account name.');
    } else if (initialBalance.value.length == 0) {
        return alert ('Error: Please type in the initial balance.');
    } else {
        accountNumber = accountNumber + 1;
        //accountNumber = 100, if localStorage.clear();
        console.log(accountNumber);

        localStorage.setItem(accountNumber, JSON.stringify(newAccount));
        //expected output = key: 101 / value: name: newAccountName.value + balance: initialBalance.value

        localStorage.setItem('accountNumber', JSON.stringify(accountNumber));
        //expected output = key: accountNumber / value: 101

        let accountNumberValue = JSON.parse(localStorage.getItem(accountNumber));
        //JSON.parse(localStorage.getItem(accountNumber)) = "{\"name\":\"jan\",\"balance\":\"1\"}"
        //you need to get the value of the accountNumber = 101 before pushing it

        newArr.push(accountNumberValue);
        console.log(newArr);
        
        let listAccountName = document.createElement('p');
        listAccountName.innerHTML = newArr[newArr.length-1].name;
        RegisteredAccountName.appendChild(listAccountName);
        console.log(newArr[newArr.length-1].name);
        //to display the .values inside each createElement, you get the lastest .values

        listBalanceID = listBalanceID + 1;
        //the same as listBalanceID += 1;
        let listBalance = document.createElement('p');
        listBalance.innerHTML = `<p id="${listBalanceID}">${newArr[newArr.length-1].balance}</p>`;
        balance.appendChild(listBalance);
        //created an id for each listBalance<p> create so we can add and subtract properly

        alert("Success: Account created!");
    }
}

function deposit() {
    let depositTo = document.getElementById('depositTo');
    let depositAmount = document.getElementById('depositAmount');

    if (depositTo.value.length == 0 && depositAmount.value.length == 0) {
        return alert ('Error: Please fill out the deposit details required!');
    } else if (depositTo.value.length == 0) {
        return alert ('Error: Please type in the account name.');
    } else if (depositAmount.value.length == 0) {
        return alert ('Error: Please type in the amount.');
    }

    // if (newArr[i].name != depositTo.value) {
    //     alert ('Error: Account name not found.')
    // }

    for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].name == depositTo.value) {
            sum = Number(depositAmount.value) + Number(newArr[i].balance);
            newArr[i].balance = sum;
            let targetedID = document.getElementById(i + 1);
            //using the sum of the ID to target and updated the innerHTML
            targetedID.innerHTML = sum;
            localStorage.setItem(i + 101, JSON.stringify(newArr[i]));
            //updating the localstorage ny sending the updated array[i]
            return alert ('Sucess: Deposit successful!');
        }
    }
}

function withdraw() {
    let withdrawFrom = document.getElementById('withdrawFrom');
    let withdrawAmount = document.getElementById('withdrawAmount');

    if (withdrawFrom.value.length == 0 && withdrawAmount.value.length == 0) {
        return alert ('Error: Please fill out the withdraw details required!');
    } else if (withdrawFrom.value.length == 0) {
        return alert ('Error: Please type in the account name.');
    } else if (withdrawAmount.value.length == 0) {
        return alert ('Error: Please type in the amount.');
    }
    
    for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].name == withdrawFrom.value) {
            difference =  Number(newArr[i].balance) - Number(withdrawAmount.value);
            newArr[i].balance = difference;
            let targetedID = document.getElementById(i + 1);
            targetedID.innerHTML = difference;
            localStorage.setItem(i + 101, JSON.stringify(newArr[i]));
            return alert ('Sucess: Withdraw successful!');
        }
    }
}

function transfer() {
    let fromWho = document.getElementById('fromWho');
    let sendTo = document.getElementById('sendTo');
    let sendAmount = document.getElementById('sendAmount');

    if (fromWho.value.length == 0 && sendTo.value.length == 0 && sendAmount.value.length == 0 || 
        fromWho.value.length == 0 && sendTo.value.length == 0 || 
        sendTo.value.length == 0 && sendAmount.value.length == 0 || 
        fromWho.value.length == 0 && sendAmount.value.length == 0) {
        return alert ('Error: Please fill out the details required!');
    } else if (fromWho.value.length == 0 || sendTo.value.length == 0) {
        return alert ('Error: Please type in the account name.');
    } else if (sendAmount.value.length == 0) {
        return alert ('Error: Please type in the amount.');
    }

    for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].name == fromWho.value) {
            deductValue = Number(newArr[i].balance) - Number(sendAmount.value);
            newArr[i].balance = deductValue;
            let targetedID = document.getElementById(i + 1);
            targetedID.innerHTML = deductValue;
            localStorage.setItem(i + 101, JSON.stringify(newArr[i]));
            alert ('Sucess: Deduct successful!');
        }
        
        if (newArr[i].name == sendTo.value) {
            addValue = Number(newArr[i].balance) + Number(sendAmount.value);
            newArr[i].balance = addValue;
            let targetedID = document.getElementById(i + 1);
            targetedID.innerHTML = addValue;
            localStorage.setItem(i + 101, JSON.stringify(newArr[i]));
            alert ('Sucess: Sending successful!');
        }
    }
}