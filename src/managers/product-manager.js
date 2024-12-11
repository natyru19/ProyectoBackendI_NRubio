//FileSystem con promesas
import {promises as fs} from 'fs';

// Clase ProductManager con su constructor

class ProductManager {
    static lastId = 0;
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    // Agregar un producto

    async addProduct({title, description, price, img, code, stock}) {

        //Se lee el archivo y se guarda el array con los productos
        const arrayProducts = await this.readFile();

        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if(arrayProducts.some(item => item.code === code)) {
            console.log("El código debe ser único");
        }

        // Luego de pasar por todas las validaciones, se crea el objeto
        const newProduct = {
            id: ++ProductManager.lastId,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        arrayProducts.push(newProduct);

        // Una vez agregado el nuevo producto al array, se guarda el array al archivo
        await this.saveFile(arrayProducts);
    }

    async getProducts() {
        const arrayProducts = await this.readFile();
        return arrayProducts;
    }

    async getProductById(id) {
        const arrayProducts = await this.readFile();
        const product = arrayProducts.find(item => item.id === id);

        if(!product) {
            return "El producto no se encontró";
        }else {
            return product;
        }
    }

    async saveFile(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error) {
            console.log("Tenemos un error al guardar el archivo");
        }
    }

    async readFile() {
        try {
            const resp = await fs.readFile(this.path, "utf-8");
            const arrayProducts = JSON.parse(resp);
            return arrayProducts;
        } catch (error) {
            console.log("Tenemos un error al leer el archivo")
        }
    }
}

export default ProductManager;