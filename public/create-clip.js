
const errorMessage = document.getElementById('error-message');
const errorMessageText = document.getElementById('error-message-text');

//set current url to show on success

function createClip() {
    const xhr = new XMLHttpRequest();
    const url = window.location.href;
    
    const content = document.getElementById('clip-content').value;
    const lifetime = document.getElementById('clip-lifetime').value;
    const data = JSON.stringify({content: content, lifetime: lifetime});

    //request settings
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    //result callback
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('clip-form').style.display = 'none';

        } else if (xhr.readyState === 4 && xhr.status === 400) {
            errorMessage.style.display = 'flex';
            errorMessageText.textContent = 'Invalid input';
        } else if (xhr.readyState === 4 && xhr.status === 409) {
            errorMessage.style.display = 'flex';
            errorMessageText.textContent = 'A clip with this ID already exists!';
        }
    }

    xhr.send(data);
}