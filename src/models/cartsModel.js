
const mongoose = require("mongoose")

const CartsCollection = "Carts"
const CartsSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: []
    }
})

const cartsModel = mongoose.model(CartsCollection, CartsSchema)

module.exports = cartsModel;