const body = document.querySelector("body");

function getImage(callbackFunc){
  fetch("https://source.unsplash.com/1600x900/?nature")
    .then(function(response) {
      callbackFunc(response);
    });
}

function init() {
  getImage(function(image){
    // add background container
    const container = document.createElement("div");
    body.appendChild(container);
    container.classList.add("bg-container");
  
    // add background image
    const img = document.createElement("img");
    container.appendChild(img);
    img.src = image.url;
    img.classList.add("bg-image");
  
    // add cover on background image
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("bg-cover");
  })
}

init();