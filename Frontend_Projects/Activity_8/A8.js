//Greeting
document.getElementById("greetUser").innerHTML = greeting();
//console.log(greeting());

function greeting(){
    let urlString = window.location.search;
    //getting the url dynamically
    //console.log(urlString);

    let url = new URLSearchParams(urlString);
    //use this new variable to get the key and value

    //you are getting the "name" key in html
    let fname = url.get('fname');
    //console.log(fname);
    let lname = url.get('lname');
    //console.log(lname);

    let greet = "Good day " + fname + " " + lname + "!";
    return greet;
}

//Date
let dt = new Date();
document.getElementById("cdt").innerHTML = dt.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
//Date objects are created with the new Date() constructor
//The getElementById() method returns the element that has the ID attribute with the specified value
//'en-US' to change which language specific format to use
//Put second:'2-digit' to display seconds

//Main focus
function getMFvalue(){
    let newMFinput = document.getElementById('MFinput').value;
    let newMFdisplay = document.getElementById('MFdisplay');
    //get the value of userMFinput

    newMFdisplay.innerHTML = newMFinput;
    //value of newMFdisplay is the same as newMFinput
}

function resetMFvalue(){
    let newMFdisplay2 = document.getElementById('MFdisplay');
    newMFdisplay2.innerHTML = "Great work! You're Done!";
}

//To do list
let newTDLbuttonAdd = document.getElementById('TDLbuttonAdd');
//id of the TDL-add button
let newTDLdisplay = document.getElementById('TDLdisplay');
//id of where the list will be stored
let newTDLinput = document.getElementById('TDLinput');
//id of your TDL input field
let newTDLbuttonClear = document.getElementById('TDLbuttonClear');

newTDLbuttonAdd.addEventListener('click', function(){
//I took the id of the button & added an eventlistener telling it, when I 'click' it, run the function
    let newTDL = document.createElement('p')
//everytime I press the button(id="newTDLbutton"), it will add a 'p'
    newTDL.innerText = newTDLinput.value;
//use .innerText to add/change content to an element or tag
//newTDL is = to the value of newTDLinput
    newTDLdisplay.appendChild(newTDL);
//instructing to appendchild=add the element 'p' to the newTDLdisplay

newTDLbuttonClear.addEventListener('click', function(){
    newTDLdisplay.removeChild(newTDL);
})
//when you click clean, you remove all newTDL

newTDL.addEventListener('click',function(){
    newTDL.style.textDecoration = "line-through";
})
//added another eventlistener to do a line through upon click - study the format

newTDL.addEventListener('dblclick',function(){
    newTDLdisplay.removeChild(newTDL);
})
//removing the newTDL upon doubleclicking
})

//Quotes
let quoteList = [
    'HAPPINESS IS ...finally finishing an assignment. - Anonymous',
    'If you spend too much time thinking about it, you`ll never get it done. - Bruce Lee',
    'You don`t have to see the whole staircase. Just take the first step. - MLK, Jr.',
    'Just do it - Shia LeBeouf',
    'If you can`t stop thinking about it, don`t stop working on it. - Anonymous'];
//console.log(quoteList);

function randomizeQuotes(){
    let randomQuote = Math.floor(Math.random()*(quoteList.length));
//using math.floor(will be rouding the number up) math.random(producing a random number from 0-1) and multiplying it by 5 (number of your items)
//you will be producing an index number randomlly from 0-4
    document.getElementById('quoteDisplay').innerHTML = quoteList[randomQuote];
//put the random quotes from let=quotelist with the math solution of randomQuotes and display it in quoteDisplay
}

function pushQuote(){
    let newinputQuote = document.getElementById('inputQuote').value;
    let newquoteDisplay = document.getElementById('quoteDisplay');

    newquoteDisplay.innerHTML = newinputQuote;
}