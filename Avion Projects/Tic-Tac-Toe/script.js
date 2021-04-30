const gridContainer = document.querySelector('.grid-container');
const gridItems = [...gridContainer.querySelectorAll('div')]; // Array of the items

gridItems.forEach(function(item) {
    item.addEventListener('click', function(e) {
        this.textContent = "X";
        this.classList.toggle('hover')
    })
})

let grid = [
    ["","",""],
    ["","",""],
    ["","",""]
]
