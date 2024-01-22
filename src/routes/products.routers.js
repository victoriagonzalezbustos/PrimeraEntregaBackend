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

//agrego nuevo producto

router.post("/products", async (req, res) =>{
    const productoNuevo = req.body
    await productManager.addProduct(productoNuevo)
    res.send({status: "success", message: "producto agregado"})

})

// edito producto

router.put("/products/:id", async (req, res)=>{

    let productos = await productManager.leerArchivo()

    const {id} = req.params
    const nuevoProducto = req.body
    
    
    const productindex = productos.findIndex(producto => producto.id == id)

    if(productindex !== -1){
        await productManager.updateProduct(id, nuevoProducto)
        res.send({status: "success", message: "producto editado"})
    }else{
        res.status(404).send({status: "error", message: "producto no encontrado"})
    }

})

//elimino producto

router.delete("/products/:id", async (req, res) => {

    let productos = await productManager.leerArchivo()
    console.log(productos)
    const {id} = req.params
    
    const productindex = productos.findIndex(producto => producto.id == id)

    if(productindex !== -1){
        await productManager.deleteProducts(id)
        res.send({status: "success", message: "producto eliminado"})
    }else{
        res.status(404).send({status: "error", message: "producto no encontrado"})
    }
})

module.exports= router