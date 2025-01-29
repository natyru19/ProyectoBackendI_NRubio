import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

});

const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;