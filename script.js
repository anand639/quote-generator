"use strict";

// get quote from api

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show loading
// from w3 school loader css
function loading() {
	loader.hidden = false; //it will display first
	quoteContainer.hidden = true; //fist loader animation trigger then quote
}

//hide loading

function complete() {
	quoteContainer.hidden = false; // lodaing done quote show
	loader.hidden = true; //loader hide when load done
}

// show new quote
function newQuote() {
	loading();
	// pick a random quote from apiQuote
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

	//check if author name is blank and replace with anand
	if (!quote.author) {
		authorText.textContent = "Unknown";
	} else {
		authorText.textContent = quote.author;
	}
	// if quote is large length to determine the css styling for small text
	if (quote.text.length > 120) {
		quoteText.classList.add("long-quote");
	} else {
		quoteText.classList.remove("long-quote");
	}
	//set quote, hide loader

	quoteText.textContent = quote.text;
    complete();
}

// get quote from API
async function getQuote() {
	loading();
	const apiUrl = "https://type.fit/api/quotes";
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
		// apiQuotes is global variable
	} catch (error) {}
}
// twitter tweet quote
// go to https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, "_blank");
}
// Event listener

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// onLoad
getQuote();
