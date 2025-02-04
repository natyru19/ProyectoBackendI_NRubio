import { Router } from "express";
import CartManager from "../managers/cart.manager.js";
import CartModel from "../models/cart.model.js";

const cartsRouter = Router();
const cartManager = new CartManager();


cartsRouter.get("/:cid", async (req, res) => {
    let id = +req.params.cid;
    
    try {
        const cart = await CartModel.findById(id);

        if(!cart){
            return res.status(404).json({status: "error", error: "No se encontró el carrito"});
        }

        return res.json({status: "success", products: cart.products});

    } catch (error) {
        res.status(500).json({status: "error", error: "Hubo un error al obtener el carrito"});
    }
    
})


cartsRouter.post("/", async (req, res)=>{
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({status: "success", message: "Se creó el carrito correctamente", newCart});

    } catch (error) {
        res.status(500).json({status: "error", error: "Hubo un error al crear el carrito"});
    }        
});

cartsRouter.post("/:cid/product/:pid", async(req, res)=>{
    const cartId = +req.params.cid;
    const prodId = +req.params.pid;
    const quantity = +req.body.quantity || 1;    

    try {
        const updatedCart = await cartManager.addProductToCart(cartId, prodId, quantity);
        res.json({status: "success", message: "Se agregó el producto al carrito", products: updatedCart.products});
        
    } catch (error) {        
        res.status(500).json({status: "error", error: "Hubo un error al agregar el producto al carrito"});
    }
    
});

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    const cartId = +req.params.cid;
    const prodId = +req.params.pid;

    try {
        const updatedCart = await cartManager.deleteProdToCart(cartId, prodId);
        res.json({status: "success", message: "Se eliminó el producto del carrito correctamente", updatedCart});
        
    } catch (error) {
        res.status(500).json({status: "error", error: "Hubo un error al eliminar el producto del carrito"});
    }
});

cartsRouter.put("/:cid", async (req, res) => {
    const cartId = +req.params.cid;
    const updatedProd = req.body;

    try {
        const updatedCart = await cartManager.updateCart(cartId, updatedProd);
        res.json({status: "success", message: "Se actualizó el carrito correctamente", updatedCart});

    } catch (error) {
        res.status(500).json({status: "error", error: "Hubo un error al actualizar el carrito"});
    }
});

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    const cartId = +req.params.cid;
    const prodId = +req.params.pid;
    const newQty = +req.body.quantity;

    try {
        const updatedCart = await cartManager.updateQtyProd(cartId, prodId, newQty);
        res.json({status: "success", message: "Se actualizó la cantidad del producto correctamente", updatedCart});

    } catch (error) {
        res.status(500).json({status: "error", error: "Hubo un error al actualizar la cantidad del producto"});
    }
});

cartsRouter.delete("/:cid", async (req, res) => {
    const cartId = +req.params.cid;

    try {
        const updatedCart = await cartManager.clearCart(cartId);
        res.json({status: "success", message: "Se eliminaron todos los productos del carrito correctamente", updatedCart});

    } catch (error) {
        res.status(500).json({status: "error", error: "Hubo un error al vaciar el carrito"});
    }
});


export default cartsRouter;