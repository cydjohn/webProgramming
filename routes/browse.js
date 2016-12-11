const data = require("../data");
const express = require('express');
const passport = require("passport");
const path = require('path');
const productData = data.products;
const router = express.Router();


router.get("/", (req, res) => {
    console.log("Browsing products...");
    console.log(req.session.passport);
    if (req.session.passport && req.session.passport.user) {
        //productData.getAllProducts().then((allProducts)=>{ //This method gives currently logged in user's products in results.
        productData.getAllProductsOtherUsers(req.session.passport.user).then((allProducts)=>{
          console.log("Returned products:");
          console.log(allProducts);
          console.log(req.user);
          res.render("product/browseProducts", { partial: "browse-products-scripts", user: req.user, products: allProducts });

        }).catch(() => {
            res.redirect("/");
        });
    }
    else {
        res.redirect("/login");
    }
});

router.post("/search", (req, res) => {
    console.log("Browsing Search products...");
    //console.log(req);
    console.log(req.body.search);
    if (req.session.passport && req.session.passport.user) {

            productData.getProductsBasedOnSearch(req.body.search).then((searchResultProducts)=>{
                console.log("searchResultProducts:");
                console.log(searchResultProducts);
                console.log(!searchResultProducts);
                if(searchResultProducts.length == 0)
                    res.render("product/browseProducts", { partial: "browse-products-scripts", message: "No results found." ,ser: req.user});
                else
                    res.render("product/browseProducts", { partial: "browse-products-scripts", searchproducts: searchResultProducts,user: req.user });
            }).catch(() => {
                res.render("product/browseProducts", { partial: "browse-products-scripts", products: productList,user: req.user});
                //res.redirect("/");
            });
    }
    else {
        res.redirect("/login");
    }
});

module.exports = router;
