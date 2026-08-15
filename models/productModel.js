const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
    product: {
        type: String, 
        require: true
    },
    price: {
        type: Number, 
        require: true
    },
    quantity: {
        type: Number, 
        default: 0 
    },
    imageurl:{
        type: String,
        require: true
    }
}, 
    {timestamps: true}
);


const Product = mongoose.model("Product", productSchema);
module.exports = Product;