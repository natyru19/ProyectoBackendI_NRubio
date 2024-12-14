//FileSystem con promesas
import { promises as fs } from 'fs';

// Clase ProductManager con su constructor

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    // Agregar un producto

    async addProduct(newProd) {

        const arrayProducts = await this.readFile();

        if(!newProd.title || !newProd.description || !newProd.code || !newProd.price || !newProd.status || !newProd.stock || !newProd.category) {
            console.log("Todos los campos son obligatorios");
            return false;
        }

        if(arrayProducts.some(item => item.code === newProd.code)) {
            console.log("El código debe ser único");
            return false;
        }

        arrayProducts.push(newProd);
        await this.saveFile(arrayProducts);
        return true;
    }

    async getProducts() {
        const arrayProducts = await this.readFile();
        return arrayProducts;
    }

    async getProductById(id) {
        const arrayProducts = await this.readFile();
        const product = arrayProducts.find(item => item.id === id);

        if(!product) {
            return false;
        }else {
            return product;
        }
    }

    async saveFile(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error) {
            console.log(error);
        }
    }

    async readFile() {
        try {
            const resp = await fs.readFile(this.path, "utf-8");
            const arrayProducts = JSON.parse(resp);
            return arrayProducts;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProductManager;