
function getTime() {

    var systemDate = new Date();
    var hours = systemDate.getHours();
    var minutes = systemDate.getMinutes();

    var ampm;
    if (hours >= 12) {
        ampm = "PM";
    } else {
        ampm = "AM";
    }

    hours = hours % 12;

    if (hours == 0) {
        hours = 12;
    }

    _hours = checkTimeAddZero(hours);
    _minutes = checkTimeAddZero(minutes);

    document.getElementById('current-time').innerHTML = _hours + ":" + _minutes + " "  + ampm;
    var t = setTimeout(getTime, 500);

    var currentTime = hours + minutes
    return currentTime;
}

function checkAMPM(hours) {
    

    return ampm;
}

//Function add zero
function checkTimeAddZero(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}

function showMessage(currentTime) {

}

