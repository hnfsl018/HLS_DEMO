const express = require("express");
const app = express();
const PORT = 3000;
const indexRoute = require("./router/index");

app.use("/vod", indexRoute);

app.listen(3000, () => {
  console.log("server is running on port :: " + PORT);
});
