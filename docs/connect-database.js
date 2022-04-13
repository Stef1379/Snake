const apiKey = "AstraCS:XAbwTSTgknYRoQPlIGskeNbp:716c0a53608a46bd7d7a1746cf5578cb8b6be793a8763d118694a9e7818f5c4c";

const baseApiURL = "https://4c35a1d6-8988-41c8-b237-c15b8015323f-europe-west1.apps.astra.datastax.com/api/rest/";
const receiveOrPostUsersURL = baseApiURL + "v1/keyspaces/Leaderboard/tables/scores/rows/";
const receiveUserFromUsernameURL = baseApiURL + "v2/keyspaces/Leaderboard/scores/";
const receiveAllUsersURL = baseApiURL + "v2/keyspaces/Leaderboard/scores/rows";

const receiveUsername = async (username) => {
  const response = await fetch(receiveUserFromUsernameURL + username, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Cassandra-Token': apiKey
    }
  });
  const myJson = await response.json();
  localStorage.setItem("username", username);

  //When the username is not in database, create a new username.
  if (myJson.data.length === 0) {
    createUser(username);
  }
}

const receiveAllUsers = async () => {
  const response = await fetch(receiveAllUsersURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Cassandra-Token': apiKey
    }
  });
  const myJson = await response.json();

  if (myJson.data.length > 0) {
    localStorage.setItem("allUsers", JSON.stringify(myJson.data));
  }
}

const createUser = async (username, score) => {
  if (!score) score = 0;
  
  await fetch(receiveOrPostUsersURL, {
    method: 'POST',
    body: JSON.stringify({
      "columns": [
        {
          "name": "username",
          "value": username
        },
        {
          "name": "score",
          "value": score
        }
      ]
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Cassandra-Token': apiKey
    }
  });
}