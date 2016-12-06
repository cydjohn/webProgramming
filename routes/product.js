/**
 * Created by Priyanka on 11/29/2016.
 */
const data = require("../data");
const express = require('express');
const passport = require("passport");
const path = require('path');
const productData = data.products;
const router = express.Router();
const userData = data.users;


router.get("/:id", function (request, response) {
    console.log("Get Method for Product details Page.")
    /* call function getProduct using the user id here in product
    data object link to user data object and get the user details.
    pass these details to productInfo page
    */
    console.log(request.params.id);
    productData.getProductByID(request.params.id).then((product)=>{
        let UserID = product.user;
        console.log(UserID);
        let userInfo;
        userData.getUserByID(UserID).then((user)=>{
            userInfo=user;
            console.log("userInfo");
            console.log(userInfo);
        }).catch(() => {
         response.json({ error: true, message:"user not found"});
        });

        console.log(userInfo);
        console.log(product);

        response.render("product/productInfo", {partial:"userlogin-scripts", product: product, user: userInfo});
    }).catch(() => {
         response.json({ error: true, message:"Product not found"});
    }); 
});

router.get("/", function (request, response) {
    console.log("Users products");
    console.log(request.session.passport);
    if(request.session.passport && request.session.passport.user) {
        let userInfo;
        productData.getAllUserProducts(request.session.passport.user).then((userproducts)=>{
            userData.getUserByID(request.session.passport.user).then((user)=>{
                userInfo=user;
                response.render("product/myProducts", {partial:"userlogin-scripts", products: userproducts, user: userInfo});
            }).catch(() => {
                response.json({ error: true, message:"user not found"});
            });
            //console.log(userproducts);
            //response.json(userproducts);
            console.log(userInfo);
            console.log(userproducts);


        }).catch(() => {
            response.redirect("/");
            //response.json({ error: true, message:"User Products not found"});
        });
    }
    else {
        response.redirect("/login");
    }

});

module.exports = router;
