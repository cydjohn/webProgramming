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


router.get("/sellProduct", function (request, response) {
    /* get user that has corrently logged in , this.user.id --> pass this id to userData.getUserbyId()
    * get whole user object --> get the name of the user and populate it under user name / or update product object's
    * user field to user.id */
    if (request.session.passport && request.session.passport.user)
        response.render("product/sellForm",  {user: request.user,partial:"sell-scripts"});
    else
        response.redirect("/");
});

router.post("/sellProduct", function (request, response) {

    userData.getUserByID(request.session.passport.user).then((user)=>{
        return request.session.passport.user;
    }).then((userId)=>{
        productData.addProduct(request.body,userId)
        .then((product) => {
            response.redirect("/products/"+product._id);
        }).catch((e) => {
            console.log(e);
            response.json({ error: true, message: "Error while adding product."});
        });
    }).catch((e)=>{
         response.json({ error: true, message: "Error while getting user session"});
    });
});


module.exports = router;
