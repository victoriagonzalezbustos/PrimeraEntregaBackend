const express = require("express")
const router = express.Router()

const ProductManager = require("../dao/db/product-manager-db.js")
const productManager = new ProductManager()


//limite

router.get("/products", async (req, res) => {

    const page = req.query.page || 1

    let limit = 1;
 try {
    let productos = await  productManager.getProducts(limit, page)
    res.send(productos)
 } catch (error) {
    console.log("error en la paginacion")
    res.status(500).send("error en el servidor")
 }
    

    
})

//filtro por id

router.get("/products/:id", async (req, res) =>{

    let id = req.params.id //tenia parse int
    let producto = await  productManager.getProductsById(id)

    if (!producto){
        return res.json({
            error: "producto no encontrado"
        })
    }else{
        res.json(producto)
    }



})

//agrego nuevo producto

router.post("/products", async (req, res) =>{
    const productoNuevo = req.body
    await productManager.addProduct(productoNuevo)
    res.send({status: "success", message: "producto agregado"})

})

// edito producto

router.put("/products/:id", async (req, res)=>{

    const {id} = req.params
    const productoActualizado = req.body
    
    try {
        await productManager.updateProduct(id, productoActualizado)
        res.json({
            message: "producto actualizado"
        })
    } catch (error) {
        console.error("error al actualizar el producto", error)
        res.status(500).json({
            error: "error del servidor"
        })
        
    }
})

//elimino producto

router.delete("/products/:id", async (req, res) => {

    const {id} = req.params
    
    try {
        await productManager.deleteProduct(id)
        res.json({
            message: "producto eliminado"
        })
    } catch (error) {
        console.error
        
    }

    
})

module.exports= router