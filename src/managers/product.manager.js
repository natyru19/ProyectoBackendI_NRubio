import { promises as fs } from 'fs';
import prodIdManager from "../managers/productId.manager.js";

const productIdManager = new prodIdManager('./src/data/productLastId.json');
class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    

    async init(){
        try{
            const exists = await fs.access(this.path);
        }catch(err){
            console.log("Se está creando un nuevo archivo: products")
            await fs.writeFile(this.path, JSON.stringify([]));
        }
    }
    
    async addProduct(newProd) {

        
        const arrayProducts = await this.readFile();
        const lastId = productIdManager.readLastId();
        newProd = {id: lastId+1, ...newProd};
        
        
        if(!newProd.title || !newProd.description || !newProd.code || !newProd.price || !newProd.stock || !newProd.category) {
            console.log("Falta agregar algún campo");
            return false;
        }

        if(arrayProducts.some(item => item.code === newProd.code)) {
            console.log("El código debe ser único");
            return false;
        }


        arrayProducts.push(newProd);
        productIdManager.saveLastId()
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