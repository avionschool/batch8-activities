var id, password, infoname, balance, typemoney, rank, joindate, country  = new Array();
var account = new Array();
var amount_history = new Array();
var transactions = new Array;
id= [1, 2];
password= [11,22];
infoname = ["John Doe","Jane Doe"];
balance = [0,0,0,0];
// typemoney =["Peso Savings","Peso Savings"];
// rank = ["Gold","Silver","Copper","New"];
joindate = ["22/03/2020","10/02/2018"];
// country = ["Viet Nam", "United State", "Singapore","canada"]
for (i = 0; i < id.length; i++){
	account[i] = parseInt(balance[i]);
}
var i = 0;
var success = -1;

// login page
function Login(){
	for (i = 0; i< id.length; i++){
		if ((document.getElementById("idname").value == id[i]) && (document.getElementById("pass").value == password[i])) {
            document.getElementById("loginaccount").style.display = 'none';
            document.getElementById("manageaccount").style.display = 'block';
            document.getElementById("content").style.display = 'block';
            document.getElementById("content2").style.display = 'block';
            document.getElementById("content3").style.display = 'block';
                alert("Success Login, Welcome " + infoname[i]);
        		success=i;
        		prjoindate=joindate[i];
        		prname=infoname[i];
				prbalance=account[i];
				// prtypemoney= typemoney[i];
				// prcountry = country[i];

	document.getElementById("joindate").innerHTML ="Member "+prjoindate;
	document.getElementById("infoname").innerHTML = prname;
	document.getElementById("infoname2").innerHTML = prname;
	document.getElementById("balance").innerHTML = prbalance;
	// document.getElementById("typemoney").innerHTML = prtypemoney;
	// document.getElementById("country").innerHTML =prcountry;
        }
	}
	if (success == -1) {
        alert("The username or password is incorrect, please try again.");
    }
}


function Deposit() {
	document.getElementById("errortick").style.display = 'none';
	document.getElementById("changepass").style.display = 'none';
	document.getElementById("changeimg").style.display = 'none';
	document.getElementById("no").style.display = 'block';
	document.getElementById("notick").style.display = 'block';
    var input_amount = document.getElementById("Depositinput").value;
    if (input_amount<0) {
    	document.getElementById("errortick").style.display = 'block';
    	document.getElementById("notick").style.display = 'none';
    }else{
	input_amount = parseInt(input_amount);
    account[success] += input_amount;
    prbalance=account[success];
    document.getElementById("balance").innerHTML = prbalance; 
    document.getElementById("notification") .innerHTML= "Success! ₱ "+input_amount+" has been credited on your account.";
	amount_history.push(document.getElementById("Depositinput").value);
	transactions.push("Deposit");
	for (i = 0; i < amount_history.length; i++) {
    document.getElementById("amt_history").innerHTML = amount_history;
    document.getElementById("acct_description").innerHTML = transactions;
	document.getElementById("Depositinput").value = '';
	 }
	}
}

