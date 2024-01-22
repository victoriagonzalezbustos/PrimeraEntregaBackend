const express = require("express")
const router = express.Router()
const fs = require("fs").promises

const ProductManager = require("../controllers/product_manager.js")
const productManager = new ProductManager("./src/models/carrito.json")

// Rutas

//creo un carrito

router.post("/carts", async (req, res) => {

    respuesta = await fs.readFile("./src/models/carrito.json", "utf-8")
    arrayCarritos = JSON.parse(respuesta)
    ultimoid= arrayCarritos.length
    const nuevoCarrito = {
        id : ++ultimoid,
        arrayProductos: []

    }

    arrayCarritos.push(nuevoCarrito)
    await fs.writeFile("./src/models/carrito.json", JSON.stringify(arrayCarritos, null, 2))
    res.send({status: "success", message: "carrito creado"})
})


//muestro un carrito

router.get("/carts/:id", async(req,res) => {
    let {id} = req.params

    let respuesta = await fs.readFile("./src/models/carrito.json", "utf-8")
    const arrayCarritos = JSON.parse(respuesta)


    const carritoBuscadoindex = arrayCarritos.findIndex(item => item.id == id)


    if (carritoBuscadoindex !== -1){
        const carritoBuscado = arrayCarritos.find(item => item.id == id).arrayProductos
        res.send(carritoBuscado)
    }else{
        res.status(404).send({status: "error", message: "carrito no encontrado"})
    }


})

router.post("/carts/:cid/products/:pid", async (req, res) => {

 let id_carrito = parseInt(req.params.cid)
 let id_producto = parseInt(req.params.pid)

 let respuesta = await fs.readFile("./src/models/carrito.json", "utf-8")
 const arrayCarritos = JSON.parse(respuesta)
 
 const indexCarritoBuscado = arrayCarritos.findIndex(item => item.id == id_carrito)
 const carritoBuscado = arrayCarritos.find(item => item.id == id_carrito).arrayProductos
 const indexProducto = carritoBuscado.findIndex(item => item.id == id_producto)

 if(indexProducto !== -1){
    ++carritoBuscado[indexProducto].cantidad

    arrayCarritos[indexCarritoBuscado].arrayProductos = carritoBuscado
    await fs.writeFile("./src/models/carrito.json", JSON.stringify(arrayCarritos, null, 2))
 }else{
    let sumoProducto = {
        id: id_producto,
        cantidad: 1
    }
    carritoBuscado.push(sumoProducto)
    arrayCarritos[indexCarritoBuscado].arrayProductos = carritoBuscado

    await fs.writeFile("./src/models/carrito.json", JSON.stringify(arrayCarritos, null, 2))
 }

 res.send(carritoBuscado)

})





module.exports = router 