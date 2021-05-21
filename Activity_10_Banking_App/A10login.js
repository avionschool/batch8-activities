//acts as your database storage array
let userList = [
    {
        username: "jan",
        password: "123"
    },
    {
        username: "mik",
        password: "123"
    }
]

//login function
function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    for (i = 0; i < userList.length; i++) {
        if (username == userList[i].username && password == userList[i].password) {
            return alert ("Login Sucessful. Welcome " + username + "!");
        } else if (username != userList[i].username) {
            return alert ("Error: Username DOES NOT exist!");
        } else (password != userList[i].password); {
            return alert ("Error: WRONG password! Please try again.");
        }
    }
}

//login function Wigs
// function login() {
//     let username = document.getElementById('username').value;
//     let password = document.getElementById('password').value;
//     let error = false;
//     let message;
//     for (i = 0; i < userList.length; i++) {
//         if (username == userList[i].username && password == userList[i].password) {
//             message = "Login Sucessful. Welcome " + username + "!";
//             error = false;
//             return true;
//         } else if (username != userList[i].username) {
//             message = "Error: Username DOES NOT exist!";
//             error = true;
//         } else (password != userList[i].password); {
//             message = "Error: WRONG password! Please try again.";
//             error = true;
//         }
//     }
//     alert (message);
//     if (error) {
//         // true na si error anywhere from line 23 -26
//         return false;
//     }
// }

//register function
function registerUser() {
    let newUsername = document.getElementById('newUsername').value;
    // let newEmail = document.getElementById('newEmail').value;
    let newPassword = document.getElementById('newPassword').value;
    let newUser = {
        username: newUsername,
        password: newPassword
    }

    for(i= 0; i < userList.length; i++) {
        if (newUsername == userList[i].username) {
            return alert ("Error: " + newUsername + " has already been used!");
        }
    }
    userList.push(newUser);
    console.log(userList);
    alert ("Creation of account successful!");
}

//switch hide class after account creation
let createAccountButton = document.getElementById('createAccountButton');

createAccountButton.addEventListener('click', function(){
loginForm.classList.remove('hidden');
createAccountForm.classList.add('hidden');
})

//switch hide class after clicking on href
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