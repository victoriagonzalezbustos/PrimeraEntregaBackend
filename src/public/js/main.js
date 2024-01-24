const socket = io()

socket.on("products", (data)=>{
    renderProductos(data)
})

const renderProductos= (products) =>{
    const contenedorProductos = document.getElementById("contenedorProductos")
    //contenedorProductos.innerHTML = ""

    products.forEach(element => {

        const card = document.createElement("div")
        card.classList.add("producto")

        card.innerHTML = `
        <p> Id ${element.id}</p>
        <p> Id ${element.titulo}</p>
        <p> Id ${element.descripcion}</p>
        <button> Eliminar Producto </button> 
        `

        contenedorProductos.appendChild(card)

        card.querySelector("button").addEventListener("click", ()=>{
            eliminarProducto(item.id)
        })
        
    });
}

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id)
}

document.getElementById("BotonEnviar").addEventListener("click", ()=>{
    agregarProducto()
})

const agregarProducto =  ()=>{
    const producto = {
        titulo : document.getElementById("titulo"),
        descripcion : document.getElementById("descripcion"),
        precio : document.getElementById("precio"),
        imagen : document.getElementById("imagen"),
        codigo : document.getElementById("codigo"),
        stock : document.getElementById("stock")


    }

    socket.emit("agregarProducto", producto)
}