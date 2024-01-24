
const PUERTO = 8080
const express = require("express")
const app = express()

const exphdbs = require("express-handlebars")
app.engine("handlebars", exphdbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

const productsRouter = require("./routes/products.routers.js")
const cartsRouter = require("./routes/carts.router.js")
const viewsRouter = require("./routes/views.router.js")

const ProductManager = require("./controllers/product_manager.js")
const productManager = new ProductManager("./src/models/products.json")



//Middleware

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())
app.use(express.static("./src/public"))

//rutas

app.use("/api", productsRouter)
app.use("/api", cartsRouter)
app.use("/", viewsRouter)


// pongo a escuchar el servidor

const httpServer = app.listen(PUERTO, () => {
    console.log(`escuchando en http://localhost:${PUERTO}`)
})



const socket = require("socket.io")
const io = socket(httpServer)



io.on("connection", async(socket)=> {
    console.log("online")
    socket.emit("products", await productManager.leerArchivo())

    socket.on("eliminarProducto", async(id)=>{
        await productManager.deleteProducts()
        io.socket.emit("products", await productManager.leerArchivo())
    })

    socket.on("agregarProducto", async(producto)=>{
        await productManager.addProduct(producto)
        io.socket.emit("products", await productManager.leerArchivo())
    })
})