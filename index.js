const express = require("express");
const app = express();
const port = 3000;
// create main route
app.get("/", (req, res) => res.send("Hello World!"));
// instantiate server
app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`),
);
const { Client, Collection } = require("discord.js");
const { QuickDB } = require("quick.db");

const client = new Client({ intents: 32767 });
module.exports = client;


client.db = new QuickDB()

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();

// Initializing the project
require("./handler")(client);
client.login(process.env.TOKEN);
