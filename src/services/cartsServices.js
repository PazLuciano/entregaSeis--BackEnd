
const { log } = require("console");
const cartsModel = require("../models/cartsModel");
const productsModel = require("../models/productsModel");

class CartManager {
    async addCart(){
        try {
            const cart = await cartsModel.create({});
            // console.log("cart --> ", cart);
            return cart
        } catch (error) {
            console.log(error.message);
        }
    }

    async getCart(cid){
        try {
            const cart = cartsModel.find({ _id : cid})
            return cart
        } catch (error) {
          console.log("error  --> ", message.error);  
        }
    }

    async addProductAtCart(cid, pid, quantity = 1){
        try {
            const product = await productsModel.findOne({_id : pid});
            const cart = await cartsModel.find({_id : cid})
            console.log(product,"p--c> ", cart);           
            const productPush = await cartsModel.updateOne({_id : cid}, {
                 $push : {
                    products : {
                        id : pid,
                        quantity
                    }
                }
            })

            return productPush
        } catch (error) {
            if(error.message.includes("Carts")){
                console.log("error --> ", error.message);
                return 0
            }
            return 1
        }
    }    
}
module.exports = CartManager;