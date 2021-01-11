var quote = {};
const loader = document.getElementsByClassName("loader");
const quoteContainer = document.getElementById("quote-container");
const newQuote = document.getElementById("new-quote");
const tweet = document.getElementById("tweet");

function showLoadingSpiner() {
  quoteContainer.classList.add("hide");
  loader[0].classList.remove("hide");
}

function hideLoadingSpiner() {
  loader[0].classList.add("hide");
  quoteContainer.classList.remove("hide");
}
async function getQuote() {
  const apiUrl = "https://api.quotable.io/random";
  try {
    const response = await fetch(apiUrl);
    quote = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function setQuote() {
  const quoteText = document.getElementById("quote-text");
  const quoteWriter = document.getElementById("quote-writer");

  showLoadingSpiner();

  await getQuote();
  if (quote.content.length > 120) quoteText.classList.add("long-quote");
  else if (quoteText.classList.contains("long-quote"))
    quoteText.classList.remove("long-quote");
  quoteText.innerText = quote.content;
  quoteWriter.innerText = quote.author || "Unknown";

  hideLoadingSpiner();
}

function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote.content} - ${quote.author}`;
  window.open(tweetUrl, "_blank");
}
// on Load

setQuote();

// set new quote

newQuote.addEventListener("click", setQuote);

// tweet quote

tweet.addEventListener("click", tweetQuote);
