//Date
var dt = new Date();
document.getElementById("cdt").innerHTML = dt.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
//Date objects are created with the new Date() constructor
//The getElementById() method returns the element that has the ID attribute with the specified value
//'en-US' to change which language specific format to use
//Put second:'2-digit' to display seconds


//Greeting
document.getElementById("greetUser").innerHTML = greeting();

//console.log(greeting());

function greeting(){
    var urlString = window.location.search;
    //getting the url dynamically
    //console.log(urlString);

    var url = new URLSearchParams(urlString);
    //use this new variable to get the key and value

    var fname = url.get('fname');
    //console.log(fname);
  
    var lname = url.get('lname');
    //console.log(lname);
  
    var greet = "Hi " + fname + " " + lname + "!" + " How are you doing?";

    return greet;
}

//Main focus
function getValueMF(){
    var display = document.getElementById('userDisplay');
    var input = document.getElementById('userInput').value;
    //get the value of userMFinput
    display.innerHTML = input;
    //value of userMFdisplay is the same as userMFinput
}

//To do list
function getValueTDL(){
    var display2 = document.getElementById('userDisplay2');
    var input2 = document.getElementById('userInput2').value;
    //get the value of userMFinput
    display2.innerHTML = input2;
    //value of userMFdisplay is the same as userMFinput
}

