
const errorMessage = document.getElementById('error-message');
const errorMessageText = document.getElementById('error-message-text');
const currentUrl = window.location.href;

function createClip() {
    const xhr = new XMLHttpRequest();
    const content = document.getElementById('clip-content').value;
    const lifetime = document.getElementById('clip-lifetime').value;
    const data = JSON.stringify({content: content, lifetime: lifetime});

    //request settings
    xhr.open("POST", currentUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    //result callback
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) { //OK
            document.getElementById('clip-form').style.display = 'none';
            document.getElementById('clip-success').style.display = 'block';
            const qrcode = new QRCode(document.getElementById('clip-qrcode'), {
                text: currentUrl,
                width: 150,
                height: 150,
                colorDark : "#000000",
	            colorLight : "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        } else if (xhr.readyState === 4 && xhr.status === 400) { //Invalid input
            errorMessage.style.display = 'flex';
            errorMessageText.textContent = 'Invalid input';
        } else if (xhr.readyState === 4 && xhr.status === 409) { //Conflict
            errorMessage.style.display = 'flex';
            errorMessageText.textContent = 'A clip with this ID already exists!';
        }
    }

    xhr.send(data);
}