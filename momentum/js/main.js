function search(name_inputted) {
  if (event.keyCode == 13) {
    // displays hidden elements
    document.getElementById("greeting").style.display = "block";
    
    document.getElementById("greeting").innerHTML = "Hello, " + name_inputted.value + ".";

    // hides hello greeting & name textbox 
    document.getElementById("hello-greeting").style.display = "none";
    document.getElementById("textbox-name").style.display = "none";

   displayTime();
  }
}

// gets hours and minutes of current time
function displayTime() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var amOrPm = "am";

  //if minutes is less than 10 will display zero before the minute value
  if ( m < 10)  {
    m = "0" + m;
  }

  //returns AM if it's morning and PM if it's afternoon/evening & displays non 24-hr clocck
  if ( h > 12 ) {
    h -= 12;
    amOrPm="pm";
  }

  document.getElementById("time").style.display = "block";
  document.getElementById("time").innerHTML = h + ":" + m + amOrPm;
}
