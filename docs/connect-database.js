const apiKey = "AstraCS:XAbwTSTgknYRoQPlIGskeNbp:716c0a53608a46bd7d7a1746cf5578cb8b6be793a8763d118694a9e7818f5c4c";

const baseApiURL = "https://4c35a1d6-8988-41c8-b237-c15b8015323f-europe-west1.apps.astra.datastax.com/api/rest/";
const receiveOrPostUsersURL = baseApiURL + "v1/keyspaces/Leaderboard/tables/scores/rows/";
const receiveUserFromUsernameURL = baseApiURL + "v2/keyspaces/Leaderboard/scores/";
const receiveAllUsersURL = baseApiURL + "v2/keyspaces/Leaderboard/scores/rows";

const receiveUser = async (username) => {
  const response = await fetch(receiveUserFromUsernameURL + username, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Cassandra-Token': apiKey
    }
  });
  const myJson = await response.json();

  //When the username is not in database, create a new username.
  if (myJson.data.length === 0) {
    createOrUpdateUser(username);
    return;
  }
  return myJson.data;
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
  return myJson.data;
}

const createOrUpdateUser = async (username, score, difficulty) => {
  if (!score) score = 0;
  if (!difficulty) difficulty = 0;
  
  const response = await fetch(receiveOrPostUsersURL, {
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
        },
        {
          "name": "difficulty",
          "value": difficulty
        }
      ]
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Cassandra-Token': apiKey
    }
  });
  return;
}