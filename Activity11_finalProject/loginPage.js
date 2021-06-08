//LOGIN PAGE
// login and create account popup
let loginPopup = document.getElementById('loginPopup');
let createAccountPopup = document.getElementById('createAccountPopup');

document.getElementById('login').addEventListener('click', function() {
    loginPopup.classList.remove('hidden');
    createAccountPopup.classList.add('hidden');
});

document.getElementById('createAccount').addEventListener('click', function() {
    loginPopup.classList.add('hidden');
    createAccountPopup.classList.remove('hidden');
});

// function of link
let createAccountLink = document.getElementById('createAccountLink');
let loginLink = document.getElementById('loginLink');

document.getElementById('createAccountLink').addEventListener('click', function() {
    loginPopup.classList.add('hidden');
    createAccountPopup.classList.remove('hidden');
});

document.getElementById('loginLink').addEventListener('click', function() {
    loginPopup.classList.remove('hidden');
    createAccountPopup.classList.add('hidden');
});

// closing popups
let closeLoginPopup = document.getElementById('closeLoginPopup');
let closeCreateAccountPopup = document.getElementById('closeCreateAccountPopup');

document.getElementById('closeLoginPopup').addEventListener('click', function() {
    loginPopup.classList.add('hidden');
});

document.getElementById('closeCreateAccountPopup').addEventListener('click', function() {
    createAccountPopup.classList.add('hidden');
});