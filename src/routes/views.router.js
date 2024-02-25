const express = require("express")
const router = express.Router()

const ProductManager = require("../dao/db/product-manager-db.js")
const productManager = new ProductManager()
const CartManager = require("../dao/db/cart-manager-db.js")
const cartManager = new CartManager()


router.get("/", async(req, res) => {
    const page = req.query.page || 1
    let limit = req.query.limit || 10
    const sorted = req.query.sorted 
    const query = req.query.query 
    
 try {
    let productos = await  productManager.getProducts(limit, page, query, sorted)

    const productos_render = productos.docs.map(producto => {const {...rest}= producto.toObject()
    return rest})


    res.render("index",{
        
        products: productos_render,
        hasPrevPage: productos.hasPrevPage,
        hasNextPage: productos.hasNextPage,
        prevPage: productos.prevPage,
        nextPage: productos.nextPage,
        currentPage: productos.page,
        totalPages: productos.totalPages,
        limit: limit,
        query: query,
        sorted: sorted

    

    })
    console.log(productos)
    console.log(productos_render)

 } catch (error) {
    console.log("error en la paginacion")
    res.status(500).send("error en el servidor")
 }
})


router.get("/carrito/:_id", async(req, res) =>{
    try {
        let _id = req.params._id
        
        let carrito = await cartManager.agregarProductoAlCarrito("65d9f7acef844cab52d4d0a6", _id, 1)
        
        const carrito_render = carrito.products.map(producto => {const {...rest}= producto.toObject()
    return rest})
       

        res.render("carts",{
            products: carrito_render
        })
    } catch (error) {
        console.log("error al cargar el carrito")
        res.status(500).send("error en el servidor")
    }
})


router.get("/carrito/delete/:producto", async(req,res)=>{
    try {
        let productid = req.params.producto
        let quantity = 1
        let cartid = "65d9f7acef844cab52d4d0a6"
        let carrito = await cartManager.borarProductoDelCarrito(cartid, productid, quantity)
        const carrito_render = carrito.products.map(producto => {const {...rest}= producto.toObject()
    return rest})
        res.render("carts",{
            products: carrito_render
        })
    } catch (error) {
        
        console.log("error al borrar el producto el carrito")
        res.status(500).send("error en el servidor")
    }
})

router.get("/carrito/vaciar/carrito", async(req,res)=>{
    try {
        let carrito = await cartManager.vaciarCarrito("65d9f7acef844cab52d4d0a6")
        const carrito_render = carrito.products.map(producto => {const {...rest}= producto.toObject()
    return rest})
        res.render("carts",{
            products: carrito_render
        })
    } catch (error) {
        
        console.log("error al vaciar el carrito")
        res.status(500).send("error en el servidor")
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