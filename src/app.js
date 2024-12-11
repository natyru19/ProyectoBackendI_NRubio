// Módulo de Express
import express from 'express';

// Aplicación de Express
const app = express();

// Se importa el ProductManager
import ProductManager from './managers/product-manager.js';
const manager = new ProductManager('./src/data/products.json');

// Rutas

app.get("/", (req, res) => {
    res.send("Bienvidos a la app");
});

app.get("/products", async (req, res) => {
    let limit = req.query.limit;
    const products = await manager.getProducts();

    if(limit) {
        res.send(products.slice(0, limit));
    }else {
        res.send(products);
    }
})

app.get("/products/:pid", async (req, res) => {
    let id = req.params.pid;
    const searchedProduct = await manager.getProductById(parseInt(id));
    res.send(searchedProduct);
})

// La app escuchando en el puerto 8080 (el que se le indica)

const PUERTO = 8080;

app.listen(PUERTO, () => {
    console.log(`Server listening on port ${PUERTO}`);
})