require("dotenv").config();
const { glob } = require("glob");
const { promisify } = require("util");
// const mongoose = require("mongoose");
const globPromise = promisify(glob);
const fs = require('fs');

module.exports = async (client) => {
  // Slash Commands
  const slashCommands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  const arrayOfSlashCommands = [];
  for (const file of slashCommands) {
    const command = require(`../commands/${file}`);
    arrayOfSlashCommands.push(command);
    client.commands.set(command.name, command);
  }
  // Events
  const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
      const event = require(`../events/${file}`);
      if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
      } else {
          client.on(event.name, (...args) => event.execute(...args));
      }
  }
  // Slash Commands Register
  client.on("ready", async () => {
    // Register for a single guild
    await client.guilds.cache.get("1112640311542435971").commands.set(arrayOfSlashCommands);

    // Register for all the guilds the bot is in
    // await client.application.commands.set(arrayOfSlashCommands);
  });

  // mongoose
  // const mongooseConnectionString = process.env.mongooseConnectionString;
  // if (!mongooseConnectionString) return;

  // mongoose.connect(mongooseConnectionString).then(() => console.log("Connected to mongodb"));
};