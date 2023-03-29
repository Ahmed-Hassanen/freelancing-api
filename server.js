const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log("connection done");
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
