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
    console.log("Get Method for sell form.")
    /* get user that has corrently logged in , this.user.id --> pass this id to userData.getUserbyId()
    * get whole user object --> get the name of the user and populate it under user name / or update product object's
    * user field to user.id */
    console.log("session check in /sellProduct");
    console.log(request.session.passport)
    if(request.session.passport && request.session.passport.user)
        response.render("product/sellForm",  {partial:"sell-scripts"});
    else
        response.redirect("/");
});

router.post("/sellProduct", function (request, response) {
    console.log("Post Method for sell form.")
    //var duplicateUserCheck = false;
    //console.log(request.body);
    //let userEmailID=request.body.email;
    //console.log(userEmailID);
    //let UserID;//,currUser;

        userData.getUserByID(request.session.passport.user).then((user)=>{
            console.log("inside here #########");
            console.log(user);
            console.log("logging recently received user id");
            console.log(user._id);
            //passing the logged in user's id instead of the user retrieved from the email field on sell form.
            console.log(request.session.passport.user);
                //return user._id;
                return request.session.passport.user;
        }).then((userId)=>{
            productData.addProduct(request.body,userId)
            .then((product) => {
                console.log("New Product Added!");
                console.log(product);
                console.log("##");
                console.log(product.user);
                console.log(product._id);
                //response.redirect("/products/"+product._id);
                response.redirect("/products/"+product._id);
                //response.json({ success: true, message: product});
            }).catch((e) => {
                //console.log("*********");
                console.log(e);
                response.json({ error: true, message:"error while adding product."});
                //return;
            });
        }).catch((e)=>{
             response.json({ error: true, message:"outer error"});
        });


    //response.render("user/signupform",  {partial:"mainscreen-scripts"});
});


module.exports = router;
