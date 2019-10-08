// unsplash api key
const clientID = "?client_id=3ebe01369e49bd4796bdd7a4dc9d184e33817224260491c3ba8cd2066a75a5fe";

// DOM Elements
const changeBtn = document.querySelector("#change-btn");
const backgroundImgContainer = document.querySelector(".background-container");
const mainContainer = document.querySelector(".main-container");
const credit = document.querySelector("#credit");
const navigate = document.querySelector("#navigate");
const quotes = document.querySelector('#quotes');
const focusText = null;

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
        img.src = "https://pprathameshmore.github.io/data/background/background.jpg";
    } else {
        img.src = localStorage.getItem("url");
        credit.innerHTML = `<a target="_blank">${localStorage.getItem("name")}</a>`;
        navigate.innerHTML = `<a target="_blank"  style="color : white; font-size:130%;" href="${localStorage.getItem("link")}">See on Unsplash</a>`;
    }
}

function removeOldImage() {
    localStorage.removeItem("url");
}

function unsplashGetPhotos() {
    fetch(`https://api.unsplash.com/photos/random${clientID}`)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("url", data.urls.full);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("link", data.links.html);
        })
        .then(() => {
            fetchImage();
        })
        .catch((err) => {
            console.error(err);
        })
}

function setFocusText() {
    inputFocusText();
    var getFocusText = localStorage.getItem("focusToday");
    if (getFocusText != null) {
        var p = document.createElement("p");
        var textNode = document.createTextNode(getFocusText);
        p.appendChild(textNode);
        var todoContainer = document.getElementById("todo-container");
        todoContainer.appendChild(p);
        var inputFocus = document.getElementById("input-focus");
        if (checkLocalStorageForFocus) {
            inputFocus.style.display = "none";
        } else {
            inputFocus.style.display = "block";
            p.style.setProperty("style", "font-size: 150%");
        }
    } else {
        var default_text = "Click here to add";
        var p = document.createElement("p");
        var textNode = document.createTextNode(default_text);
        p.appendChild(textNode);
        var todoContainer = document.getElementById("todo-container");
        todoContainer.appendChild(p);
        var inputFocus = document.getElementById("input-focus");
        if (checkLocalStorageForFocus) {
            inputFocus.style.display = "none";
        } else {
            inputFocus.style.display = "block";
        }
    }
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
    var inputFocusText = document.getElementById("input-focus");
    inputFocusText.value = localStorage.getItem("focusToday");
    inputFocusText.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            localStorage.setItem("focusToday", inputFocusText.value);
            document.getElementsByTagName("p").innerHTML = localStorage.getItem(
                "focusToday"
            );
            window.location.reload(true);
        }
    });
}

function editFocusText() {
    $("p").click(function () {
        document.getElementById("input-focus").style.display = "block";
        inputFocusText();
        this.style.display = "none";
    });
}

function getQuotes() {
    $.getJSON("https://api.quotable.io/random", function (a) {
        $("#quotes").append(`<h4 style='font-size:150%'>${a.content}</h4><h5>${a.author}</h5>`)
    });
}

// event listeners and timers
changeBtn.addEventListener("click", () => {
    unsplashGetPhotos();
});

// initialize script
function init() {
    getTime();
    setFocusText();
    editFocusText();
    showGreetingMessage(new Date().getHours());
    getQuotes();
    fetchImage();
}

window.onload = function () {
    init();
};
