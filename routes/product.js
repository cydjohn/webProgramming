/**
 * Created by Priyanka on 11/29/2016.
 */
const express = require('express');
const router = express.Router();
const data = require("../data");
const productData = data.products;
const userData = data.users;
const path = require('path');


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



module.exports = router;