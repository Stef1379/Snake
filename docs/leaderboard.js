let currentPage = 1;
let recordsPerPage = 10;

let goBackButton = document.querySelector('.go-back');
goBackButton.addEventListener('click', function() {
    window.location = "index.html";
})

let usersContainer = document.querySelector('.users-container');
let previousButton = document.querySelector(".previous-button");
let nextButton = document.querySelector(".next-button");
let page_span = document.querySelector(".page-index");
previousButton.addEventListener('click', goToPreviousPage);
nextButton.addEventListener('click', goToNextPage);


let allUsers = undefined;
receiveAllUsers().then(users => {
    allUsers = users;
    checkIfUsersAvailable(users);
}).catch(() => {
    showErrorMessage("Something went wrong!");
});

function checkIfUsersAvailable(users) {
    if (!allUsers) return;

    if (users.length <= 0) {
        showErrorMessage("No users found");
    } else {
        bubbleSort(allUsers);
        changePage(1);
    }
}

function bubbleSort(users) {
    for (let i = 0; i < users.length ; i++) {
        for(let j = 0 ; j < users.length - i - 1; j++) {
            if (users[j].score < users[j + 1].score) {
                let temp = users[j];
                users[j] = users[j+1];
                users[j + 1] = temp;
            }

            if (users[j].difficulty < users[j + 1].difficulty && users[j].score === users[j + 1].score) {
                let temp = users[j];
                users[j] = users[j+1];
                users[j + 1] = temp;
            }
        }
    }
    return users;
}

function changePage(pageIndex) {
    //Validate page
    if (!pageIndex || pageIndex < 1) pageIndex = 1;
    if (pageIndex > amountOfPages()) pageIndex = amountOfPages();

    //Set table contents
    usersContainer.innerHTML = "";
    for (let i = (pageIndex - 1) * recordsPerPage; i < (pageIndex * recordsPerPage); i++) {
        if (!allUsers[i]) break;
        usersContainer.innerHTML += "<div class='user'><p class='username'>" + allUsers[i].username + 
                                    "</p><div class='difficulty-container'><p class='difficulty'>" + receiveDifficulty(allUsers[i].difficulty) +
                                    "</p><p class='score'>" + allUsers[i].score + "</p></div></div>";
        setPodiumColors(pageIndex, i);
    }

    //Set page number
    page_span.innerHTML = pageIndex;

    // Show or hide previous button and next button, pretending on the page index
    if (pageIndex == 1) {
        previousButton.style.visibility = "hidden";
    } else {
        previousButton.style.visibility = "visible";
    }

    if (pageIndex == amountOfPages()) {
        nextButton.style.visibility = "hidden";
    } else {
        nextButton.style.visibility = "visible";
    }
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

function goToNextPage() {
    if (currentPage < amountOfPages()) {
        currentPage++;
        changePage(currentPage);
    }
}

function amountOfPages() {
    return Math.ceil(allUsers.length / recordsPerPage);
}

function setPodiumColors(pageIndex, userIndex) {
    if (pageIndex === 1) {
        let users = document.querySelectorAll('.users-container .user');

        switch (userIndex) {
            case 0:
                users[userIndex].style.backgroundColor = "#DAA520";
                break;
            case 1:
                users[userIndex].style.backgroundColor = "#C0C0C0";
                break;
            case 2:
                users[userIndex].style.backgroundColor = "#CD7F32";
                break;
        }
    }
}

function receiveDifficulty(difficulty) {
    switch (difficulty) {
        case 0:
            return "Easy";
        case 1:
            return "Medium";
        case 2:
            return "Hard";
    }
}

function showErrorMessage(message) {
    usersContainer.innerHTML =  "<div class='error-message'><p>" + message + "</p></div>";
}