function Withdrawal() {
	document.getElementById("changepass").style.display = 'none';
	document.getElementById("changeimg").style.display = 'none';
	document.getElementById("no").style.display = 'block';
	document.getElementById("notick").style.display = 'block';
	var input_amount = document.getElementById("Withdrawalinput").value;
	if (input_amount<0) {
		document.getElementById("errortick").style.display = 'block';
    	document.getElementById("notick").style.display = 'none';	
    } else if (input_amount != parseInt(input_amount)) {
    	 document.getElementById("notick").style.display = 'none';
    	 document.getElementById("errortick").style.display = 'block';
        document.getElementById("notification").innerHTML = "Error. You entered the wrong format. Please enter a number ";
    } else if (account[success] - parseInt(input_amount) >= 1) {
    	document.getElementById("errortick").style.display = 'none';
        account[success] -= parseInt(input_amount);
        document.getElementById("notification").innerHTML = "Success! Your account has been debited ₱ " + input_amount + ".";
        prbalance=account[success];
        document.getElementById("balance").innerHTML =prbalance;
		amount_history.push(document.getElementById("Withdrawalinput").value);
	  	transactions.push("Withdraw");
	 	for (i = 0; i < amount_history.length; i++) {
        document.getElementById("amt_history").innerHTML = amount_history;
        document.getElementById("acct_description").innerHTML = transactions;
		document.getElementById("Withdrawalinput").value = '';
		 }
    } else if (account[success] - parseInt(input_amount) < 0) {
    	document.getElementById("notick").style.display = 'none';
    	document.getElementById("errortick").style.display = 'block';
        document.getElementById("notification").innerHTML = "Transaction declined. Insufficient balance.";
    } else {
    	document.getElementById("notick").style.display = 'none';
    	document.getElementById("errortick").style.display = 'block';
        document.getElementById("notification").innerHTML = "Error. Your balance is ₱ " + account[success] + ".";
    }
}

function Logout() {
    document.getElementById("loginaccount").style.display = 'block';
    document.getElementById("formlogin").reset();
    document.getElementById("manageaccount").style.display = 'none';
            document.getElementById("content").style.display = 'none';
            document.getElementById("content2").style.display = 'none';
            document.getElementById("content3").style.display = 'none';
}
function Transfers(){
	document.getElementById("changepass").style.display = 'none';
	document.getElementById("changeimg").style.display = 'none';
	document.getElementById("no").style.display = 'block';
	document.getElementById("notick").style.display = 'block';
	var inputmoney = document.getElementById("moneynumber").value;
	inputmoney = parseInt(inputmoney);
	var input_acctNum = document.getElementById("accountnumber").value;
	var k=0;
	for (i = 0; i < id.length; i++){		
	if ((input_acctNum == id[i] && inputmoney>0 && account[success]-inputmoney>0)){
		k=1;
		account[success] -= inputmoney;
		prbalance=account[success];
		account[i] += inputmoney;
		document.getElementById("errortick").style.display = 'none';
		document.getElementById("balance").innerHTML = prbalance;
		document.getElementById("notification") .innerHTML= "Success! ₱ "+inputmoney+" has been sent.";
		amount_history.push(document.getElementById("moneynumber").value);
		transactions.push("Send Money");
	    for (i = 0; i < amount_history.length; i++) {
	    document.getElementById("amt_history").innerHTML = amount_history;
	    document.getElementById("acct_description").innerHTML = transactions;
	    document.getElementById("moneynumber").value = '';
		document.getElementById("accountnumber").value = '';
	   }
	} else{
		document.getElementById("errortick").style.display = 'block';
    	document.getElementById("notick").style.display = 'none';
	}

	}
}

function Change() {
	document.getElementById("changepass").style.display = 'block';
	document.getElementById("changeimg").style.display = 'block';
	document.getElementById("no").style.display = 'none';
	document.getElementById("notick").style.display = 'none';
    document.getElementById("errortick").style.display = 'none';
}
function Changepassword(){
	if (document.getElementById("passcurrent").value == password[success] && document.getElementById("passnew").value == document.getElementById("passnewrepeat").value) {
        password[success] = document.getElementById("passnew").value;
        document.getElementById("changepass").style.display = 'none';
	document.getElementById("changeimg").style.display = 'none';
	document.getElementById("no").style.display = 'block';
	document.getElementById("notick").style.display = 'block';
	document.getElementById("notification") .innerHTML= "Success. You password has been change";
    } else {
    	document.getElementById("changepass").style.display = 'none';
	document.getElementById("changeimg").style.display = 'none';
	document.getElementById("no").style.display = 'block';
	document.getElementById("notick").style.display = 'none';
	document.getElementById("errortick").style.display = 'block';
        document.getElementById("notification") .innerHTML= "Error. Password wrong ";
    }
}








