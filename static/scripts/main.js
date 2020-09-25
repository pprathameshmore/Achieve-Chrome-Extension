// unsplash api key
const clientID =
  "?client_id=3ebe01369e49bd4796bdd7a4dc9d184e33817224260491c3ba8cd2066a75a5fe";

// DOM Elements
const changeBtn = document.querySelector("#change-btn");
const backgroundImgContainer = document.querySelector(".background-container");
const mainContainer = document.querySelector(".main-container");
const credit = document.querySelector("#credit");
const navigate = document.querySelector("#navigate");
const quotes = document.querySelector("#quotes");
const todoContainer = document.querySelector("#todo-container");
const focusInput = document.querySelector("#input-focus");
let focusText = null;
const defaultText = "Click Here To Add.";

// DOM defaults
focusInput.style.display = "none";

// functions
function fetchImage() {
  const img = new Image();
  backgroundImgContainer.style.opacity = 0;
  img.onload = function () {
    backgroundImgContainer.style.backgroundImage = `url(${this.src})`;
    backgroundImgContainer.style.opacity = 1;
    mainContainer.style.opacity = 1;
  };

  if (localStorage.getItem("url") === null) {
    img.src = "./static/images/background.jpg";
  } else {
    img.src = localStorage.getItem("url");
    credit.innerHTML = `<a target="_blank">${localStorage.getItem("name")}</a>`;
    navigate.innerHTML = `<a target="_blank"  style="color : white; font-size:130%;" href="${localStorage.getItem(
      "link"
    )}">See on Unsplash</a>`;
  }
}

function removeOldImage() {
  localStorage.removeItem("url");
}

function unsplashGetPhotos() {
  fetch(`https://api.unsplash.com/photos/random${clientID}`)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("url", data.urls.full);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("link", data.links.html);
    })
    .then(() => {
      fetchImage();
    })
    .catch((err) => {
      console.error(err);
    });
}

function checkLocalStorageForFocusText() {
  if (localStorage.getItem("focusText") === null) {
    setFocusText(defaultText);
  } else {
    focusText = localStorage.getItem("focusText");
    setFocusText(focusText);
  }
}

function setFocusText(str) {
  const focusLabel = document.createElement("p");
  const focusLabelText = document.createTextNode(str);
  focusLabel.appendChild(focusLabelText);
  focusLabel.addEventListener("click", () => {
    editFocusText();
  });

  todoContainer.appendChild(focusLabel);
}

function checkLocalStorageForFocus() {
  var isLocalStorageAvailable = false;
  if (localStorage.getItem("focusText") === null) {
    isLocalStorageAvailable = true;
  }
  return isLocalStorageAvailable;
}

function getTime() {
  var systemDate = new Date();
  var hours = systemDate.getHours();
  var minutes = systemDate.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  var twelve = hours % 12;
  hours = twelve == 0 ? 12 : twelve;
  _hours = checkTimeAddZero(hours);
  _minutes = checkTimeAddZero(minutes);
  //Only update if time is changed, this will prevent unnecessary re-render
  var timeInDOM = document.getElementById("current-time").innerHTML;
  var timeString = _hours + ":" + _minutes;
  if (timeInDOM !== timeString) {
    document.getElementById("current-time").innerHTML = timeString;
  }
}
// getTime() will be called in every 1 second of interval
setInterval(getTime, 1000);

//Function add zero
function checkTimeAddZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function showGreetingMessage(hours) {
  var textNode = document.getElementById("greeting-message");

  if (hours >= 0 && hours <= 3) {
    textNode.innerText = "Hello Ninja!";
  }

  if (hours >= 4 && hours <= 11) {
    textNode.innerText = "Good morning!";
  }

  if (hours >= 12 && hours <= 16) {
    textNode.innerText = "Good aftenoon!";
  }

  if (hours >= 17 && hours <= 21) {
    textNode.textContent = "Good evening!";
  }

  if (hours >= 22 && hours <= 0) {
    textNode.textContent = "You can do it!";
  }
}

function inputFocusText() {
  focusText !== null
    ? (focusInput.value = localStorage.getItem("focusText"))
    : null;
  focusInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      localStorage.setItem("focusText", focusInput.value);
      focusText = localStorage.getItem("focusText");
      window.location.reload(true);
    }
  });
}

function editFocusText() {
  event.currentTarget.style.display = "none";
  focusInput.style.display = "block";
  inputFocusText();
}

function getQuotes() {
  fetch("https://quote-garden.herokuapp.com/quotes/random")
    .then((res) => res.json())
    .then((data) => {
      quotes.innerHTML = `<h4 style='font-size:150%'>${data.quoteText}</h4><h5>${data.quoteAuthor}</h5>`;
    });
}

// event listeners and timers
changeBtn.addEventListener("click", () => {
  unsplashGetPhotos();
});

// initialize script
function init() {
  checkLocalStorageForFocusText();
  getTime();
  showGreetingMessage(new Date().getHours());
  getQuotes();
  fetchImage();
}

window.onload = function () {
  init();
};
