import mongoose from "mongoose";
import express from "express";
import { MONGO_URL, PORT } from "./config.js";
import { Usuario } from "./modelos/usuarioModelo.js";

const app = express();
app.use(express.json());

//crear rutas para guardar
app.post('/registrar', async(solicitud, respuesta)=>{
    try {
        let {nombre, clave} = solicitud.body;
        if(!nombre || !clave){
            return respuesta.status(400).send('Se necesitan todos los campos')
        }
        //validar si existe el usuario
        const existeUsuario = await Usuario.findOne({nombre})
        if(existeUsuario){
            return respuesta.status(200).send({message: 'El ususario ya existe'})
        }else{
            const user = await Usuario.create({nombre, clave})
            return respuesta.status(201).send(user)
        }
    } catch (error) {
        console.log(error);
        return respuesta.status(500).send({message:error.message})
    }
})

//coneccion a la base de datos
mongoose.connect(MONGO_URL)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`App arriba en el puerto ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })