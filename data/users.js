/**
 * Created by sanketh on 11/26/2016.
 */
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');
const bcrypt = require("bcrypt-nodejs");


let exportedMethods = {
    getUserByID(id) {
        console.log(id);
        return users().then((usersCollection) => {
            return usersCollection.findOne({ _id: id }).then((user) => {
                if (!user) throw "User not found";
                return user;
            });
        });
    },
    getUserByEmail(email) {
        console.log(email);
        return users().then((usersCollection) => {
            return usersCollection.findOne({ email: email }).then((user) => {
                if (!user) throw "User not found";
                return user;
            });
        });
    },
    addUser(requestBody) {
        //console.log("addUser===============");
        //console.log(requestBody);
        return users().then((usersCollection) => {
            let newUser = {
                _id: uuid.v4(),
                email: requestBody.email,
                password: bcrypt.hashSync(requestBody.password),
                firstname: requestBody.firstname,
                lastname: requestBody.lastname,
                gender: requestBody.gender,
                phone: requestBody.userphone,
                address: requestBody.address,
                city: requestBody.city,
                state: requestBody.state,
                zipcode: requestBody.zipcode,
                imagePath: requestBody.image
            };
            return usersCollection.findOne({ email: requestBody.email }).then((user) => {
                if (user) throw "Email already exists.";
                //return user;
                else {
                    return usersCollection.insertOne(newUser).then((newUserInformation) => {
                        return newUserInformation.insertedId;
                    }).then((newId) => {
                        return this.getUserByID(newId);
                    });
                }
            });
        });
    },
    //This method is used in the passport authentication strategy. cb - callback
    getUserByEmailPassport(email, cb) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ email: email }).then((user) => {
                console.log("sadsjdks");
                if (!user) return cb(null, null);;
                return cb(null, user);;
            });
        });
    },
    //This method is used in the passport authentication deserializing. cb - callback
    getUserByIDPassport(id, cb) {
        console.log(id);
        return users().then((usersCollection) => {
            return usersCollection.findOne({ _id: id }).then((user) => {
                if (!user) cb(new Error('User ' + id + ' does not exist'));
                return cb(null, user);
            });
        });
    }
}

module.exports = exportedMethods;