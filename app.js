const express = require("express");

const projectRouter = require("./routes/projectRouter");
const offerRouter = require("./routes/offerRoute");

const app = express();

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("hello from server");
});

app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/offers", offerRouter);

module.exports = app;
