window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
};

receiveAllUsers();

let usersContainer = document.querySelector('.users-container');
let allUsersJsonString = localStorage.getItem("allUsers");
let allUsers = JSON.parse(allUsersJsonString);

bubbleSort(allUsers);

//allUsers.length
for(i = 0; i < 14; i++) {
    let username = allUsers[i].username;
    let score = allUsers[i].score;

    usersContainer.innerHTML += "<div class='user'><p class='username'>" + username + "</p><p class='score'>" + score + "</p></div>";
}

function bubbleSort(users) {
    for (var i = 0; i < users.length ; i++) {
        for(var j = 0 ; j < users.length - i - 1; j++){
            if (users[j].score < users[j + 1].score) {
                var temp = users[j];
                users[j] = users[j+1];
                users[j + 1] = temp;
            }
        }
    }
    return users;
}