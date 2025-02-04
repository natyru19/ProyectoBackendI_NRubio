const socket = io();

socket.on("products", (data) => {
    renderProducts(data);
});

document.getElementById("btnAdd").addEventListener("click", () => {
    addNewProduct();
});