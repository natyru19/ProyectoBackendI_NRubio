import { Router } from "express";
import ProductManager from '../managers/product.manager.js';

const productsRouter = Router();
const productManager = new ProductManager();


productsRouter.get("/", async (req, res) => {
    const {limit=10, page=1, sort, query, id } = req.query;
    try {
        if(id){
            let product = await productManager.getProductById(id)
            if(product){
                return res.status(200).json({status: "success", message : "Producto encontrado", data : product});
            }
            return res.status(404).json({status: "error", message : "Producto NO encontrado", data : null})
        }else{
            const products = await productManager.getPaginatedProducts({limit: parseInt(limit),page: parseInt(page), sort, query})
            let response={
                status: "success",
                message: "Productos encontrados",
                data: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage
            }

            if(sort){
                if(query){
                    response.prevLink = `/api/products?limit=${limit}&page=${products.page -1}&sort=${sort}&query=${query}`;
                    response.nextLink = `/api/products?limit=${limit}&page=${products.page +1}&sort=${sort}&query=${query}`;
                }else{
                    response.prevLink = `/api/products?limit=${limit}&page=${products.page -1}&sort=${sort}`;
                    response.nextLink = `/api/products?limit=${limit}&page=${products.page +1}&sort=${sort}`;
                }
            }else{
                if(query){
                    response.prevLink = `/api/products?limit=${limit}&page=${products.page -1}&query=${query}`;
                    response.nextLink = `/api/products?limit=${limit}&page=${products.page +1}&query=${query}`;
                }else{
                    response.prevLink = `/api/products?limit=${limit}&page=${products.page -1}`;
                    response.nextLink = `/api/products?limit=${limit}&page=${products.page +1}`;
                }
        }

        return res.status(200).json(response);
        }
        
    } catch (error) {
        return res.status(500).json({status: "error", message : error.message});
    }
});

productsRouter.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    
    try {
        const searchedProduct = await productManager.getProductById(id);

        if(searchedProduct){
            return res.status(200).json(searchedProduct);
        } else {
            return res.status(404).json({status: "error", error: "No se encontró el producto"});
        }

    } catch (error) {
        res.status(500).json({status: "error", error: "Hubo un error en el servidor"});
    }

})

productsRouter.post("/", async (req, res) => {

    try {
        const newProduct = req.body;
        let success = await productManager.addProduct(newProduct);

        if(success){
            res.status(201).json({status: "success", message: "Se agregó el producto correctamente", newProduct});
        }else{
            res.status(500).json({status: "error", error: "Hubo un error al agregar el producto"});
        }
    } catch (error) {      
        console.log(error)  
        res.status(500).json({status: "error", error: "Hubo un error en el servidor"});
    }
});

productsRouter.put("/:pid", async (req, res) => {
    const id = +req.params.pid;    
    const updatedProduct = req.body;

    try {
        await productManager.updateProduct(id, updatedProduct);
        res.status(200).json({status: "success", message: "El producto se actualizó correctamente"});

    } catch (error) {
        res.status(500).json({status: "error", error: "Hubo un error en el servidor"});
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    const id = +req.params.pid;
    
    try {
        await productManager.deleteProduct(id);
        res.status(200).json({status: "success", message: "Se eliminó el producto correctamente"});

    } catch (error) {
        res.status(500).json({status: "error", error: "Hubo un error en el servidor"});
    }
});


export default productsRouter;