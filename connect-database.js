const { Client } = require("cassandra-driver");

async function run() {
    const client = new Client({
      cloud: {
        secureConnectBundle: "./secure-connect-leaderboard.zip",
      },
      credentials: {
        username: "LsfrnZaWUvGhHLEkQYhSlQHi",
        password: "gkuZmd,d.K_-TxkJywHYlbM+I.c5ucyIekS0iJvn2IRNZpJUJcQXOiIpjYNA76gWRk-kj8rXsbJga1K,Sw5LZ.+Gglaw8E9L-euh7hB3yUzCpBy9mobKrwmZS-6A0-u-",
      },
    });
  
    await client.connect();
  
    // Execute a query
    const rs = await client.execute("SELECT * FROM system.local");
    console.log(`Your cluster returned ${rs.rowLength} row(s)`);
  
    await client.shutdown();
  }
  
  // Run the async function
  run();