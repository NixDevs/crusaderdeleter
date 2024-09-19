const client = require("../index");

client.on("error", (err) => {

  console.log(err);
});