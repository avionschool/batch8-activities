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
});

// ===================================
// ==    SIGN UP FUNCTIONALITY      ==
// ===================================
const signupSubmit = document.querySelector('#sign-up-submit');
const signupUsername = document.querySelector('#uname');
const signupFname = document.querySelector('#fname');
const signupLname = document.querySelector('#lname');
const signupEmail = document.querySelector('#email');
const signupPassword = document.querySelector('#password');
const signupRePassword = document.querySelector('#re-password');
signupSubmit.addEventListener('click', function() {
    i = clientList.findIndex(function(item) {
        return item.username === signupUsername.value;
    })
    j = clientList.findIndex(function(item) {
        return item.email === signupEmail.value;
    })

    if (i !== -1) {
        alert('Username already in use. Please choose a different Username.');
    } else if (j !== -1) {
        alert('Email already in use. Please choose a different email address.');
    } else if (signupPassword.value !== signupRePassword.value) {
        alert('Passwords do not match!');
    } else {
        let newUser = new User(undefined, signupUsername.value, signupEmail.value,
            signupPassword.value, signupFname.value, signupLname.value, 0, false);
        clientList.unshift(newUser);
        updateJSONClientList();
        currentUser = JSON.stringify(newUser);
        localStorage.setItem("currentUser", currentUser);
        window.location.href = "user-dashboard.html"; // redirect
    }
});