import ProductsModel from '../models/product.model.js';

class ProductManager {

    validateProductFields(newProd){
        const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category'];
        for(const field of requiredFields){
            if(!newProd[field]){
                console.log(`Falta agregar el campo ${field}`);
                return false;
            }
        }
        return true;
    }

    async addProduct(newProd) {

        try {

            if(!this.validateProductFields(newProd)) {
                return false;
            }

            const existsProd = await ProductsModel.findOne({code : newProd.code});

            if(existsProd) {
                console.log("El código debe ser único");
                return false;
            }

            const newProduct = new ProductsModel({
                title : newProd.title,
                description: newProd.description,
                code: newProd.code,
                price: newProd.price,
                status: true,
                stock: newProd.stock,
                category: newProd.category,
                thumbnails: newProd.thumbnails || []
            });

            await newProduct.save();
            return newProduct;

        } catch (error) {
            console.log(error);
        }
    }

    async getPaginatedProducts({limit=10, page=1, sort='asc', query=''}) {
        try {
            let paginatedProducts = []
            let opts = {limit, page, query}
            if(sort=="asc"){
                opts.sort = {price:1}
            }else if(sort=="desc"){
                opts.sort = {price:-1}
            }
            if(query!=''){
                paginatedProducts  = await ProductsModel.paginate({category : query}, opts);
            }else{
                paginatedProducts  = await ProductsModel.paginate({}, opts);
            }
            return  paginatedProducts;
        } catch (error) {
            console.log("Hubo un error al obtener los productos paginados", error);
            throw new Error("Hubo un error al obtener los productos paginados");
        }
    }

    async getProductById(id) {
        try {
            const product = await ProductsModel.findById(id);

            return product;

        } catch (error) {
            throw error
        }
    } 


    async updateProduct(id, updatedProd){
        try {
            const updatedP = await ProductsModel.findByIdAndUpdate(id, updatedProd, {new: true});

            return updatedP;

        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            const deletedP = await ProductsModel.findByIdAndDelete(id);

            if(!deletedP) {
                throw new Error("No se encontró el producto para eliminar");
            }else {                
                return deletedP;
            }
            
        } catch (error) {
            console.log(error);
            throw new Error("Hubo un error al eliminar el producto");
        }
    }
}

export default ProductManager;