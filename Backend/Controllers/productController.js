const Product = require("../Models/productModel");
const asyncHandler = require("express-async-handler");

//@desc Get all products
//@route GET /api/products
//@access public

const getProducts = asyncHandler(async (req,res) =>{
    const products = await Product.find(); 
    res.status(200).json(products);
});

//@desc Add new product
//@route POST /api/products
//@access public

const addProduct = asyncHandler(async (req,res) =>{
    console.log("The request body is: ", req.body);
    const {name, category, price} = req.body;
    if(!name || !category || !price){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const product = await Product.create({
        name,
        category,
        price,
    });
    res.status(201).json(product);
});

//@desc Get product
//@route GET /api/products/:id
//@access public

const getProduct = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found!");
    }
    res.status(200).json(product);
});


//@desc Update product
//@route PUT /api/products/:id
//@access public

const updateProduct = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found!");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    );
    res.status(200).json(updatedProduct);
});

//@desc Delete product
//@route DELETE /api/products/:id
//@access public

const deleteProduct = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found!");
    }
    await Product.remove();
    res.status(200).json(product);
});

module.exports = {getProducts, addProduct, getProduct, updateProduct, deleteProduct}