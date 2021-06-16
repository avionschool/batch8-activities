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

let userTrackNum = 100;

//Creating users
class User {
    constructor(tempUsername, tempEmail, tempPassword) {
        this.username = tempUsername;
        this.email = tempEmail;
        this.password = tempPassword;
    }
    createUser() {
        let userObject = {
            username: this.username,
            email: this.email,
            password: this.password
        };

        if (this.username.length == 0 || this.email.length == 0 || this.password == 0) {
            console.log('Error caught: Input empty.');
            return alert ('Error: Please fill out the details required.');
        }

        let userList = JSON.parse(localStorage.getItem('users'));
        //if there's no data yet in localstorage, create an empty arr[]=userList and add the 'userObject' inside
        //if there is, just push the new 'userObject' inside the arr[]=userList
        if (!userList) {
            userList = [userObject];
        } else {
            userList.push(userObject);
        }
        console.log(userList);
        //always check if userList-arr[] is updated
        localStorage.setItem('users', JSON.stringify(userList));
    }
}

let createButton = document.getElementById('createButton');

createButton.addEventListener('click', function() {
    let newUsername = document.getElementById('newUsername').value;
    let newEmail = document.getElementById('newEmail').value;
    let newPassword = document.getElementById('newPassword').value;
    let newUser = new User(newUsername, newEmail, newPassword);
    
    newUser.createUser();
});




// let userList = JSON.parse(localStorage.getItem('userDetails')) || []; 

// let alreadyExist = userList.some(function(user) {
//     return user.username == userObject.username || user.email == userObject.email;
// });

// if (alreadyExist) {
//     return alert ("Username/Email already exists!");
// };

// userList.push(userObject);

// localStorage.setItem('userDetails', JSON.stringify(userList));
// console.log(userList);



            // target = userList.filter( ({username}) => username == this.username);

                // console.log('Error caught: Existing username.');
                // return alert ('Error: Username already existing.');
            //}













// //Creating Users
// class User {
//     constructor(tempUsername, tempEmail, tempPassword) {
//         this.username = tempUsername;
//         this.email = tempEmail;
//         this.password = tempPassword;
//     }
//     createUser() {
//         let userObject = {
//             username: this.username,
//             email: this.email,
//             password: this.password
//         };
//         let userList = JSON.parse(localStorage.getItem('users'));

//         //if there's no data yet in localstorage, create an empty arr[]=userList and add the 'userObject' inside
//         //if there is, just push the new 'userObject' inside the arr[]=userList
//         if (!userList) {
//             userList = [userObject];
//         } else {
//             userList.push(userObject);
//         }
//         console.log(userList);
//         //always check if userList-arr[] is updated
//         localStorage.setItem('users', JSON.stringify(userList));
//     }
// }

// let createButton = document.getElementById('createButton');

// createButton.addEventListener('click', function() {
//     let newUsername = document.getElementById('newUsername').value;
//     let newEmail = document.getElementById('newEmail').value;
//     let newPassword = document.getElementById('newPassword').value;
//     let newUser = new User(newUsername, newEmail, newPassword);
    
//     newUser.createUser();
// });