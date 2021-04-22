var d = new Date();
var m = d.getMinutes();
var name_for_greeting = "";

function search(name_inputted) {
  if (event.keyCode == 13) {    
   name_for_greeting = name_inputted.value;

   displayTime();
   displayElements();
   hideElements();
   updateGreeting();
  }
}

// gets hours and minutes of current time
function displayTime() {
  var h = d.getHours();
  var amOrPm = "am";
  let new_m = "";

  //if minutes is less than 10 will display zero before the minute value
  // console.log(m);
  if ( m < 10)  {    
    new_m = "0" + m;

  }

  //returns AM if it's morning and PM if it's afternoon/evening & displays non 24-hr clocck
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

  // console.log(h_2);
  document.getElementById("greeting").innerHTML = "Good " + greeting + ", "+ name_for_greeting + ".";
}

//displays hidden elements and gets called when Enter is pressed
function displayElements() {
  document.getElementById("greeting").style.display = "block";
  document.getElementById("time").style.display = "block";
}

//hides elements after enter
function hideElements() {
  document.getElementById("hello-greeting").style.display = "none";
  document.getElementById("textbox-name").style.display = "none";
}