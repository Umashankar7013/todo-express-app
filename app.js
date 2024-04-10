const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Tilicho");
});

const { router } = require("./src/routes/index");

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
