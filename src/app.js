import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PUERTO = 8080;



// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware incorporado (archivos estáticos)
app.use("/static", express.static("src/public"));

// Rutas

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


// La app escuchando en el puerto 8080 (el que se le indica)

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
})