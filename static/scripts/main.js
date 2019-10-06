window.onload = function() {
  init();
};

const clientID = '3ebe01369e49bd4796bdd7a4dc9d184e33817224260491c3ba8cd2066a75a5fe';
const changeBtn = document.getElementById('change-btn');

changeBtn.onclick = function() {
    getUnsplashPhoto();
}


function init() {
    getTime();
    setFocusText();
    editFocusText();
    showGreetingMessage(new Date().getHours());
    getQuotes();
    fetchImage();
    setInterval(getTime, 1000);
}

function fetchImage() {
    const mainContainer = document.querySelector('.main-container');
    const backgroundContainer = document.querySelector('.background-container');
    const credit = document.getElementById('credit');
    const navigate = document.getElementById('navigate');
    const backgroundImg = new Image;
    
    backgroundContainer.style.opacity = 0;
    backgroundImg.onload = function () {
        backgroundContainer.style.backgroundImage = `url(${this.src})`;
        backgroundContainer.style.opacity = 1;
        mainContainer.style.opacity = 1;
    }

    if (!localStorage.getItem('url')) {
        backgroundImg.src = '/static/images/background.jpg';
    } else {
        backgroundImg.src = localStorage.getItem('url');
        credit.innerHTML = localStorage.getItem('name');
        navigate.innerHTML = `<a target="_blank" style="color : white; font-size:130%;" href="${localStorage.getItem('link')}">See on Unsplash</a>`;
    }
}

function getUnsplashPhoto() {
    $.getJSON(`https://api.unsplash.com/photos/random?client_id=${clientID}`, function (data) {
        localStorage.setItem('url', data.urls.full);
        localStorage.setItem('name', data.user.name);
        localStorage.setItem('link', data.links.html);
        fetchImage();
    });
}

function setFocusText() {
    inputFocusText();
    const p = document.createElement('p');
    const todoContainer = document.getElementById('todo-container');
    const inputFocus = document.getElementById('input-focus');
    p.id = 'focus-text';

    const getFocusText = localStorage.getItem('focusToday');

    if (getFocusText) {
        const textNode = document.createTextNode(getFocusText);
        p.appendChild(textNode);
    } else {
        const default_text = 'Click here to add'
        const textNode = document.createTextNode(default_text);
        p.appendChild(textNode);
    }
    todoContainer.appendChild(p);
}

function getTime() {
    const systemDate = new Date();
    let hours = systemDate.getHours();
    let minutes = systemDate.getMinutes();
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    const _hours = checkTimeAddZero(hours);
    const _minutes = checkTimeAddZero(minutes);
    //Only update if time is changed, this will prevent unnecessary re-render
    const timeInDOMElement = document.getElementById('current-time');
    const timeInDOM = timeInDOMElement.innerHTML;
    const timeString = `${_hours}:${_minutes}`;
    if (timeInDOM !== timeString) {
        timeInDOMElement.innerHTML = timeString;
    }
}
// getTime() will be called in every 1 second of interval
setInterval(getTime, 1000);

//Function add zero
function checkTimeAddZero(i) {
    if (i < 10) {
        i = `0${i}`;
    }
    return i;
}

function showGreetingMessage(hours) {
  var textNode = document.getElementById("greeting-message");
    const textNode = document.getElementById('greeting-message');

    if (hours >= 0 && hours <= 3) {
        textNode.innerText = 'Hello Ninja!';
    }

    if (hours >= 4 && hours <= 11) {
        textNode.innerText = 'Good morning';
    }

    if (hours >= 12 && hours <= 16) {
        textNode.innerText = 'Good aftenoon';
    }

    if (hours >= 17 && hours <= 21) {
        textNode.textContent = 'Good evening';
    }

    if (hours >= 22 && hours <= 00) {
        textNode.textContent = 'You can do it.';
    }
}

function inputFocusText() {
    const inputFocusText = document.getElementById('input-focus');
    inputFocusText.value = localStorage.getItem('focusToday');
    inputFocusText.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            localStorage.setItem('focusToday', this.value);
            window.location.reload(true);
        }
    });
}

function editFocusText() {
    const focusText = document.getElementById('focus-text');
    const inputFocus = document.getElementById('input-focus');
    focusText.onclick = function() {
        inputFocus.style.display = 'block';
        inputFocus.focus();
        inputFocus.select();
        this.style.display = 'none';
    }
}

function getQuotes() {
    const quotes = document.getElementById('quotes');
    const quoteContent = document.createElement('h4');
    const quoteAuthor = document.createElement('h5');

    quoteContent.style.fontSize = '150%';

    $.getJSON('https://api.quotable.io/random', function (data) {
        quoteContent.textContent = data.content;
        quoteAuthor.textContent = data.author;
        quotes.appendChild(quoteContent);
        quotes.appendChild(quoteAuthor);
    });
}
