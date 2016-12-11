
const bcrypt = require("bcrypt-nodejs");
const data = require("../data/");
const dbConnection = require("../config/mongoConnection");
const products = data.products;
const users = data.users;
const uuid = require('node-uuid');


dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;

    }).then((db) => {
        requestBody = {
          _id: uuid.v4(),
          email: "steven@stevens.edu",
          password: "Testing123",
          firstName: "Steven",
          lastName: "Yellow",
          gender: "Male",
          phoneNumber: "201-240-5678",
          address: "78 Turtle Street",
          city: "Turtleville",
          state: "NJ",
          zipCode: 11234,
          image: "public/images/defaultProfilePic.jpg",
          securityQuestion: 2,
          securityAnswer: "Vasel"
        }
        return users.addUser(requestBody);

    }).then((steven) => {
        requestBody = {
          _id: uuid.v4(),
          title: "Gold",
          description: "It's just gold.",
          condition: "Shiny",
          purchasedYear: "1776",
          image: "public/images/defaultProfilePic.jpg",
          status: "Unsold"
        }
        return products.addProduct(requestBody, steven["_id"]);

    }).then((goldProduct) => {
        requestBody = {
          _id: uuid.v4(),
          title: "Concordia",
          description: "Awesome game.",
          condition: "New",
          purchasedYear: "2013",
          image: "public/images/defaultProfilePic.jpg",
          status: "Unsold"
        }
        return products.addProduct(requestBody, goldProduct["user"]);

    }).then((concordiaProduct) => {
        requestBody = {
          _id: uuid.v4(),
          title: "Koala toy",
          description: "A round koala.",
          condition: "Slightly used",
          purchasedYear: "2016",
          image: "public/images/defaultProfilePic.jpg",
          status: "Unsold"
        }
        return products.addProduct(requestBody, concordiaProduct["user"]);

    }).then((koalaProduct) => {
        requestBody = {
          _id: uuid.v4(),
          email: "stefan@stevens.edu",
          password: "BoraBora",
          firstName: "Stefan",
          lastName: "Feld",
          gender: "Male",
          phoneNumber: "143-039-2939",
          address: "201 Castles of Burgundy",
          city: "Amerigo",
          state: "CA",
          zipCode: 57328,
          image: "public/images/defaultProfilePic.jpg",
          securityQuestion: 1,
          securityAnswer: "Gengenbach"
        }
        return users.addUser(requestBody);

    }).then((stefan) => {
        requestBody = {
          _id: uuid.v4(),
          title: "Rare jade panda",
          description: "It's a rare panda!!",
          condition: "Like new",
          purchasedYear: "2009",
          image: "public/images/defaultProfilePic.jpg",
          status: "Unsold"
        }
        return products.addProduct(requestBody, stefan["_id"]);

    }).then((jadePandaProduct) => {
        requestBody = {
          _id: uuid.v4(),
          title: "Wits and Wagers",
          description: "Betting game for all ages!",
          condition: "Like new",
          purchasedYear: "2008",
          image: "public/images/defaultProfilePic.jpg",
          status: "Unsold"
        }
        return products.addProduct(requestBody, jadePandaProduct["user"]);

    }).then((wagerToy) => {
        requestBody = {
          _id: uuid.v4(),
          title: "Galaxy Note 7",
          description: "This one doesn't explode, great condition!",
          condition: "Unexploded",
          purchasedYear: "2015",
          image: "public/images/defaultProfilePic.jpg",
          status: "Unsold"
        }
        return products.addProduct(requestBody, wagerToy["user"]);

    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
