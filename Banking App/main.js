// initialize variables
var usersList;
var admin;

var newuserID = document.getElementById("userID");
var password = document.getElementById("password");
var loginBtn = document.getElementById("loginBtn");

// // check users list when creating new account
// function usersList() {
// 	// check browser support
// 	if (typeof(Storage) !== "undefined") {
// 		if (userID == JSON.parse(localStorage.getItem("usersList"))) {
// 			// get and check data
// 			usersList = JSON.parse(localStorage.getItem("usersList"));

// 		}
	
// 	}

// }
class newUser { 
        constructor (newfirstName, newlastName, newEmail, accountNumber, initialDeposit, accountHistory) {
    this.newfirstName    = newfirstName;
    this.newlastName     = newlastName;
    this.newEmail        = newEmail;
    this.accountNumber   = accountNumber;
    this.initialDeposit  = initialDeposit;
    this.accountHistory  = [];
    }
}

