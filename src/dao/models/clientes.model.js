const mongoose = require("mongoose")
const clientesCollection = "clientes"
const clientesSchema = new mongoose.Schema({
    nombre:String,
    apellido: String,
    edad: Number
})

const clientesModel = mongoose.model(clientesCollection, clientesSchema)

module.exports = clientesModel;