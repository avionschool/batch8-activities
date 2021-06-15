//LOGIN PAGE
// login and create account popup
let loginPopup = document.getElementById('loginPopup');
let createAccountPopup = document.getElementById('createAccountPopup');

document.getElementById('login').addEventListener('click', function () {
    loginPopup.classList.remove('hidden');
    createAccountPopup.classList.add('hidden');
});

document.getElementById('createAccount').addEventListener('click', function () {
    loginPopup.classList.add('hidden');
    createAccountPopup.classList.remove('hidden');
});

// function of link
let createAccountLink = document.getElementById('createAccountLink');
let loginLink = document.getElementById('loginLink');

document.getElementById('createAccountLink').addEventListener('click', function () {
    loginPopup.classList.add('hidden');
    createAccountPopup.classList.remove('hidden');
});

document.getElementById('loginLink').addEventListener('click', function () {
    loginPopup.classList.remove('hidden');
    createAccountPopup.classList.add('hidden');
});

// closing popups
let closeLoginPopup = document.getElementById('closeLoginPopup');
let closeCreateAccountPopup = document.getElementById('closeCreateAccountPopup');

document.getElementById('closeLoginPopup').addEventListener('click', function () {
    loginPopup.classList.add('hidden');
});

document.getElementById('closeCreateAccountPopup').addEventListener('click', function () {
    createAccountPopup.classList.add('hidden');
});

function exit() {
    storePopup.classList.add('hidden');
    cashDepositPopup.classList.add('hidden');
    storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorLocationPopup.classList.add('hidden');
};

//creating users
class User {
    constructor(tempUsername, tempEmail, tempPassword) {
        this.username = tempUsername;
        this.email = tempEmail;
        this.password = tempPassword;
        console.log(this.username, this.email, this.password);
    }
    storeData(){
        let userObj = {
            username: this.username,
            email: this.email,
            password: this.password
        };
        console.log(userObj);
        localStorage.setItem('users', JSON.stringify(userObj));
        alert ('Success');
    }
}

let newUsername = document.getElementById('newUsername').value;
let newEmail = document.getElementById('newEmail').value;
let newPassword = document.getElementById('newPassword').value;
let newUser = new User(newUsername, newEmail, newPassword);

let createButton = document.getElementById('createButton');
createButton.addEventListener('click', function () {
    newUser.storeData()
});