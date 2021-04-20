function search(name_inputted) {
  if (event.keyCode == 13) {
    document.getElementById("greeting").style.display = "block";
    document.getElementById("greeting").innerHTML = "Hello, " + name_inputted.value;
  }
}