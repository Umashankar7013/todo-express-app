const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const { router } = require("./src/routes/index");

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello Tilicho");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
