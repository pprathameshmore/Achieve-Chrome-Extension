window.onload = function () {
    init();
}

var clientID = "?client_id=3ebe01369e49bd4796bdd7a4dc9d184e33817224260491c3ba8cd2066a75a5fe";

function init() {
    getTime();
    setFocusText();
    editFocusText();
    showGreetingMessage(new Date().getHours());
    getQuotes();
    fetchImage();
}


$("#change-btn").on('click', function () {
    unsplashGetPhotos();
    //alert("Reload page");
});

function fetchImage() {
    var backgroundImg = new Image;
    $(".background-container").css("opacity",0)
    backgroundImg.onload = function() {
        $(".background-container").css("background-image", "url(" + this.src + ")");
        $(".background-container").css("opacity",1)
        $(".main-container").css("opacity",1)
    }

    if (localStorage.getItem("url") === null) {
        backgroundImg.src = "/static/images/background.jpg";
        $("#credit").html( '<h5 class="display-4">See on Unsplash</h5>');
    } else {
        backgroundImg.src = localStorage.getItem("url");
        $("#credit").html(localStorage.getItem("name"));
        $("#navigate").html('<a target="_blank"  style="color : white" href=' + 
            localStorage.getItem("link") + '>See on Unsplash</a>');
    }
}

function removeOldImage() {
    localStorage.removeItem("url");
}

function unsplashGetPhotos() {
    $.getJSON("https://api.unsplash.com/photos/random?client_id=3ebe01369e49bd4796bdd7a4dc9d184e33817224260491c3ba8cd2066a75a5fe", function (data) {
        //console.log(data.urls);
        $.each(data, function (index, value) {
            localStorage.setItem("url", data.urls.full);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("link", data.links.html);
        });
        fetchImage();
    });
}


function setFocusText() {
    inputFocusText();
    var getFocusText = localStorage.getItem("focusToday");
    if (getFocusText != null) {
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
    else {
        var default_text = 'Click here to add'
        var p = document.createElement('p');
        var textNode = document.createTextNode(default_text);
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
    var ampm;
    var systemDate = new Date();
    var hours = systemDate.getHours();
    var minutes = systemDate.getMinutes();
    ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    if (hours == 0) {
        hours = 12;
    }
    _hours = checkTimeAddZero(hours);
    _minutes = checkTimeAddZero(minutes);
    //Only update if time is changed, this will prevent unnecessary re-render
    var timeInDOM = document.getElementById('current-time').innerHTML;
    var timeString = _hours + ":" + _minutes;
    if(timeInDOM !== timeString) {
        document.getElementById('current-time').innerHTML = timeString;
    }
    setInterval(getTime, 1000);
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

    if(hours >= 0 && hours <=3){
        textNode.innerText = "Hello Ninja!";
    }

    if (hours >= 4 && hours <= 11) {
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
    inputFocusText.value = localStorage.getItem("focusToday");
    console.log(document.getElementsByTagName('p').innerText)
    inputFocusText.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            localStorage.setItem("focusToday", inputFocusText.value);
            document.getElementsByTagName("p").innerHTML = localStorage.getItem("focusToday");
            window.location.reload(true);
        }
    })
}

function editFocusText() {
    $('p').click(function () {
        document.getElementById("input-focus").style.display = "block";
        inputFocusText();
        this.style.display = "none";
    })
}


function getQuotes() {
    $.getJSON("https://api.quotable.io/random", function (a) {
        $("#quotes").append("<h4>" + a.content + "</h4>" + "<h5>- " + a.author + "</h5>")
        //localStorage.setItem("quote", a.content + "\n" + a.author);
    });
}

