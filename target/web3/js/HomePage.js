function displayTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    hours = formatTime(hours);
    minutes = formatTime(minutes);
    seconds = formatTime(seconds);

    var time = hours + ":" + minutes + ":" + seconds;
    document.getElementById("clock").textContent = time;
    setTimeout(displayTime, 1000);
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}