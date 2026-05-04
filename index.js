const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CNY", "KRW", "BRL", "MXN", "CHF", "SEK", "NZD", "SGD", "HKD"];

function populateSelect(select, selectedValue) {
  select.innerHTML = currencies
    .map(currency => `<option value="${currency}"${currency === selectedValue ? " selected" : ""}>${currency}</option>`)
    .join("");
}

populateSelect(fromCurrency, "USD");
populateSelect(toCurrency, "INR");

const currentTime = document.getElementById("current-time");

function updateCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    currentTime.innerText = `${hours}:${minutes}:${seconds}`;
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);

const popupOverlay = document.getElementById("popup-overlay");
const popupTitle = document.getElementById("popup-title");
const popupMessage = document.getElementById("popup-message");
const popupClose = document.getElementById("popup-close");

function showPopup(title, message) {
    popupTitle.innerText = title;
    popupMessage.innerText = message;
    popupOverlay.classList.remove("hidden");
}

function hidePopup() {
    popupOverlay.classList.add("hidden");
}

popupClose.addEventListener("click", hidePopup);
popupOverlay.addEventListener("click", event => {
    if (event.target === popupOverlay) hidePopup();
});

// Convert Function
async function convert() {
    let amount = document.getElementById("amount").value;
    let from = fromCurrency.value;
    let to = toCurrency.value;

    if (amount === "") {
        showPopup("Missing Amount", "Please enter an amount to convert.");
        return;
    }

    let url = `https://v6.exchangerate-api.com/v6/e857de844518aab8e581b30f/latest/${from}`;

    let response = await fetch(url);
    let data = await response.json();

    let rate = data.conversion_rates[to];
    let result = amount * rate;

    document.getElementById("result").innerText =
        `Result: ${result.toFixed(2)} ${to}`;
}
