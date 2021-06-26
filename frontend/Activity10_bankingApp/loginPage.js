//add and removing of forms using addEventLister and classes
let loginForm = document.getElementById('loginForm');
let createAccountForm = document.getElementById('createAccountForm');

document.getElementById('createAccountLink').addEventListener('click', function() {
    loginForm.classList.add('hidden');
    createAccountForm.classList.remove('hidden');
})
document.getElementById('loginLink').addEventListener('click', function() {
    loginForm.classList.remove('hidden');
    createAccountForm.classList.add('hidden');
})

//global variable
let userList = [
    {
        username: "admin",
        password: "admin",
        email: "admin@gmail.com"
    },
    {
        username: "jan",
        password: "jan",
        email: "jan@gmail.com"
    }
]

//working, but both can't find the second object
function checkData() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    for (let i = 0; i < userList.length; i++) {
        if (username.length == 0 || password.length == 0) {
            console.log('test 1');
            return alert ('Error: Please fill out the details required!');
        } else if (username != userList[i].username) {
            console.log ('test 2');
            return alert ('Error: Username/does not exist!');
        } else if (username == userList[i].username && password != userList[i].password) {
            console.log ('test 3');
            return alert ('Error: Wrong password! Please try again.');
        } else if (username == userList[i].username && password == userList[i].password) {
            console.log ('test 4');
            alert ('Success: You have logged in!');
            return window.location.replace('dashboardPage.html');
        }
    }
}

//working, but both can't find the second object
function storeData() {
    let newUsername = document.getElementById('newUsername').value;
    let newPassword = document.getElementById('newPassword').value;
    let newEmail = document.getElementById('newEmail').value;
    let loginForm = document.getElementById('loginForm');
    let createAccountForm = document.getElementById('createAccountForm');
    let newUser = {
        username: newUsername,
        password: newPassword,
        email: newEmail
    }

    for (let i = 0; i < userList.length; i++) {
        if (newUsername.length == 0 || newPassword.length == 0 || newEmail.length == 0) {
            console.log('test 1');
            return alert ('Error: Please fill out the details required!');
        } else if (newUsername == userList[i].username) {
            console.log('test 2');
            return alert ('Error: Username has already been used!');
        } else if (newEmail == userList[i].email) {
            console.log('test 3');
            return alert ('Error: Email has already been used!'); 
        }
            userList.push(newUser);
            console.log(userList);
            loginForm.classList.remove('hidden');
            createAccountForm.classList.add('hidden');
            return alert ('Success: Account created!');
    }
}