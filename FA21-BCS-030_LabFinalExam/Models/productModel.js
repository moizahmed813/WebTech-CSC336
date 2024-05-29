const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    imageUrl: {
        type: String, 
        required: true
    },
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
    isFeatured:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);