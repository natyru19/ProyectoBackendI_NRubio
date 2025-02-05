import { Router } from "express";
import ProductManager from '../managers/product.manager.js';

const productsRouter = Router();
const productManager = new ProductManager();


productsRouter.get("/", async (req, res) => {
    const {limit=10, page=1, sort, query, id } = req.query;

    try {
        if(id){
            let product = await productManager.getProductById(id);

            if(product){
                return res.status(200).json({status: "success", message: `Producto con id: ${id} encontrado correctamente`, data: product});
            }            
            return res.status(404).json({status: "error", message: `No se encontró el producto con id: ${id}`, data: null});

        }else{
            const products = await productManager.getPaginatedProducts({limit: parseInt(limit),page: parseInt(page), sort, query});
            
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
        return res.status(500).json({status: "error", message: error.message});
    }
});

productsRouter.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    
    try {
        const searchedProduct = await productManager.getProductById(id);

        if(searchedProduct){
            return res.status(200).json({status: "success", message: `Producto con id: ${id} encontrado correctamente`, data: searchedProduct});
        } 
        return res.status(404).json({status: "error", message: `No se encontró el producto con id: ${id}`, data: null});

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }

})

productsRouter.post("/", async (req, res) => {

    try {
        const newProduct = req.body;
        const process = await productManager.addProduct(newProduct);

        if(process){
            return res.status(201).json({status: "success", message: "Se agregó el producto correctamente", data: process});
        }
        return res.status(400).json({status: "error", message: "Hubo un error al agregar el producto", data: null});

    } catch (error) {  
        return res.status(500).json({status: "error", message: error.message});
    }
});

productsRouter.put("/:pid", async (req, res) => {
    const id = req.params.pid;    
    const updatedProduct = req.body;

    try {
        const updatedProd = await productManager.updateProduct(id, updatedProduct);

        if(updatedProd){
            return res.status(200).json({status: "success", message: "El producto se actualizó correctamente", data: updatedProd});
        }
        return res.status(400).json({status: "error", message: "El producto no se actualizó", data: null});

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    
    try {
        const deletedProd = await productManager.deleteProduct(id);
        if(deletedProd){
            return res.status(200).json({status: "success", message: "Se eliminó el producto correctamente", data: deletedProd});
        }
        return res.status(400).json({status: "error", message: "El producto no se pudo eliminar", data: null});

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
});


export default productsRouter;