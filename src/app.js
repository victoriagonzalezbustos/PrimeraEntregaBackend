
const PUERTO = 8080

const express = require("express")

const app = express()

const productsRouter = require("./routes/products.routers.js")
const cartsRouter = require("./routes/carts.router.js")

//creo ruta raiz

app.get("/", (req, res) => {
    res.send("server con express")
})

//Middleware

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//rutas

app.use("/api", productsRouter)
app.use("/api", cartsRouter)


// pongo a escuchar el servidor

app.listen(PUERTO, () => {
    console.log(`escuchando en http://localhost:${PUERTO}`)
})



