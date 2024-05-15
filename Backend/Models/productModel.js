const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add product name"],
    },
    category:{
        type: String,
        required: [true, "Please add product cateory"],
    },
    price:{
        type: String,
        required: [true, "Please add product price"],
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);