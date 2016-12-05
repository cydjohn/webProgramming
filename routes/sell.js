/**
 * Created by Priyanka on 11/29/2016.
 */
const express = require('express');
const router = express.Router();
const data = require("../data");
const productData = data.products;
const userData = data.users;
const path = require('path');

router.get("/sellProduct", function (request, response) {
    console.log("Get Method for sell form.")
    /* get user that has corrently logged in , this.user.id --> pass this id to userData.getUserbyId()
    * get whole user object --> get the name of the user and populate it under user name / or update product object's
    * user field to user.id */
    response.render("product/sellForm",  {partial:"sell-scripts"});
});

router.post("/sellProduct", function (request, response) {
    console.log("Post Method for sell form.")
    //var duplicateUserCheck = false;
    //console.log(request.body);
    let userEmailID=request.body.email;
    console.log(userEmailID);
    //let UserID;//,currUser;

        userData.getUserByEmail(userEmailID).then((user)=>{
            console.log("inside here #########");
            console.log(user);
            console.log("logging recently received user id");
            console.log(user._id);
               // currUser=user;
               // UserID=user._id;
            //console.log(UserID);
                return user._id;
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
