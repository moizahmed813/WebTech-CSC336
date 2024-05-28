const express = require("express");
const Router = express.Router();
const {getProducts, addProduct, getProduct, updateProduct, deleteProduct} = require("../Controllers/productController");


Router.route("/").get(getProducts);

Router.route("/").post(addProduct);

Router.route("/:id").get(getProduct);

Router.route("/:id").put(updateProduct);

Router.route("/:id").delete(deleteProduct);

module.exports = Router;