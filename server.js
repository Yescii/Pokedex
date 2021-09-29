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
app.get("/index/:idx", (req, res) => {
  let idxType = pokedex[req.params.idx].type.join(" ");

  res.render("show.ejs", { character: pokedex[req.params.idx], type: idxType });
});

app.listen(PORT, () => {});
