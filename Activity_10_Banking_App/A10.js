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

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    for (i = 0; i < userList.length; i++) {
        if (username == userList[i].username && password == userList[i].password) {
            return alert ("Welcome " + username + "!");
        } else if (username != userList[i].username) {
            return alert ("username does not exist");
        } else (password != userList[i].password); {
            return alert ("wrong password");
        }
    }
}

//     for (i = 0; i < userList.length; i++) {
//         if (username == userList[i].username && password == userList[i].password) {
//             alert ("Welcome " + username + "!")
//             return
//         }
//     }
// }

//     for (i = 0; i < userList.length; i++) {
//         if (username != userList[i].username) {
//             alert ("username does not exist");
//         } else if (password != userList[i].password) {
//             alert ("wrong password");
//         } else (username == userList[i].username && password == userList[i].password) {
//             return alert ("Welcome " + username + "!");
//          }
//     }
// }

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
            return alert ("Error! " + newUsername + " has already been used");
        }
    }
    userList.push(newUser);
    console.log(userList);
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