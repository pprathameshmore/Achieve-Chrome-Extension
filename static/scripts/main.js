window.onload = function () {
    init();
}

function init() {
    getTime();
    inputFocusText();
    setFocusText();
    editFocusText();
    unsplashGetPhotos();
    getQuotes();
}

//Global variables
var systemDate = new Date();
var hours = systemDate.getHours();
var minutes = systemDate.getMinutes();

var imageURL;

function unsplashGetPhotos() {
    
    $.getJSON("https://api.unsplash.com/photos/random?client_id=3ebe01369e49bd4796bdd7a4dc9d184e33817224260491c3ba8cd2066a75a5fe", function (data) {
        //console.log(data.urls);
        $.each(data.urls, function (index, value) {
            imageURL = data.urls.full;
            //ImgCache.cacheFile(imageURL);
            $("body").css("background-image", "url( " + imageURL + ")");
        });
    });
}


function setFocusText() {
    inputFocusText();
    var getFocusText = localStorage.getItem("focusToday");
    var p = document.createElement('p');
    var textNode = document.createTextNode(getFocusText);
    p.appendChild(textNode);
    var todoContainer = document.getElementById('todo-container');
    todoContainer.appendChild(p);
    var inputFocus = document.getElementById('input-focus');
    if (checkLocalStorageForFocus) {
        inputFocus.style.display = "none";
    } else {
        inputFocus.style.display = "block";
    }

}

function checkLocalStorageForFocus() {

    var isLocalStorageAvailable = false;

    if (localStorage.getItem("focusText") === null) {
        isLocalStorageAvailable = true;
    } else {
        isLocalStorageAvailable = false;
    }
    Boolean(isLocalStorageAvailable);
}

function getTime() {

    showGreetingMessage(hours);
    hours = hours % 12;

    if (hours == 0) {
        hours = 12;
    }

    _hours = checkTimeAddZero(hours);
    _minutes = checkTimeAddZero(minutes);

    document.getElementById('current-time').innerHTML = _hours + ":" + _minutes;
    var t = setTimeout(getTime, 500);


    var currentTime = hours + minutes
    return currentTime;
}

function ampm(hours) {

    var ampm;

    if (hours >= 12) {
        ampm = "PM";
    } else {
        ampm = "AM";
    }

    return ampm;
}


//Function add zero
function checkTimeAddZero(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}

function showGreetingMessage(hours) {

    var textNode = document.getElementById('greeting-message');

    if (hours >= 4 && hours <= 9) {
        textNode.innerText = "Good morning";
    }

    if (hours >= 12 && hours <= 16) {
        textNode.innerText = "Good aftenoon";
    }

    if (hours >= 17 && hours <= 21) {
        textNode.textContent = "Good evening";
    }

    if (hours >= 22 && hours <= 00) {
        textNode.textContent = "You can do it.";
    }
}

function inputFocusText() {
    var inputFocusText = document.getElementById('input-focus');
    inputFocusText.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            localStorage.setItem("focusToday", inputFocusText.value);
            document.getElementsByTagName("p").innerHTML = localStorage.getItem("focusToday");
            location.reload(true);
        }
    })
}

function editFocusText() {
    $('p').click(function () {
        document.getElementById("input-focus").style.display = "block";
        inputFocusText();
    })
}


function getQuotes() {
    var todayQuote;
        $.getJSON("https://api.quotable.io/random", function (a) {
            $("#quotes").append(a.content + "<p>" + a.author + "</p>")
            //localStorage.setItem("quote", a.content + "\n" + a.author);
        });
        
    }

