import { Schema, model } from "mongoose";

//Definicion de mi esquema de datos
const productSchema = new Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    stock: Number,
    code: String,
    status: Boolean,


    /* nombre: String,
    apellido: String,
    edad: Number,
    email: {
        type: String,
        unique: true
    },
    password: String */
})

export const productModel = model('products', productSchema)