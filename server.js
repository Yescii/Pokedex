const express = require("express");
const app = express();
const PORT = 3000;
const pokedex = require("./models/pokemon.js");

// Static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

app.get("/index", (req, res) => {
  res.render("index.ejs", { pokedex: pokedex });
});

app.listen(PORT, () => {});
