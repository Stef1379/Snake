const MAX_LENGTH = 30;

let submitButton = document.querySelector('.submit-button');
let validation = document.querySelector('.validation p');

let showLeaderboardButton = document.querySelector('.show-leaderboard-button');
showLeaderboardButton.addEventListener('click', () => {
    window.location = "leaderboard.html";
});

let usernameInput = document.querySelector('.username-container input');
usernameInput.addEventListener('keyup', () => validateUsernameInput());

submitButton.addEventListener('click', function(e) {
    let usernameInputValue = usernameInput.value;
    let isUsernameValid = validateUsernameInput(e);

    if (isUsernameValid) {
        receiveUsername(usernameInputValue).then(user => {
            if (!user) return;

            localStorage.setItem("username", user[0].username);
            window.location = "snake.html";
        });
    }
});

function validateUsernameInput(e) {
    let usernameInputValue = usernameInput.value;

    if ((e && !usernameInputValue) || usernameInputValue.length > MAX_LENGTH) {
        validation.style.visibility = 'visible';
        validation.innerHTML = setErrorMessage(usernameInputValue);
        return false;
    }
    validation.style.visibility = 'hidden';
    return true;
}

function setErrorMessage(usernameInputValue) {
    if (usernameInputValue && usernameInputValue.length > MAX_LENGTH) {
        return "Username may contain only 30 characters";
    } else {
        return "Please enter a valid username";
    }
}