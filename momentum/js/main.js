// variables 
var d = new Date();
var m = d.getMinutes();
var name_for_greeting = "";

// events that will be executed when page initially loads
function loadPage() {
  displayTime();
  // randomizes quotes every x milliseconds
  setInterval(randomizeQuote, 2000);
}

// randomizes quote values
function randomizeQuote() {
  let quoteArr = ["Yo", "Hi", "Hello"];
  function getRandInt(max) {
    return Math.floor(Math.random() * max)
  }

  document.getElementById("text-quotes").innerHTML =  quoteArr[getRandInt(quoteArr.length)];


}

// accepts focus input user
function focusInput(focusEnter) {
  if ( event.keyCode == 13 ) {
    document.getElementById("text-focus").style.display = "block";
    document.getElementById("text-focus").innerHTML = focusEnter.value;

    // hides element/s after focus has been inputted 
    document.getElementById("textbox-focus").style.display = "none";

    // displays element/s after focus has been inputted 
    document.getElementById("header-focus").innerHTML = "Today";
    document.getElementById("text-focus-remarks").style.display = "block";
    document.getElementById("text-focus-remarks").innerHTML = "Good job!";
  }
}

// accepts name input from user
function nameInput(nameEntered) {
  if ( event.keyCode == 13 ) {    
   name_for_greeting = nameEntered.value;

   updateGreeting();
   setTimeout(updateToMantra, 2000);
   displayElements();
   hideElements();
  }
}

// gets hours and minutes of current time
function displayTime() {
  document.getElementById("time").style.display = "block";

  var h = d.getHours();
  var amOrPm = "am";
  let new_m = "";

  //if minutes is less than 10 will display zero before the minute value
  if ( m < 10)  {    
    new_m = "0" + m;
  } else {
    new_m = m;
  }

  //returns AM if it's morning and PM if it's afternoon/evening & displays non 24-hr clock
  if ( h > 12 ) {
    h -= 12;
    amOrPm="pm";
  } 
  document.getElementById("time").innerHTML = h + ":" + new_m + amOrPm;
}

//changes greetings depending on the time of day
function updateGreeting() {
  displayTime();
  var h_2 = d.getHours();
  var greeting = "morning";

  if (h_2 >= 12 && h_2 <= 5 && m <= 59) {
    greeting = "afternoon";
  } else {
    greeting = "evening";
  }

  document.getElementById("greeting-mantra-holder").innerHTML = "Good " + greeting + ", "+ name_for_greeting + ".";
}

// updates content of greeting-mantra-holder to mantra
function updateToMantra() {
  document.getElementById("greeting-mantra-holder").innerHTML = "Sample mantra";
}

// displays hidden elements and gets called after inputting name
function displayElements() {
  document.getElementById("greeting-mantra-holder").style.display = "block";
  document.getElementById("header-focus").style.display = "block";
  document.getElementById("textbox-focus").style.display = "block";
}

// hides elements after inputting name
function hideElements() {
  document.getElementById("hello-greeting").style.display = "none";
  document.getElementById("textbox-name").style.display = "none";
}