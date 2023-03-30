const express = require("express");

const projectRouter = require("./routes/projectRouter");

const app = express();

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("hello from server");
});

app.use("/api/v1/projects", projectRouter);

module.exports = app;
