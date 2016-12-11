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
    /* call function getProduct using the user id here in product
    data object link to user data object and get the user details.
    pass these details to productInfo page
    */
     if (request.session.passport && request.session.passport.user) {
    let currUserID=request.session.passport.user;
    productData.getProductByID(request.params.id).then((product)=>{
        let UserID = product.user;
        let userInfo;
        userData.getUserByID(UserID).then((user)=>{
            userInfo=user;
            let currUser=false;
            if (userInfo._id == currUserID){
                currUser=true;
            }
            response.render("product/productInfo", {partial:"product-scripts", product: product, productUser: userInfo, currUser: currUser, user: request.user});

        }).catch(() => {
         response.json({ error: true, message: "User not found" });
        });
    }).catch(() => {
         response.json({ error: true, message: "Product not found" });
   });
     }
      else {
        response.redirect("/login");
    }

});

router.get("/", function (request, response) {
    if (request.session.passport && request.session.passport.user) {
        let userInfo;
        productData.getAllUserProducts(request.session.passport.user).then((userproducts)=>{
            userData.getUserByID(request.session.passport.user).then((user)=>{
                userInfo=user;
                response.render("product/myProducts", {partial:"userlogin-scripts", products: userproducts, user: userInfo});
            }).catch(() => {
                response.json({ error: true, message:"user not found"});
            });
        }).catch(() => {
            response.redirect("/");
            //response.json({ error: true, message:"User Products not found"});
        });
    }
    else {
        response.redirect("/login");
    }

});

/*
* Route for updating product details
*/
router.post("/editProduct/edit", function (request, response) {
    let productId=request.body.updateProductID;
    if (request.session.passport && request.session.passport.user) {
        productData.getProductByID(productId).then((product)=>{
            response.render("product/updateProduct", {partial:"sell-scripts", product: product, user: request.user});
        }).catch((e)=>{
            console.log("Error while getting product:", e);
        });

     }
      else {
        response.redirect("/login");
    }

});

/*
* Route for updating product details
*/
router.post("/editProduct/", function (request, response) {
    if (request.session.passport && request.session.passport.user) {
        productData.updateProduct(request.body.productID,request.body).then((product)=>{
            //response.render("product/", {partial:"userlogin-scripts", product: product});
             response.redirect("/products");
        })

     }
      else {
        response.redirect("/login");
    }

});


/*
* Route for deleting product details
*/
router.get("/removeProduct/:id", function (request, response) {
    if (request.session.passport && request.session.passport.user) {
    productData.removeProduct(request.params.id).then(()=>{
         response.redirect("/products");      
    }).catch(() => {
         response.json({ error: true, message:"Product not found"});
    }); 
     }
      else {
        response.redirect("/login");
    }

});


module.exports = router;
