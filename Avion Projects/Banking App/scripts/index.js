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
loginSubmit.addEventListener('click', function() {
    window.location.href = "admin-dashboard.html"; 
})

// ===================================
// ==    SIGN UP FUNCTIONALITY      ==
// ===================================
