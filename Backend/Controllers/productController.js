//@desc Get all products
//@route GET /api/products
//@access public

const getProducts = (req,res) =>{
    res.status(200).json({message: "All products"});
}

//@desc Add new product
//@route POST /api/products
//@access public

const addProduct = (req,res) =>{
    console.log("The request body is: ", req.body);
    res.status(201).json({message: "Add products"});
}

//@desc Get product
//@route GET /api/products/:id
//@access public

const getProduct = (req,res) =>{
    res.status(200).json({message: `Get product for ${req.params.id}`});
}


//@desc Update product
//@route PUT /api/products/:id
//@access public

const updateProduct = (req,res) =>{
    res.status(200).json({message: `Update product for ${req.params.id}`});
}

//@desc Delete product
//@route DELETE /api/products/:id
//@access public

const deleteProduct = (req,res) =>{
    res.status(200).json({message: `Delete product for ${req.params.id}`});
}

module.exports = {getProducts, addProduct, getProduct, updateProduct, deleteProduct}