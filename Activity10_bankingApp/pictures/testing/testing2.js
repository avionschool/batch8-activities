var name = [document.getElementById('uName')];
var pw = document.getElementById('uPw');

// storing input from register-form
// function store() {
//     localStorage.setItem('name', uName.value);
//     localStorage.setItem('pw', uPw.value);
// }
function store() {
    var usrName = document.getElementById('name').value;
    var usrPw = document.getElementById('pw').value;

    let stored_users = JSON.parse(localStorage.getItem('users'));
    if(stored_users) {
        stored_users.push({name: usrName, password: usrPw});
        localStorage.setItem('users', JSON.stringify(stored_users));
    } else {
        localStorage.setItem('users', JSON.stringify([{name: usrName, password: usrPw}]));
    }
}
// check if stored data from register-form is equal to entered data in the login-form

// function checks() {

//     // stored data from the register-form

//     var storedName = localStorage.getItem('name');
//     var storedPw = localStorage.getItem('pw');

//     // entered data from the login-form

//     var usrName = document.getElementById('userName').value;
//     var usrPw = document.getElementById('userPw').value;

//     // check if stored data from register-form is equal to data from login form

//     if (userName.value == storedName && userPw.value == storedPw) {
//         alert('You are logged in ' + usrName);
//         // window.location.href = "http://www.w3schools.com";
//         // window.location.replace("http://www.w3schools.com");
//         // location.replace("https://www.w3schools.com")
//         window.open('testing2.html');

//     } else {
//         alert('Access denied. Valid username and password is required.');
//     }

// }


function check() {


    var usrName = document.getElementById('userName').value;
    var usrPw = document.getElementById('userPw').value;


    let stored_users = JSON.parse(localStorage.getItem('users'))
    if(stored_users) {
        for (let u = 0; u < stored_users.length; u++){
            if (usrName == stored_users[u].name && usrPw == stored_users[u].password) {
                alert('You are logged in ' + usrName);
                return location.replace("./index.html");

             }
        }
    } else {
        localStorage.setItem('users', '[]');
    }

    return alert('Access denied. Valid username and password is required.');
}