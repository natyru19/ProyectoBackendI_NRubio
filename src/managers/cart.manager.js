import CartModel from "../models/cart.model.js"

class CartManager {

    async createCart() {
        try {
            const newCart = new CartModel({products: []});
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error("Hubo un error al crear el carrito");
        }
    }

    async findCartById(id) {
        const cart = await CartModel.findById(id);            

        if(!cart) {
            throw new Error(`No se encontró el carrito con el id ${id}`);
        }
        return cart;
    }

    async getCartById(id) {
        try {
            return await this.findCartById(id);

        } catch (error) {
            throw new Error("Hubo un error al obtener el carrito");
        }
    }

    async addProductToCart (cartId, prodId, quantity = 1) {
        try {
            const cart = await this.findCartById(cartId);
            const prodExists = cart.products.find(item => item.product.toString() === prodId);

            if(prodExists){
                prodExists.quantity += quantity;
            }else {
                cart.products.push({product: prodId, quantity});
            }

            cart.markModified("products");

            await cart.save();
            return cart;

        } catch (error) {
            throw new Error(`Hubo un error al agregar el producto ${prodId} al carrito ${cartId}`);
        }
    }

    async deleteProdToCart (cartId, prodId) {
        try {
            const cart = await CartModel.findById(cartId);

            if(!cart){
                res.status(404).json({status: "error", error: "No se encontró el carrito"});
            }

            cart.products = cart.products.filter(item => item.product._id.toString() != prodId);

            await cart.save();
            return cart;

        } catch (error) {
            throw new Error("Hubo un error al eliminar el producto del carrito");
        }
    }

    async updateCart (cartId, updatedProd) {
        try {
            const cart = await CartModel.findById(cartId);

            if(!cart){
                res.status(404).json({status: "error", error: "No se encontró el carrito"});
            }

            cart.products = updatedProd;

            //cart.markModified("products");

            await cart.save();
            return cart;

        } catch (error) {
            throw new Error("Hubo un error al actualizar el carrito");
        }
    }

    async updateQtyProd(cartId, prodId, newQty){
        try {
            const cart = await this.findCartById(cartId);
            const productIndex = cart.products.findIndex(item => item.product.toString() === prodId);

            if(productIndex !== -1){
                cart.products[productIndex].quantity = newQty;

                //cart.markModified("products");

                await cart.save();
                return cart;
            }else{
                throw new Error(`No se encontró el producto ${prodId} en el carrito ${cartId}`);
            }

        } catch (error) {
            throw new Error("Hubo un error al actualizar la cantidad del producto en el carrito");
        }
    }

    async clearCart(cartId){
        try {
            const cart = await CartModel.findByIdAndUpdate(cartId, {products: []}, {new: true});

            if(!cart){
                throw new Error("No se encontró el carrito");
            }

            return cart;
            
        } catch (error) {
            throw new Error("Hubo un error al vaciar el carrito");
        }
    }

}

export default CartManager;