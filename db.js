const data = {
    people: ['moe', 'larry', 'lucy', 'ethyl'],
    places: ['paris', 'nyc', 'chicago', 'london'],
    things: ['foo', 'bar', 'bazz', 'quq']
  };

//const people = data.people.map(person => {name: person});
//const places = data.places.map(place => {name: place});
//const things = data.things.map(thing => {name: thing});  

//Database
const Sequelize = require("sequelize");
const {STRING, INTEGER} = Sequelize;  //specify the datatypes //destructing
const conn = new Sequelize(
  process.env.DATABASE_URL ||"postgres://localhost/souvenirs"
);


//models
const Person = conn.define("person", {   //model, like a Class for the rows
    name:{
        type:STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
})


const Place = conn.define("place", {   
    name:{
        type:STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
})

const Thing = conn.define("thing", {   
    name:{
        type:STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
})


const Souvenir = conn.define('souvenir', {
    personId:{
        type:INTEGER,
        allowNull:false,
        validate:{
          notEmpty:true
          }}, 
    placeId:{
        type:INTEGER,
        allowNull:false,
        validate:{
          notEmpty:true
          }}, 
    thingId:{
        type:INTEGER,
        allowNull:false,
        validate:{
          notEmpty:true
        }}
})

const souvenirs = [{personId:1, placeId:2, thingId:3},{personId:4, placeId:2, thingId:3} ]
//column name: personId, placeId, thingId

//Seed
const syncAndSeed = async() => {
 await conn.sync({force:true});
 await Promise.all(data.people.map(person=>
    Person.create({name:person})));   // Person is the constructor of the table 
    //.create is create a row, it needs to be an object with the column name 
 await Promise.all(data.places.map(place=>
    Place.create({name:place})));
 await Promise.all(data.things.map(thing=>
            Thing.create({name:thing})))  
 await Promise.all(souvenirs.map(souvenir=>Souvenir.create(souvenir))
 ) 
}

module.exports={syncAndSeed,
    models:{Person, Place, Thing, Souvenir}}
 