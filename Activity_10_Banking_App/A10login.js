//duplicate logging of object
function storeData() {
    let newUsername = document.getElementById('newUsername');
    let newPassword = document.getElementById('newPassword');
    let newEmail = document.getElementById('newEmail');
    let storedUsername = localStorage.getItem('username');
    let storedEmail = localStorage.getItem('email');
    let storedData = JSON.parse(localStorage.getItem('data'));

    // var usernameParse = JSON.parse(localStorage.getItem('username'));
    // var emailParse = JSON.parse(localStorage.getItem('email'));

    if (newUsername.value == storedUsername && newEmail.value == storedEmail) {
        alert ('Error: Username and email address have already used.');
    } else if (newUsername.value == storedUsername) {
        alert ('Error: Username has been already used. Please choose another one.');
    } else if (newEmail.value == storedEmail) {
        alert ('Error: Email has been already used. Please choose another one.') ;
    } else if (newUsername.value.length == 0 && newPassword.value.length == 0 || 
        newUsername.value.length == 0 && newEmail.value.length == 0 || 
        newPassword.value.length == 0 && newEmail.value.length == 0 || 
        newUsername.value.length == 0 && newPassword.value.length == 0 && newEmail.value.length == 0) {
        alert ('Error: Please fill out the details required!');
    } else if (newUsername.value.length == 0) {
        alert ('Error: Please type in your new username.');
    } else if (newPassword.value.length == 0) {
        alert ('Error: Please type in your new password.');
    } else if (newEmail.value.length == 0) {
        alert ('Error: Please type in your email address.');
    } else {
        if (storedData) {
            storedData.push({username: newUsername.value, password: newPassword.value, email: newEmail.value});
            localStorage.setItem('data', JSON.stringify(storedData));
        } else {
            localStorage.setItem('data', JSON.stringify([{username: newUsername.value, password: newPassword.value, email: newEmail.value}]));
        }
        // localStorage.setItem('username', newUsername.value);
        // localStorage.setItem('password', newPassword.value);
        // localStorage.setItem('email', newEmail.value);
        alert ('Success: Your account has been created!');
        loginForm.classList.remove('hidden');
        createAccountForm.classList.add('hidden');
    }
}

function checkData() {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    // let storedUsername = localStorage.getItem('username');
    // let storedPassword = localStorage.getItem('password');
    // let storedEmail = localStorage.getItem('email');
    let storedData = JSON.parse(localStorage.getItem('data'));

    if (username.value == 0 && password.value == 0) {
        alert ('Error: Input login details.');
    } else if (username.value == 0) {
        alert ('Error: Username required!');
    } else if (password.value == 0) {
        alert ('Error: password required!');
    } else if (storedData) {
        for (let i = 0; i < storedData.length; i++) {
            if (username.value == storedData[i].username && password.value == storedData[i].password || 
                username.value == storedData[i].email && password.value == storedData[i].password) {
                alert ('Success: Login completed!');
                return window.open('A10profile.html');
            }
        }
        alert ('Error: Username/Password did not match!');
    }
}

let loginForm = document.getElementById('loginForm');
let createAccountForm = document.getElementById('createAccountForm');

document.getElementById('linkCreateAccount').addEventListener('click', function(){
    loginForm.classList.add('hidden');
    createAccountForm.classList.remove('hidden');
})

document.getElementById('linkLogin').addEventListener('click', function(){
    loginForm.classList.remove('hidden');
    createAccountForm.classList.add('hidden');
})

// //Array database Login function
// let userList = [
//     {
//         username: "jan",
//         password: "123"
//     },
//     {
//         username: "mik",
//         password: "123"
//     }
// ]

// function login() {
//     let username = document.getElementById('username').value;
//     let password = document.getElementById('password').value;

//     for (i = 0; i < userList.length; i++) {
//         if (username == userList[i].username && password == userList[i].password) {
//             return alert ("Login Sucessful. Welcome " + username + "!");
//         } else if (username != userList[i].username) {
//             return alert ("Error: Username DOES NOT exist!");
//         } else (password != userList[i].password); {
//             return alert ("Error: WRONG password! Please try again.");
//         }
//     }
// }

// function registerUser() {
//     let newUsername = document.getElementById('newUsername').value;
//     let newPassword = document.getElementById('newPassword').value;
//     let newUser = {
//         username: newUsername,
//         password: newPassword
//     }

//     for(i= 0; i < userList.length; i++) {
//         if (newUsername == userList[i].username) {
//             return alert ("Error: " + newUsername + " has already been used!");
//         }
//     }
//     userList.push(newUser);
//     console.log(userList);
//     alert ("Creation of account successful!");
// }