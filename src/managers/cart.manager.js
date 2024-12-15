import { promises as fs } from 'fs';


class CartManager {
    constructor(path) {
        this.path = path;
    }

    async init(){
        try{
            const exists = await fs.access(this.path);
        }catch(err){
            console.log("Se está creando un nuevo archivo: carts")
            await fs.writeFile(this.path, JSON.stringify([]));
        }
    }

    async getCartById(id) {
        const carts = await this.readFile();
        const cart = carts.find(item => item.id === id);

        if(!cart) {
            return false;
        }else {
            return cart;
        }
    }

    async addCart(newCart) {

        const carts = await this.readFile();
        carts.push(newCart);
        await this.saveFile(carts);
        return true;
    }

    async getCarts() {
        const arrayProducts = await this.readFile();
        return arrayProducts;
    }

    async saveFile(arrayCarts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayCarts, null, 2));
        } catch (error) {
            console.log(error);
        }
    }

    async readFile() {
        try {
            const resp = await fs.readFile(this.path, "utf-8");
            const carts = JSON.parse(resp);
            return carts;
        } catch (error) {
            console.log(error);
        }
    }
}


export default CartManager;