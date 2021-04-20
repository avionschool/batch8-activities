// var today = new Date ();
// var time = today.getHours () + ":" + today.getMinutes ();
// document.getElementById("time").value = time;

function currentTime() {
    var date = new Date(); /* creating object of Date class */
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var midday;

    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);

    midday = (hour >= 12) ? "PM" : "AM";

    document.getElementById("time").innerHTML = hour + " : " + min + " : " + sec + midday; /* adding time to the div */
      var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */

    // if(hours < 12) {
    //   var greeting = "Good Morning" + name;
    // }
    // if (hours >= 12 && hours <= 18) {
    //   var greeting = "Good Afternoon" + name;
    // }
    // if (hours >= 18 && hours <= 24) {
    //   var greeting = "Good Evening" + name;
    // }

  }

  function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }

  currentTime(); /* calling currentTime() function to initiate the process */
