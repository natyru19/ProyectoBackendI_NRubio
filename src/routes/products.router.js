import { Router } from "express";
import ProductManager from '../managers/product.manager.js'
import prodIdManager from "../managers/productId.manager.js";

const productsRouter = Router();
const productManager = new ProductManager('./src/data/products.json');
productManager.init();
const productIdManager = new prodIdManager('./src/data/productLastId.json');
productIdManager.init();


productsRouter.get("/", async (req, res) => {
    let limit = +req.query.limit;
    
    const products = await productManager.getProducts();

    if(limit) {
        res.send(products.slice(0, limit));
    }else {
        res.status(200).send({error: null, data: products});
    }
});

productsRouter.get("/:pid", async (req, res) => {
    let id = +req.params.pid;
    
    const searchedProduct = await productManager.getProductById(id);

    if(searchedProduct){
        res.status(200).send({error: null, mensaje: `Se encontró el producto con el ID ${id}`, data: searchedProduct});
    } else {
        res.status(400).send({error: `El producto con el ID ${id} no existe`, data: []});
    }

})

productsRouter.post("/", async(req, res) => {
    let newProduct = req.body;
    
    if (newProduct.status==null){
        newProduct.status = true;
    }
    let success = await productManager.addProduct(newProduct);
    if(success){
        res.status(201).send({error: null, data: newProduct});
    }else{
        res.status(400).send({error: "Hubo error al agregar", data: []});
    }
});

productsRouter.put("/:pid", async(req, res) => {
    let id = +req.params.pid;
    
    let searchedProduct = await productManager.getProductById(id);
    let modProduct = req.body;
    
    if(searchedProduct){
        
        searchedProduct = {
            id: searchedProduct.id,
            title: modProduct.title,
            description: modProduct.description,
            code: modProduct.code,
            price: modProduct.price,
            status: modProduct.status,
            stock: modProduct.stock,
            category: modProduct.category,
            thumbnails: modProduct.thumbnails
        };

        let allProducts = await productManager.getProducts();
        let searchedProductIndex = allProducts.findIndex((prod) => prod.id === id);
        allProducts[searchedProductIndex] = searchedProduct;
        await productManager.saveFile(allProducts);

        res.status(200).send({error: null, data: searchedProduct});
    } else {
        res.status(400).send({error: `El producto con el ID ${id} no existe`, data: []});
    }
        
});

productsRouter.delete("/:pid", async(req, res) => {
    let id = +req.params.pid;
    let searchedProduct = await productManager.getProductById(id);
    
    if(searchedProduct){
        let allProducts = await productManager.getProducts();
        let searchedProductIndex = allProducts.findIndex((prod) => prod.id === id);
        allProducts.splice(searchedProductIndex,1); 
        await productManager.saveFile(allProducts);

        res.status(200).send({error: null, data: searchedProduct});
    } else {
        res.status(400).send({error: `El producto con el ID ${id} no existe`, data: []});
    }
});


export default productsRouter;