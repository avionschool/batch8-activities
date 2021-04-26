var d = new Date();
var h = d.getHours();
var m = d.getMinutes();

function loadPage() {
  displayTime();
  createElement();
}

function displayTime() {
  let new_m = "";
  
  h = ( h > 12 ) ? h -= 12 : h = 0;
  new_m = ( m < 10 ) ? new_m = "0" + m : new_m = m;

  let h1 = document.querySelector("h1");
  h1.style.display = "block";
  h1.textContent = h + ":" + new_m;
  
}

function createElement() {
  let 
}