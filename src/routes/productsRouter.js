// const { log } = require("console");
const { Router } = require("express");
// const { reset } = require("nodemon");
const { ProductManager } = require("../services/productsServices");
const router = Router();


const manager = new ProductManager()

router.get("/", async (req, res) => {
    // obtener products
    try {
        const info = await manager.getProducts();
        res.send(info)  
    } catch (error) {
        console.log(error);
    }
})

router.get("/:id", async (req, res) => {
    let { id } = req.params
    // console.log("id -->", id);

    try {
        const product = await manager.getProdoductById(id);
        // validar qeu viene
        if (product){
            return res.json({
                    ok : true,
                    message : "get product succesfully",
                    product
            })
        }
        res.status(404).json({
            ok : false,
            message: "Proct not found"
        })
    } catch (error) {
        console.log(error);
    }
    
})

router.post("/", async (req, res) => {
    try {
        const bodyProduct = req.body;
        //Validar que no se encuentre en la BBDD
        // console.log();
        const newProduct = await manager.createProduct(bodyProduct);
        if(newProduct){
            return res.json({
                ok : true,
                message : "Product created",
                newProduct
            })
    
        }
        res.send("Code is in use or missing necessary data")
        
    } catch (error) {
        console.log(error.message);
    }

});

router.put("/:id", (req, res) => {
    //actualizar
    try {
        const bodyProduct = req.body;
        let { id } = req.params
        const updateProduct = manager.updateProduct(id, bodyProduct);
        if (updateProduct){
            return res.json({
                ok : true, 
                message : "Product updated succesfully",
                updateProduct
            })
            
        }
        res.json({
            ok : false,
            message: "product no found"
        })
        
        
    } catch (error) {
        console.log(error.message);
    }

})

router.delete("/:id", async (req, res) => {   
    try {
        let { id } = req.params
        const deleteProduct = await manager.deleteProduct(id);
        console.log(deleteProduct);
        if(deleteProduct){
            return res.json({
                ok : true, 
                message : "product deleted",
            })
        }
        res.json({
            ok : false,
            message: "Product not found"
        })

    } catch (error) {
        console.log(error.message);
    }
})







module.exports = router;