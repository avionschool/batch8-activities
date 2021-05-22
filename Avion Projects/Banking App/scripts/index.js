// ===========================================
// == IMPORTED FUNCTIONS AND CLASS CREATION ==
// ===========================================

let x = new User(undefined, 'admin', undefined, '1234', undefined, undefined, undefined, true);

let admin = {
    username: "admin",
    password: "1234",
    isAdmin: true};
clientList = [];
clientList.push(admin);

// ===================================
// ==         NAV BUTTONS           ==
// ===================================
const homeBtn = document.querySelector('.home');
const loginBtn = document.querySelector('.login');
const signupBtn = document.querySelector('.signup');

const homeContent = document.querySelector('.bank-slogan');
const loginContent = document.querySelector('.login-container');
const signupContent = document.querySelector('.signup-container');

homeBtn.addEventListener('click', function() {
    homeContent.classList.remove('hide');
    loginContent.classList.add('hide');
    signupContent.classList.add('hide');
})

loginBtn.addEventListener('click', function() {
    homeContent.classList.add('hide');
    loginContent.classList.remove('hide');
    signupContent.classList.add('hide');
})

signupBtn.addEventListener('click', function() {
    homeContent.classList.add('hide');
    loginContent.classList.add('hide');
    signupContent.classList.remove('hide');
})

// ===================================
// ==    LOGIN FUNCTIONALITY        ==
// ===================================
const loginSubmit = document.querySelector('#login-submit');
const loginUsername = document.querySelector('#login-username');
const loginPassword = document.querySelector('#login-password');
loginSubmit.addEventListener('click', function() {
    index = clientList.findIndex(function(item) {
        return item.username === loginUsername.value;
    })
    if (index === -1) {
        alert('User does not exist!');
        return;
    }
    
    if (clientList[index].password !== loginPassword.value) {
        alert('Incorrect password.');
        return;
    } else { // User and password matches so redirect to appropriate dashboard
        if (clientList[index].isAdmin) {
            window.location.href = "admin-dashboard.html"; 
        } else {
            window.location.href = "user-dashboard.html"; 
        }
    }
})

// ===================================
// ==    SIGN UP FUNCTIONALITY      ==
// ===================================
