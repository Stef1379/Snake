const MAX_LENGTH = 30;

let usernameInput = document.querySelector('.username-container input');
let submitButton = document.querySelector('.submit-button');
let validation = document.querySelector('.validation p');


usernameInput.addEventListener('keyup', function() {
    if(usernameInput.value.length > MAX_LENGTH) {
        validateUsernameInput(undefined, "Username may contain only 30 characters");
        showValidationMessage();
    } else if (usernameInput.value.length <= MAX_LENGTH) {
        hideValidationMessage();
    }
});

submitButton.addEventListener('click', function() {
    let username = usernameInput.value;
    let isUsernameValid = validateUsernameInput(username, "Please enter a valid username");

    if (isUsernameValid) {
        receiveUsername(username);

        localStorage.setItem("username", username);
        window.location = "snake.html";
    }
});

function validateUsernameInput(usernameInputValue, errorMessage) {
    if (!usernameInputValue || usernameInputValue.length > MAX_LENGTH) {
        showValidationMessage();
        validation.innerHTML = errorMessage;
        return false;
    }
    hideValidationMessage();
    return true;
}

function showValidationMessage() {
    validation.style.visibility = 'visible';
}

function hideValidationMessage() {
    validation.style.visibility = 'hidden';
}