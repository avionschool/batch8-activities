
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


// const date = new Date();
// const hrs = date.getHours();
// const mn = date.getMinutes();
// const local = date.toLocaleTimeString([], { timeStyle: "short" });
// document.getElementById("time").innerHTML = local;

// var t = setTimeout(function(){ currentTime() }, 1000);

  // function updateTime(k) {
  //   if (k < 10) {
  //     return "0" + k;
  //   }
  //   else {
  //     return k;
  //   }
  // }

  // currentTime();



  function greetings1(){
    var name = prompt ("Enter your Name here.");
    // var name = document.getElementById("greeting").style.visibility = "hidden";
    // var focus = document.getElementById("mainFocus").style.visibility = "hidden";

    // inputName.addEventListener("click", function(){
    //   name.style.visibility = "visible";
    //   focus.style.visibility = "visible";
    // })
    

    if(currentTime <= 12) {
      var greeting1 = "Good Evening, ";
    }
    else {
      var greeting1 ="Good Morning, ";
    }

    if (name != null) {
      document.getElementById("greeting").innerHTML = greeting1 + name + ".";
    }
  }

  greetings1();

  // todo list

  let addToDoButton = document.getElementById("addToDo");
  let toDoContainer = document.getElementById("toDoContainer");
  let inputField = document.getElementById("inputField");

  addToDoButton.addEventListener("click", function(){
    var paragraph = document.createElement("p");
    paragraph.classList.add("paragraph-styling");
    paragraph.innerText = inputField.value;
    toDoContainer.appendChild(paragraph);
    inputField.value = "";
    paragraph.addEventListener("click", function(){
      paragraph.style.textDecoration = "line-through";
    })
    paragraph.addEventListener("dblclick", function(){
      toDoContainer.removeChild(paragraph);
    })
  })

  const todoInput = document.getElementById("inputField");

  todoInput.addEventListener("keyup", function(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("addToDo").click();
    }
  })

// edit from here

var modal = document.getElementById("myModal")
var btn = document.getElementById("addToDo");

btn.onclick = function() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



