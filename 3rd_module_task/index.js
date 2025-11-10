const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require(path.join(__dirname, "routes", "main.js")));


PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port = ${PORT}`);
});
