const express = require("express");
const app = express();
const PORT = 3000;
const pokedex = require("./models/pokemon.js");
const methodOverride = require("method-override");

// Static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

//INDEX
app.get("/pokemon", (req, res) => {
  res.render("index.ejs", { pokedex: pokedex });
});

//NEW
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});

//SHOW
app.get("/pokemon/:idx", (req, res) => {
  // get all types into one string
  let idxType = pokedex[req.params.idx].type.join(" ");

  res.render("show.ejs", {
    character: pokedex[req.params.idx],
    type: idxType,
    index: req.params.idx,
  });
});

// CREATE
app.post("/pokemon", (req, res) => {
  let arrTypes = [];
  arrTypes = String(req.body.type).split(" ");
  let obj = {
    name: req.body.name,
    img: req.body.img,
    type: arrTypes,
    stats: {
      hp: req.body.hp,
      attack: req.body.atack,
      defense: req.body.defense,
      spattack: req.body.spattack,
      spdefense: req.body.spdefense,
      speed: req.body.speed,
    },
  };
  pokedex.push(obj);
  res.redirect("/pokemon");
});

// EDIT
app.get("/pokemon/:idx/edit", (req, res) => {
  res.render("edit.ejs", {
    name: pokedex[req.params.idx].name,
    index: req.params.idx,
  });
});

//PUT
app.put("/pokemon/:idx", (req, res) => {
  let arrTypes = [];
  arrTypes = String(req.body.type).split(" ");
  let obj = {
    name: pokedex[req.params.idx].name,
    img: pokedex[req.params.idx].img,
    type: arrTypes,
    stats: {
      hp: req.body.hp,
      attack: req.body.atack,
      defense: req.body.defense,
      spattack: req.body.spattack,
      spdefense: req.body.spdefense,
      speed: req.body.speed,
    },
  };
  pokedex[req.params.idx] = obj;
  res.redirect("/pokemon");
});

app.listen(PORT, () => {});
