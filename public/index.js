
function random(length) {
    return Math.random().toString(16).substring(2, length);
}

const randomURL = window.location.href + random(14);
document.getElementById("url-example").textContent = randomURL;
document.getElementById("url-example").href = randomURL;
document.getElementById("current-host").textContent = window.location.host;