import { Router } from "express";
import CartManager from '../managers/cart.manager.js';
import IdCartManager from '../managers/cartId.manager.js';

const cartsRouter = Router();
const cartManager = new CartManager('./src/data/carts.json');
cartManager.init();
const idCartManager = new IdCartManager('./src/data/cartLastId.json');
idCartManager.init();


cartsRouter.get("/:cid", async (req, res) => {
    let id = +req.params.cid;
    
    const searchedCart = await cartManager.getCartById(id);

    if(searchedCart){
        res.status(200).send({error: null, mensaje: `Se encontró el carrito con el ID ${id}`, data: searchedCart});
    } else {
        res.status(400).send({error: `El carrito con el ID ${id} no existe`, mensaje: `No se encontró el carrito`, data: []});
    }
})


cartsRouter.post("/", async (req, res)=>{
    
    const lastId = idCartManager.readLastId();
    
    let newCart = {id: lastId+1, products : []};
    
    let success = await cartManager.addCart(newCart);
    if(success){
        idCartManager.saveLastId()
        res.status(201).send({error: null, mensaje: "Carrito creado correctamente", data: newCart});
    }else{
        res.status(400).send({error: "Hubo error al crear el carrito", mensaje: "Carrito no creado", data: []});
    }
        
});

cartsRouter.post("/:cid/product/:pid", async(req, res)=>{
    let cartId = +req.params.cid;
    let prodId = +req.params.pid;
    let prodExists = false;

    let searchedCart = await cartManager.getCartById(cartId);

    
    for(let i=0; i< searchedCart.products.length; i++){
        if(searchedCart.products[i].prodId === prodId){
            searchedCart.products[i].qty++;
            prodExists = true;
        }
    }


    if(!prodExists){
        searchedCart.products.push({prodId: prodId, qty: 1});
    }

    let allCarts = await cartManager.getCarts();
    let searchedCartIndex = allCarts.findIndex(cart => cart.id === cartId);
    allCarts[searchedCartIndex] = searchedCart;
    cartManager.saveFile(allCarts);

    res.status(201).send({error: null, mensaje: "Producto agregado al carrito", data: searchedCart});
    
});


export default cartsRouter;