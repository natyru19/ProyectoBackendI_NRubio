import mongoose from "mongoose";

mongoose.connect("mongodb+srv://nataliarubio:coderhouse@cluster0.ztm42.mongodb.net/ProyectoBackendI?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Se conectó a la BD exitosamente"))
    .catch((error) => console.log("Tenemos un error: " + error))