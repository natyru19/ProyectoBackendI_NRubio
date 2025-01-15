import { Router } from 'express';
import ProductManager from '../managers/product.manager.js';

const viewsRouter = Router();
const productManager = new ProductManager('./src/data/products.json');



viewsRouter.get("/products", async (req, res) => {
        const products = await productManager.getProducts();
        res.render("home", {products});
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});


export default viewsRouter;