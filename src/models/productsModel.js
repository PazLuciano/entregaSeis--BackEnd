
const mongoose = require("mongoose")

const ProductsCollection = "Products"

const ProductsSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true
    },
    code : {
        type : Number,
        required : true,
        unique : true 
    },
    stock : {
        type : Number,
        required : true
    },
    thumbanail : {
        type : String,
    }
})

const productsModel = mongoose.model(ProductsCollection, ProductsSchema)

module.exports = productsModel;