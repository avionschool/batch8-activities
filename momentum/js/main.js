// variables 
var d = new Date();
var m = d.getMinutes();
var name_for_greeting = "";
var greetingWillDisplay = true;

function search(name_inputted) {
  if (event.keyCode == 13) {    
   name_for_greeting = name_inputted.value;

   updateGreeting();
   setTimeout(updateToMantra, 2000);
   displayTime();
   displayElements();
   hideElements();
  }
}

// gets hours and minutes of current time
function displayTime() {
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

//displays hidden elements and gets called when Enter is pressed
function displayElements() {
  document.getElementById("greeting-mantra-holder").style.display = "block";
  document.getElementById("time").style.display = "block";
  document.getElementById("header-focus").style.display = "block";
  document.getElementById("textbox-focus").style.display = "block";
}

//hides elements after enter
function hideElements() {
  document.getElementById("hello-greeting").style.display = "none";
  document.getElementById("textbox-name").style.display = "none";
}