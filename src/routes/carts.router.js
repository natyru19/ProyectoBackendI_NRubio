import { Router } from "express";
import CartManager from "../managers/cart.manager.js";
import CartModel from "../models/cart.model.js";

const cartsRouter = Router();
const cartManager = new CartManager();


cartsRouter.get("/", async (req, res) => {

    try {
        const carts = await cartManager.findCarts(); 
        if(!carts){
            return res.status(404).json({status: "error", message: "No se encontraron carritos", data: null});
        }
        return res.status(200).json({status: "success", message: `Carritos encontrados`, data: carts});      
    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }

});

cartsRouter.get("/:cid", async (req, res) => {
    let id = req.params.cid;
    
    try {
        const cart = await CartModel.findById(id);

        if(!cart){
            return res.status(404).json({status: "error", message: "No se encontró el carrito", data: null});
        }

        return res.status(200).json({status: "success", message: `Carrito con id: ${id} encontrado correctamente`, data: cart.products});

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
    
})


cartsRouter.post("/", async (req, res)=>{
    try {
        const newCart = await cartManager.createCart();

        if(newCart){
            return res.status(201).json({status: "success", message: "Se creó el carrito correctamente", data: newCart});
        }
        return res.status(400).json({status: "error", message: "Hubo un error al crear el carrito", data: null});

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }        
});

cartsRouter.post("/:cid/product/:pid", async(req, res)=>{
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const quantity = req.body.quantity || 1;    

    try {
        const updatedCart = await cartManager.addProductToCart(cartId, prodId, quantity);
        if(updatedCart){
            return res.status(200).json({status: "success", message: "Se agregó el producto al carrito", data: updatedCart.products});
        }
        return res.status(400).json({status: "error", message: "Hubo un error al agregar el producto al carrito", data: null});
        
    } catch (error) {        
        return res.status(500).json({status: "error", message: error.message});
    }
    
});

cartsRouter.put("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    const updatedProd = req.body;

    try {
        const updatedCart = await cartManager.updateCart(cartId, updatedProd);

        if(updatedCart){
            return res.status(200).json({status: "success", message: "Se actualizó el carrito correctamente", data: updatedCart});
        }
        return res.status(400).json({status: "error", message: "Hubo un error al actualizar el carrito", data: null});

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
});

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const newQty = req.body.quantity;

    try {
        const updatedQtyProd = await cartManager.updateQtyProd(cartId, prodId, newQty);

        if(updatedQtyProd){
            return res.status(200).json({status: "success", message: "Se actualizó la cantidad del producto correctamente", data: updatedQtyProd});
        }
        return res.status(400).json({status: "error", message: "Hubo un error al actualizar la cantidad del producto", data: null});

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
});

cartsRouter.delete("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const clearedCart = await cartManager.clearCart(cartId);

        if(clearedCart){
            return res.status(200).json({status: "success", message: "Se eliminaron todos los productos del carrito correctamente", data: clearedCart});
        }
        return res.status(400).json({status: "error", message: "Hubo un error al vaciar el carrito", data: null});

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
});

cartsRouter.delete("/:cid/product/:pid", async (req, res) => { 
    const cartId = req.params.cid;
    const prodId = req.params.pid;

    try {
        const updatedCart = await cartManager.deleteProdFromCart(cartId, prodId)

        if(updatedCart){
            return res.status(200).json({status: "success", message: "Se eliminó el producto del carrito correctamente", data: updatedCart});
        }
        return res.status(400).json({status: "error", message: "Hubo un error al eliminar el producto del carrito", data: null});
        
    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
});


export default cartsRouter;