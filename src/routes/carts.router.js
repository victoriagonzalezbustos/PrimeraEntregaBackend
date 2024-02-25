const express = require("express")
const router = express.Router()
const fs = require("fs").promises

const CartManager = require("../dao/db/cart-manager-db.js")
const cartManager = new CartManager()

// Rutas

//creo un carrito

router.post("/carts", async (req, res) => {

    try {
        const nuevoCarrito = await cartManager.crearCarrito()
        res.json(nuevoCarrito)
    } catch (error) {
        console.error("error al crear carrito", error)
        res.status(500).json({error: "error interno del server"})
        
    }

})


//muestro un carrito

router.get("/carts/:id", async(req,res) => {
    let {id} = req.params

    try {
        carrito = await cartManager.getCarritoByID(id)
        res.json(carrito.products)
    } catch (error) {
        console.error("error al obtener el carrito", error)
        res.status(500).json({error: "error del servidor"})
    }



})

router.post("/carts/:cid/products/:pid", async (req, res) => {

 let id_carrito = req.params.cid
 let id_producto = req.params.pid
 let quantity = req.body.quantity || 1

try {
   const actualizarCarrito = await cartManager.agregarProductoAlCarrito(id_carrito, id_producto, quantity)
   res.json(actualizarCarrito.products) 
} catch (error) {
    console.error("error al agregar producto")
    res.status(500).json({error: "error del servidor"})
}

})





module.exports = router 