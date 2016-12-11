const data = require("../data");
const express = require('express');
const passport = require("passport");
const path = require('path');
const productData = data.products;
const router = express.Router();


router.get("/", (req, res) => {
    if (req.session.passport && req.session.passport.user) {
        productData.getAllProductsOtherUsers(req.session.passport.user).then((allProducts)=>{
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
    if (req.session.passport && req.session.passport.user) {
        productData.getProductsBasedOnSearch(req.body.search).then((searchResultProducts)=>{
            if (searchResultProducts.length == 0)
                res.render("product/browseProducts", { partial: "browse-products-scripts", message: "No results found." ,user: req.user});
            else
                res.render("product/browseProducts", { partial: "browse-products-scripts", searchproducts: searchResultProducts,user: req.user });
        }).catch(() => {
            res.render("product/browseProducts", { partial: "browse-products-scripts", products: productList,user: req.user});
        });
    }
    else {
        res.redirect("/login");
    }
});

module.exports = router;
