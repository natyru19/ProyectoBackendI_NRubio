

const socket = io();

socket.on("products", (data) => {
    renderProducts(data);
});

const renderProducts = (products) => {
    const containerProducts = document.getElementById('containerProducts');
    containerProducts.innerHTML = "";
    
    if(products.length<1){
        containerProducts.innerHTML = `<p id="pInicial">Agrega tu primer producto</p>`;
    }

    products.forEach(item => {
        const card = document.createElement('div');
        card.classList.add("card");
        card.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <p>$ ${item.price}</p>
            <button>Eliminar</button>
        `
        containerProducts.appendChild(card);

        const deleteButton = card.querySelector('button');
        deleteButton.classList.add("btn");

        deleteButton.addEventListener("click", async() => {
            await deleteProd(item._id);
        });
    });
}

document.getElementById("btnAdd").addEventListener("click", () => {
    addNewProduct();
});

const addNewProduct = async() => {
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let code = document.getElementById("code");
    let price = document.getElementById("price");
    let status = document.getElementById("status");
    let stock = document.getElementById("stock");
    let category = document.getElementById("category");



    const product = {
        title : title.value ,
        description : description.value,
        code : code.value,
        price: parseInt(price.value),
        status : status.value,
        stock: parseInt(stock.value),
        category : category.value,
        thumbnails: []
    }

    let opts = {
        method : 'POST',
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(product)
    }

    let response = await fetch(`http://localhost:8080/api/products`, opts)
    response = await response.json();
    
    if(response.error == null){
        socket.emit("addNewProduct");
        Swal.fire(`Se agregó ${response.data.title}`);
        clearFields();
    }else{
        Swal.fire("No se pudo agregar el producto");
        
    }

}

const deleteProd = async (id) => {
    const response = await fetch(`http://localhost:8080/api/products/${id}`, {method : 'DELETE'})
    const responseData = await response.json();
    
    if(response.status==200){
        Swal.fire(`Se borró ${responseData.data.title}`);
        socket.emit("deleteProd");
        
    }else{
        Swal.fire(responseData.message);
    }
}

const clearFields = ()=>{
    title.value = "";
    description.value = "";
    code.value = "";
    price.value = "";
    stock.value = "";
    category.value = "";
}