const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let apiCourses = [];


function newQuote() {
    loading();
    const quotes = apiCourses[Math.floor(Math.random() * apiCourses.length)];

    //check if author is unknown
    if (!quotes.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quotes.author;
    }

    //check if the length of the content > 120

    if (quotes.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quotes.text;
    complete();
}
async function getQuote() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiCourses = await response.json();
        newQuote();
    } catch (err) {
        //err
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote)

getQuote();