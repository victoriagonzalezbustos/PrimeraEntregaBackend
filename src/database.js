
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://victoriagonzalezbustos:39467217@cluster0.ac3pubp.mongodb.net/e-commerce?retryWrites=true&w=majority")
   .then(()=> console.log("conectados"))
    .catch((error)=> console.log(error))