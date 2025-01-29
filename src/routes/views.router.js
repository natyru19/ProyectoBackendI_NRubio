import { Router } from 'express';
import ProductManager from '../managers/product.manager.js';
import ProductsModel from '../models/product.model.js';

const viewsRouter = Router();
const productManager = new ProductManager('./src/data/products.json');



viewsRouter.get("/products", async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = +req.query.limit || 10;

            // const products = await productManager.getProducts();
            // res.render("home", {products});
            const paginatedProducts = await ProductsModel.paginate({}, {limit, page});
            const products = paginatedProducts.docs;
            console.log({productsEnViews : products});
            

            const productsFinal = products.map(
                product => {
                    const {_id, ...rest} = product.toObject();
                    return rest;
                    
                }
            )
            console.log({productsFinal} + "en views");

            res.render("home", {
                status: "success",
                products: productsFinal,
                totalPages: paginatedProducts.totalPages,
                prevPage: paginatedProducts.prevPage,
                nextPage: paginatedProducts.nextPage,
                page: paginatedProducts.page,
                hasPrevPage: paginatedProducts.hasPrevPage,
                hasNextPage: paginatedProducts.hasNextPage,
                // prevLink:
                // nextLink: 
            });

        } catch (error) {
            res.status(500).json({status: "error", error: "Hubo un error en el servidor"});
        }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});


export default viewsRouter;