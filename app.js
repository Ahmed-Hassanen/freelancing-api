const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("hello from server");
});

module.exports = app;
