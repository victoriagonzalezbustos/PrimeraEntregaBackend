const express = require("express")
const router = express.Router()
const ProductManager = require("../controllers/product_manager.js")
const productManager = new ProductManager("./src/models/products.json")


router.get("/", async(req, res) => {
    try{
        const productos = await productManager.leerArchivo()
        res.render("index", {
            productos: productos
        })
    } catch (error){
        console.error("Error al cargar productos", error)
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
})

router.get("/realtimeproducts", async (req,res) => {
    try{
        res.render("realtimeproducts")
    }catch (error){
        res.status(500).json({
            error:"error interno del servidor"
        })
    }
})

module.exports= router