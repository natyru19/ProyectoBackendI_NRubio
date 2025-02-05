import CartModel from "../models/cart.model.js"

class CartManager {

    async createCart() {
        try {
            const newCart = new CartModel({products: []});
            await newCart.save();
            return newCart;
        } catch (error) {
            throw error;
        }
    }

    async findCartById(id) {
        try {            
            const cart = await CartModel.findById(id);            
            return cart;
        } catch (error) {
            throw error;
            
        }
    }

    async getCartById(id) {
        try {
            return await this.findCartById(id);
        } catch (error) {
            throw error;
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
            throw error;
        }
    }

    async deleteProdToCart (cartId, prodId) {
        try {
            const cart = await CartModel.findById(cartId);
            cart.products = cart.products.filter(item => item.product._id.toString() != prodId);

            await cart.save();
            return cart;

        } catch (error) {
            throw error;
        }
    }

    async updateCart (cartId, updatedProd) {
        try {
            const cart = await CartModel.findById(cartId);            
            cart.products = updatedProd;
            cart.markModified("products");

            await cart.save();
            return cart;

        } catch (error) {
            throw error;
        }
    }

    async updateQtyProd(cartId, prodId, newQty){
        try {
            const cart = await this.findCartById(cartId);
            const productIndex = cart.products.findIndex(item => item.product.toString() === prodId);

            if(productIndex !== -1){
                cart.products[productIndex].quantity = newQty;

                cart.markModified("products");

                await cart.save();
                return cart;
            }

        } catch (error) {
            throw error;
        }
    }

    async clearCart(cartId){
        try {
            const cart = await CartModel.findByIdAndUpdate(cartId, {products: []}, {new: true});
            return cart;
            
        } catch (error) {
            throw error;
        }
    }

}

export default CartManager;