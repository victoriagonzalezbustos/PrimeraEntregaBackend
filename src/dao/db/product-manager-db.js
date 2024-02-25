const ProductModel = require("../models/product.model.js")

class ProductManager {
    async addProduct({title, description, price, img, code, stock, category, thumbnails}){
        try {
            if(!title || !description || !price || !img ||!code || !stock || !category  ){
                console.log("Todos los campos son obligatorios")
                return
            }

                    
        
            const existeProducto = await ProductModel.findOne({code:code})
            if(existeProducto){
                console.log("el codigo tiene que ser unico")
                return
            }

             const newProduct = new ProductModel ({
                title,
                description,
                price,
                img,
                code,
                category,
                status: true,
                thumbnails: thumbnails || []
             })
    
             await newProduct.save()

        } catch (error)  {
            console.log("error al agregar el producto")
            throw error
        }

    
    }

    async getProducts(limit, page,query, sorted){
        try {
            if( query && sorted){
                const products = ProductModel.paginate({"category": query}, {limit, page, sort: {price: sorted}})
                return products
            }else if (query && !sorted){
                const products = ProductModel.paginate({"category": query}, {limit, page})
                return products

            }else if (!query && sorted){
                const products = ProductModel.paginate({}, {limit, page, sort: {price: sorted}})
                return products
            }else {
                const products = ProductModel.paginate({}, {limit, page})
                return products
            }
        } catch (error) {
            console.log("error al cargar productos")
        }
    }

    async getProductsById(id){
        try {
            const producto = ProductModel.findById(id)
            if(!producto){ 
                console.log("producto no encontrado")
                return null
            }
            return producto
        } catch (error) {
            console.log("error al traer un producto por id")
        }
    }

    async updateProduct(id, ProductoActualizado){
        try {
            const ProductoUpdateado = await ProductModel.findByIdAndUpdate(id, ProductoActualizado)
            if(!ProductoUpdateado){
                console.log("no se encuentra el producto")
                return null
            }

            console.log("Producto actualizado con exito")
            return ProductoUpdateado
        } catch (error) {
            console.log("error al actualizar el producto")
        }
    }

    async deleteProduct(id){
        try {
            const ProductoBorrado = await ProductModel.findByIdAndDelete(id)
            if(!ProductoBorrado){
                console.log("no se encuentra el producto")
                return null
            }

            console.log("Producto eliminado con exito")
            return ProductoBorrado
        } catch (error) {
            console.log("error al eliminar el producto")
        }
    }
}

module.exports = ProductManager