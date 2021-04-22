// Load functions on window start
window.onload = function() {
    displayTime();
    generateGreeting();
    generateRandomQuote();
}

// Time
const docTime = document.querySelector('.time');

function displayTime() {
    // display 24:00 time

    var time = new Date();
    var h = time.getHours();
    var m = time.getMinutes();
    m = checkTime(m);

    docTime.textContent = h + ":" + m;
    var t = setTimeout(displayTime, 1000);
}

function checkTime(i) {
    // add zero in front of numbers < 10

    if (i < 10) {i = "0" + i};
    return i;
  }

// Greeting
const docGreeting = document.querySelector('.greeting');

function generateGreeting() {
    var h = new Date().getHours();
    var greeting = "Hello";

    if (h < 12) {
        greeting = "Good Morning, ";
    } else if (h < 18) {
        greeting = "Good Afternoon, ";
    } else {
        greeting = "Good Evening, "
    }

    docGreeting.textContent = greeting;
}

// Name
const docIconName = document.querySelector('#icon-name');
const docName = document.querySelector(".name");

    // Focus on name field
    docIconName.addEventListener('click', () => {
        docName.focus();
    })

    // Prevent newline char on name field
    docName.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

// Focus Text

// Location

// Inspirational Quotes
var quotesList = [
    `“We cannot solve problems with the kind of thinking we employed when we came up with them.” — Albert Einstein`,
    `“Learn as if you will live forever, live like you will die tomorrow.” — Mahatma Gandhi`,
    `“When you give joy to other people, you get more joy in return. You should give a good thought to happiness that you can give out.” — Eleanor Roosevelt`,
    `“When you change your thoughts, remember to also change your world.” — Norman Vincent Peale`,
    `“It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest.” — Walter Anderson`,
    `“Nature has given us all the pieces required to achieve exceptional wellness and health, but has left it to us to put these pieces together.” — Diane McLaren`,
    `“Success is not final; failure is not fatal: It is the courage to continue that counts.” — Winston S. Churchill`,
    `“It is better to fail in originality than to succeed in imitation.” — Herman Melville`,
    `“The road to success and the road to failure are almost exactly the same.” — Colin R. Davis`,
    `“Success usually comes to those who are too busy looking for it.” — Henry David Thoreau`,
    `“Develop success from failures. Discouragement and failure are two of the surest stepping stones to success.” — Dale Carnegie`
];

    const docQuoteText = document.querySelector('#quotes-text');
    const docQuoteAuthor = document.querySelector('#quotes-author');

    function generateRandomQuote() {
        var i = Math.floor(Math.random()* (quotesList.length));
        var randomQuote = quotesList[i];

        // Extract Quote
        var index = randomQuote.indexOf(`”`) + 1;
        var quoteRawText = randomQuote.slice(0, index);
        var quoteRawAuthor = randomQuote.slice(index+1);

        // Append to HTML
        docQuoteText.textContent = quoteRawText;
        docQuoteAuthor.textContent = quoteRawAuthor;
    };

    // Next quote
    const docNextQuoteIcon = document.querySelector('#next-quote-icon');
    docNextQuoteIcon.addEventListener('click', generateRandomQuote);

    // Modal
    const docQuotesModal = document.querySelector('#quotes-modal');
    const docAddQuoteIcon = document.querySelector('#add-quote-icon');
    const docQuotesCancel = document.querySelector('#quote-cancel');

        // Open/Close Modal
        docAddQuoteIcon.onclick = () => {docQuotesModal.style.display = "block"};
        docQuotesCancel.onclick = () => {docQuotesModal.style.display = "none"};
        
        // Exits upon clicking outside modal content
        // window.addEventListener('click', (e) => {
        //     if (e.target == docQuotesModal) {
        //         docQuotesModal.style.display = "none";
        //     }
        // })

        // On Modal Submit: Add quote to DOM and Array
        const docQuotesSubmit = document.querySelector('#quote-submit');
        const modalTextArea = document.querySelector('#quote-text');
        const modalAuthor = document.querySelector('#quote-author');

        docQuotesSubmit.addEventListener('click', (e) => {
            var quote = `“` + modalTextArea.value + `”`;
            var author = "— " + modalAuthor.value;

            // Validate first and then add quote & author to Array and display in the HTML
            if (quote.length > 2 && author.length > 2) {
                var wholeQuote = quote + author;
                quotesList.push(wholeQuote);

                docQuoteText.textContent = quote;
                docQuoteAuthor.textContent = author;

                docQuotesModal.style.display = "none"; // exit window
            } else {
                return; // Do nothing
            }
        })

// To Do Container
// When user clicks on div, open the popup
const toDo = document.querySelector("#ToDo");
const popup = document.querySelector(".popup-menu-container");

toDo.addEventListener('click', () => {
    popup.classList.toggle("show");
});

// Add item on ToDo input submit
const toDoInput = document.querySelector('#toDo-input');
const toDoList = document.querySelector('.list-container');
toDoInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) { // Execute only on Enter
        addItem();
    }
});

// addItem functionality
function addItem() {
    var txt = toDoInput.value;
    txt = txt.replace(/(<([^>]+)>)/gi, ""); // strip tags
    toDoInput.value = "";

    const newItem = document.createElement('div');
    newItem.classList.add('item-wrapper');
    newItem.innerHTML = `
    <input type="checkbox" class="item-checkbox">
    <span class="item-title" contenteditable="true">`+ txt +`</span>
    <img class="item-remove-icon" title="Remove item" src="assets/feather icons/plus.svg">
    `
    toDoList.append(newItem);

    // Add remove functionality to 'x' icon
    var removeIcon = document.getElementsByClassName("item-remove-icon");
    var i;
    for (i = 0; i < removeIcon.length; i++) {
        removeIcon[i].onclick = function() {
        var div = this.parentElement;
        div.parentElement.removeChild(div);
        }
    }

    // Add strikethrough when to text when checkbox is checked
    var checkboxIcon = document.getElementsByClassName("item-checkbox");
    var j;
    for (j = 0; j < checkboxIcon.length; j++) {
        checkboxIcon[j].onclick = function() {
            var sib = this.nextElementSibling;
            sib.classList.toggle('checked');
        };
    }
};