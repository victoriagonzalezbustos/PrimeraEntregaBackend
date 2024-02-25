const CartModel = require("../models/cart.model")

class CartManager{
    async crearCarrito(){
        try {
            const nuevoCarrito = new CartModel({products: []})
            await nuevoCarrito.save()
            return nuevoCarrito
        } catch (error) {
            console.log("Error al crear el nuevo carrito")
        }
    }

    async getCarritoByID(cartid){
        try {
            const carrito = await CartModel.findById(cartid)
            if(!carrito){
                console.log("no existe ese carrito")
            }
            return carrito
        } catch (error) {
            console.log("error al traer el carrito")
            
        }
    }

    async agregarProductoAlCarrito(cartid, productid, quantity){
        try{
        const carrito = await this.getCarritoByID(cartid)
        const existeProducto = carrito.products.find(item => item.product.toString() == productid )
        if(existeProducto){
            existeProducto.quantity += quantity
        }else{
            carrito.products.push({product: productid, quantity})
        }

        carrito.markModified("products")
        await carrito.save()
        return carrito
    }catch{
        console.log("error al agregar producto", error)
    }
    }

    async borarProductoDelCarrito(cartid, productid, quantity){
        try{
        const carrito = await this.getCarritoByID(cartid)
        const existeProducto = carrito.products.find(item => item.product.toString() == productid )
        if(existeProducto.quantity > 1){
            existeProducto.quantity -= quantity
        }else{
            console.log(carrito.products)
            carrito.products.splice(carrito.products.indexOf(existeProducto),1)
        }

        carrito.markModified("products")
        await carrito.save()
        return carrito
    }catch{
        console.log("error al borrar producto", error)
    }
    }

    async vaciarCarrito(cartid){
        try{
        const carrito = await this.getCarritoByID(cartid)
        carrito.products = []
        await carrito.save()
        return carrito
    }catch{
        console.log("error al vaciar carrito", error)
    }
    }
}

module.exports = CartManager
