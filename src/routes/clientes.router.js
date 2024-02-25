const express = require("express")
const router = express.Router()

// importamos el modelo
const clientesModel = require("../dao/models/clientes.model.js")

router.get("/", async(req, res)=>{
    try{

        const clientes = await clientesModel.find()
        res.json(clientes)
    } catch(error){
        res.status(500).json({message: "Error en el servidor"})

    }
})

router.post("/", async(req,res)=>{
    try{
        const cliente= new clientesModel(req.body)
        await cliente.save()
        res.send({resultado:"success", cliente: cliente})

    }catch(error){
        res.status(500).json({message:"error"})
    }
})


module.exports = router;