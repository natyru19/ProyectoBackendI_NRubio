import { Router } from 'express';
import ProductManager from '../managers/product.manager.js';
import ProductsModel from '../models/product.model.js';
import CartManager from '../managers/cart.manager.js';

const viewsRouter = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();


viewsRouter.get("/products", async (req, res) => {
    const { limit, page } = req.query;

    try {
        const paginatedProducts = await ProductsModel.paginate({}, {limit, page});
        const products = paginatedProducts.docs;

        const productsFinal = products.map(
            product => {
                const {_id, ...rest} = product.toObject();
                return rest;
            }
        )

        res.render("home", {
            status: "success",
            products: productsFinal,
            totalPages: paginatedProducts.totalPages,
            prevPage: paginatedProducts.prevPage,
            nextPage: paginatedProducts.nextPage,
            page: paginatedProducts.page,
            hasPrevPage: paginatedProducts.hasPrevPage,
            hasNextPage: paginatedProducts.hasNextPage, 
        });

    } catch (error) {
        res.status(500).json({status: "error", error: "Hubo un error al obtener los productos"});
    }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

viewsRouter.get("/carts/:cid", async (req, res) => {
    const  id = +req.params.cid;

    try {
        const cart = await CartManager.getCartById(id);        

        if(!cart){
            return res.status(404).json({status: "error", error: "No se encontró el carrito"});
        }

        const productsToCart = cart.products.map(item => ({
            product: item.product.toObject(),
            quantity: item.quantity
        }));
        
        res.render("carts", {products: productsToCart});

    } catch (error) {
        res.status(500).json({status: "error", error: "Hubo un error al obtener el carrito"});
    }
});


export default viewsRouter;