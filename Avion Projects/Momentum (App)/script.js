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

displayTime();


// Greeting

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

    // Extract Quote
    var randomQuote = generateRandomQuote();
    var index = randomQuote.indexOf(`”`) + 1;
    var quoteText = randomQuote.slice(0, index);
    var quoteAuthor = randomQuote.slice(index+1);

    // Append to HTML
    docQuoteText.textContent = quoteText;
    docQuoteAuthor.textContent = quoteAuthor;

    function generateRandomQuote() {
        var index = Math.floor(Math.random()* (quotesList.length));
        return quotesList[index];
    }

// To Do
