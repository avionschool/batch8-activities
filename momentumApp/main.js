
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

    if (hour > 12) {
      hour = hour - 12;
    }

    document.getElementById("time").innerHTML = hour + " : " + min + " " + midday; /* adding time to the div */
      var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */

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


  function greetings1(){
    var name = prompt ("Enter your Name here.");

    if(currentTime <= 12) {
      var greeting1 = "Good Morning ";
    }
    else {
      var greeting1 ="Good Evening ";
    }

    if (name != null) {
      document.getElementById("greeting").innerHTML = greeting1 + name + ".";
    }
  }

  greetings1();
