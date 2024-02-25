const mongoose = require("mongoose")

// creo el schema

const cartSchema = new mongoose.Schema({
    products: [
        {
            product:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            }],
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

const CartModel = mongoose.model("carts", cartSchema)

module.exports = CartModel;