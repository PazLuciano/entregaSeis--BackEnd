const { log } = require("console");
const { Router } = require("express");
const  CartManager  = require("../services/cartsServices");
const router = Router();

const manager = new CartManager()
router.get("/", (req, res) => {
    res.send("holaaa")
})
router.post("/", async (req, res) => {
    // AGREGAR CARRIT A BBDD 
    try {
        const resultado = await manager.addCart();
        res.json({
            ok : true,
            message : "veremos",
            cart : resultado
        })
        
    } catch (error) {
        console.log(error.message);
    }

})

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    // validar cid
    const cart = await manager.getCart(cid);
    if (cart){
        console.log("cart -- >", cart);
        return res.json({
            ok : true,
            message : "Get cart succesfully!",
            cart : cart.products
        })
        
    }
    res.json({
        ok : false,
        message : "Cart not found"
    })
    // Mostrar array de productos a paritr del ID del carrito.
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        // const { quantity } = req.body;
        const { cid, pid } = req.params;
        const result = await manager.addProductAtCart(cid, pid);
        // console.log(quantity);
        console.log(result);
        if(result !== 1 && result !== 0){
            return res.json({
                ok : true,
                message : "Product push!!",
                cart : result
            })
        }
        if(result == 1){
            return res.json({
                ok : false,
                message : "product not found"
            })
        }
        res.json({
            ok : false,
            message : "cart not found"
        }
        )
    }   catch (error) {
        console.log(error.message);
    }
})


module.exports = router