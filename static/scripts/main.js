window.onload = function () {
    init();
}

function init() {
    getTime();
    unsplashGetPhotos();
    inputFocusText();
    setFocusText();
    editFocusText();
    getQuotes();
}

function getQuotes() {
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&callback=", function (a) {
        $("#quotes").append(a[0].content + "<p>" + a[0].title + "</p>")
    });
}

function unsplashGetPhotos() {

    var imageURL;

    $.getJSON("https://api.unsplash.com/photos/random?client_id=3ebe01369e49bd4796bdd7a4dc9d184e33817224260491c3ba8cd2066a75a5fe", function (data) {
        //console.log(data.urls);
        $.each(data.urls, function (index, value) {
            imageURL = data.urls.regular;
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

    var systemDate = new Date();
    var hours = systemDate.getHours();
    var minutes = systemDate.getMinutes();

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
    } else {
        textNode.innerText = "Progress, Not perfection";
    }

    if (hours >= 12 && hours <= 16) {
        textNode.innerText = "Good aftenoon";
    } else {
        textNode.innerText = "Nothing will work unless you do";
    }

    if (hours >= 17 && hours <= 21) {
        textNode.textContent = "Good evening";
    } else {
        textNode.textContent = "Don't hate what you don't understand";
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
        }
    })
}

function editFocusText() {
    $('p').click(function () {
        document.getElementById("input-focus").style.display = "block";
        inputFocusText();
    })
}
