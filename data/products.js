/**
 * Created by Priyanka on 11/29/2016.
 */
const mongoCollections = require("../config/mongoCollections");
const products = mongoCollections.products;
const uuid = require('node-uuid');
const data = require("../data");
const userData = data.users;

let exportedMethods = {
    getProductByID(id) {
        console.log("inside getProductByID");
        return products().then((productsCollection) => {
                return productsCollection.findOne({ _id: id }).then((product) => {
                    if (!product) throw "Product  not found";
        return product;
    });
    });
    },
    getProductByUser(user) {
        return products().then((productsCollection) => {
                return productsCollection.findOne({ user: user }).then((product) => {
                    if (!product) throw "Product not found";
        return product;
    });
    });
    },
    getUserOfProduct(id) {
        console.log(id);
        return products().then((productsCollection) => {
                return productsCollection.findOne({ _id: id },{ user:1 }).then((productUser) => {
                    if (!productUser) throw "Product user not found";
        return productUser;
    });
    });
    },
    getAllProducts() {
        return products().then((productsCollection) => {
                return productsCollection.find({},{title:1}).toArray().then((allProducts)=>{
                    if (!allProducts) Promise.reject("Recipes not found");
        return allProducts;
    });

    });
    },

    addProduct(requestBody,UserID) {
        console.log("addProduct===============");
        console.log(UserID);
        console.log(requestBody);

        return products().then((productsCollection) => {
            console.log("***********");
                let newProduct = {
                    _id: uuid.v4(),
                    user:UserID,
                    title: requestBody.title,
                    description: requestBody.description,
                    condition: requestBody.condition,
                    purchasedYear: requestBody.purchasedYear,
                    productImage: requestBody.productImage,
                    status: requestBody.status
                };
        console.log("newly created product");
        console.log(newProduct);
        return productsCollection.insertOne(newProduct).then((newProductInformation) => {
                return newProductInformation.insertedId;
    }).then((newId) => {
            console.log("new product ID");
        console.log(newId);
        return this.getProductByID(newId);
    });
    }).catch((e) => {
            console.log("Adding product exception", e);
        });
    },
    removeProduct(id) {
        return products().then((productsCollection) => {
                return productsCollection.removeOne({ _id: id }).then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
            (`Could not delete product with id of ${id}`)
        }
    }).catch((err)=>{
            console.log(err);
    });
    });
    },
    updateProduct(id, updatedProduct) {
        if (!id || !updatedProduct || id == undefined || updatedProduct == undefined)
        {
            return Promise.reject("Please valid input for your product.\n");
        }

        return products().then((productsCollection) => {
                let updatedProdcutData = {};


        if (updatedProduct.title) {
            updatedProdcutData.title = updatedProduct.title;
        }

        if (updatedProduct.user) {
            updatedProdcutData.user = updatedProduct.user;
        }


        if (updatedProduct.description) {
            updatedProdcutData.description = updatedProduct.description;
        }

        if (updatedProduct.condition) {
            updatedProdcutData.condition = updatedProduct.condition;
        }

        if (updatedProduct.purchasedYear) {
            updatedProdcutData.purchasedYear = updatedProduct.purchasedYear;
        }

        if (updatedProduct.productImage) {
            updatedProdcutData.productImage = updatedProduct.productImage;
        }

        if (updatedProduct.status) {
            updatedProdcutData.status = updatedProduct.status;
        }

        let updateCommand = {
            $set: updatedProdcutData
        };

        return productsCollection.updateOne({ _id: id }, updateCommand).then(() => {
                return this.getProductByID(id);
    }).catch((err)=>{
            console.log(err);
    });
    });
    }

}

module.exports = exportedMethods;