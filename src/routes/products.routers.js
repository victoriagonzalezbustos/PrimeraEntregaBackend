const express = require("express")
const router = express.Router()

const ProductManager = require("../controllers/product_manager.js")
const productManager = new ProductManager("./src/models/products.json")


//limite

router.get("/products", async (req, res) => {

    let limit = parseInt(req.query.limit);

    let productos = await  productManager.leerArchivo()
    
    if(limit){
        productosAcotados = productos.slice(0,limit)
        res.send(productosAcotados)
    }else{
        res.send(productos)
    }
    
})

//filtro por id

router.get("/products/:id", async (req, res) =>{

    let id = parseInt(  req.params.id)
    let productos = await  productManager.leerArchivo()

    productoBuscado = productos.find(item => item.id == id)

    if (id){
        res.send(productoBuscado)
    }else{
        res.send("nada que mostrar")
    }



})

module.exports= router