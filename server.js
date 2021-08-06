const express = require("express");
// const pg=require("pg")  //why?
const db = require("./db");
const morgan = require('morgan')
const app = express();


//middleware
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))

//initialize the server
const init = async () => {
  await db.syncAndSeed(); //put data into the database
  app.listen("3000", () => console.log("listening on port 3000"));
  // or
  // const port = process.env.PORT || 3000;
  // app.listen(port, () => console.log(`listening on port ${port}`));
};

init();

//get'/'
app.get("/", async (req, res, next) => {
  const people = await db.models.Person.findAll(); //note the "models."
  const places = await db.models.Place.findAll();
  const things = await db.models.Thing.findAll();
  const souvenirs = await db.models.Souvenir.findAll();

  const purchases = souvenirs.map(s=>{
    person:people.find())

  const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>Acme People, Places and Things</title>
          <style>
          *{text-align:center}
          </style>
        </head>
        <body>
          <h1>Acme People, Places and Things</h1>
          <ul>
          ${people.map((person) => `<li>${person.name}</li>`).join('')}
          </ul>
          <ul>
          ${places.map((place) => `<li>${place.name}</li>`).join('')}
          </ul>
          <ul>
          ${things.map((thing) => `<li>${thing.name}</li>`).join('')}
          </ul>
          <ul>
          ${purchases.map(purchase => `<li>${purchase.person} purchased a ${purchase.thing} in ${purchase.place}</li>`)}
          </ul>
        </body>
        </html>
        `;
  try {
    res.send(html);
  } catch (error) {
    next(error);
  }
});

