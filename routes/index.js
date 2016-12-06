/**
 * Created by sanketh on 11/26/2016.
 * Modified by Priyanka on 11/29/2016 - Product flow
 */
const browseRoutes = require("./browse");
const data = require("../data");
const path = require('path');
const productsData = data.products;
const productRoutes = require("./product");
const sellRoutes = require("./sell");
const users = require("./users");
const usersData = data.users;


const constructorMethod = (app) => {
    app.use("/", users);

    app.use("/browse", browseRoutes);
    app.use("/products", productRoutes);
    app.use("/sell", sellRoutes);

    app.use("*", (req, res) => {
        let route = path.resolve(`static/errorPage.html`);
        res.status(404).sendFile(route);
    })
};

module.exports = constructorMethod;
