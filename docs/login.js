let usernameInput = document.querySelector('.username-container input')
let submitButton = document.querySelector('.submit-button');


submitButton.addEventListener('click', function() {
    let username = usernameInput.value;

    receiveUsername(username);

    localStorage.setItem("username", username);
    window.location = "index.html"
});