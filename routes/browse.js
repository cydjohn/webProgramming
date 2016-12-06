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
        productData.getAllProducts().then((allProducts)=>{
          console.log("Returned products:");
          console.log(allProducts);
          res.render("product/browseProducts", { partial: "browse-products-scripts", products: allProducts });
        }).catch(() => {
            res.redirect("/");
        });
    }
    else {
        res.redirect("/login");
    }
});

module.exports = router;
