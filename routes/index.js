/**
 * Created by sanketh on 11/26/2016.
 * Modified by Priyanka on 11/29/2016 - Product flow
 */
const users = require("./users");
const product = require("./product");
const sell = require("./sell");
const data = require("../data");
const usersData = data.users;
const productsData = data.products;
const path = require('path');


const constructorMethod = (app) => {
    app.use("/", users);

    app.use("/products", product);

    app.use("/sell", sell);

    app.use("*", (req, res) => {
        let route = path.resolve(`static/errorPage.html`);
        res.status(404).sendFile(route);
    })
};

module.exports = constructorMethod;