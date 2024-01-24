const socket = io()

socket.on("products", (data)=>{
    renderProductos(data)
})

const renderProductos= (products) =>{
    const contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""

    products.forEach(element => {

        const card = document.createElement("div")
        card.classList.add("producto")

        card.innerHTML = `
        <p> ${element.id}</p>
        <p> ${element.titulo}</p>
        <p> ${element.descripcion}</p>
        <button> Eliminar Producto </button> 
        `

        contenedorProductos.appendChild(card)

        card.querySelector("button").addEventListener("click", ()=>{
            eliminarProducto(element.id)
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
        titulo: document.getElementById("titulo").value,
        descripcion : document.getElementById("descripcion").value,
        precio : document.getElementById("precio").value,
        img : document.getElementById("imagen").value,
        codigo : document.getElementById("codigo").value,
        stock : document.getElementById("stock").value


    }
    console.log(producto)
    socket.emit("agregarProducto", producto)
}

