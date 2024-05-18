import mongoose from "mongoose";
const userSchema = mongoose.Schema(
    {
        nombre:{
            type: String,
            required: true
        },
        clave:{
            type: String,
            required: true
        }
    },
    {
        //poner los datos de la fecha y demas
        timestamps:true
    }
)

export const Usuario = mongoose.model('Usuario', userSchema)