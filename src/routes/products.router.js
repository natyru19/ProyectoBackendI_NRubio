import { Router } from "express";
const productsRouter = Router();
import ProductManager from '../managers/product.manager.js'
import IdManager from "../managers/lastId.manager.js";

const productManager = new ProductManager('./src/data/products.json');
const idManager = new IdManager('./src/data/lastId.json');


productsRouter.get("/", async (req, res) => {
    let limit = req.query.limit;
    const products = await productManager.getProducts();

    if(limit) {
        res.send(products.slice(0, limit));
    }else {
        res.send({status: "success", data: products});
    }
})

productsRouter.get("/:pid", async (req, res) => {
    let id = parseInt(req.params.pid);
    const searchedProduct = await productManager.getProductById(id);
    res.send({error: null, mensaje: "Producto creado correctamente", data:searchedProduct});
})

productsRouter.post("/", async(req, res) => {
    let newProduct = req.body;
    const lastId = await idManager.readLastId();
    newProduct = {id: lastId+1, ...newProduct};
    let success = await productManager.addProduct(newProduct);
    if(success){
        idManager.saveLastId()
        res.status(201).send({error: null, mensaje: "Producto creado correctamente", data: newProduct});
    }else{
        res.status(400).send({error: "Hubo error al agregar", mensaje: "Producto no agregado", data: []});
    }
});

export default productsRouter;