
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
          phone: "+1 201-240-5678",
          address: "78 Turtle Street",
          city: "Turtleville",
          state: "NJ",
          zipCode: 11234,
          imagePath: "public/images/defaultProfilePic.jpg"
        }
        return users.addUser(requestBody);

    }).then((steven) => {
        requestBody = {
          _id: uuid.v4(),
          title: "Gold",
          description: "It's just gold.",
          condition: "Shiny",
          purchasedYear: "1776",
          productImage: "/public/images/defaultProfilePic.jpg",
          status: "Unsold"
        }
        return products.addProduct(requestBody, steven["_id"]);

    }).then((goldProduct) => {
        requestBody = {
          _id: uuid.v4(),
          email: "stefan@stevens.edu",
          password: "BoraBora",
          firstName: "Stefan",
          lastName: "Feld",
          gender: "Male",
          phone: "+1 143-039-2939",
          address: "201 Castles of Burgundy",
          city: "Amerigo",
          state: "CA",
          zipCode: 57328,
          imagePath: "/public/images/defaultProfilePic.jpg"
        }
        return users.addUser(requestBody);

    }).then((stefan) => {
        requestBody = {
          _id: uuid.v4(),
          title: "Rare jade panda",
          description: "It's a rare panda!!",
          condition: "Like new",
          purchasedYear: "2009",
          productImage: "/public/images/defaultProfilePic.jpg",
          status: "Unsold"
        }
        return products.addProduct(requestBody, stefan["_id"]);

    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
