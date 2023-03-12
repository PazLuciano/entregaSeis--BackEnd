const { log } = require("console");
const productsModel = require("../models/productsModel")


class ProductManager {
    insertion () {

    }


    async getProducts() {
        try {
            const productsAll = await productsModel.find({})
            // console.log(productsAll);
            return productsAll
        } catch (error) {
            console.log(error);
        }
    }
    async getProdoductById(id){
        try {
            const product = await productsModel.find({_id : id})       
            // console.log("product --> ", product);    
            return product
        } catch (error) {
            // console.log("error --> ", error.message);
        }
    }
    async createProduct (product) {
        // viene validado
        // validar que no este

        try {
            const questionProduct = await productsModel.find({code : product.code})
            // console.log("QUES", questionProduct);
            const newProduct = await productsModel.create(product);
            return newProduct           
        } catch (error) {
            console.log(error.message);
        }
    }
    async updateProduct(id, product){
        // viene validado, validar que si este en la base de datos!
        try {
            const updateProduct = await productsModel.updateOne({_id : id}, product);
            return updateProduct
            
        } catch (error) {
            console.log("error --> ", error.message);

        }
    }
    async deleteProduct(id){
        // Validar que el product este!
        try {
            const productDelete = await productsModel.deleteOne({_id : id})
            return productDelete
            
        } catch (error) {
            console.log(error.message);
        }
    }
}


module.exports = { ProductManager }