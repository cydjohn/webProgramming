
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
          zipCode: 01234,
          imagePath: "public/images/defaultProfilePic.jpg"
        }
        return users.addUser(requestBody);
    }).then((steven) => {
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
          imagePath: "public/images/defaultProfilePic.jpg"
        }
        return users.addUser(requestBody);
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
