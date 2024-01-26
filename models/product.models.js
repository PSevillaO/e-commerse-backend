const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({ //propiedades de la collection //barreras para cargar el usuario  
    imagen: {type: String, required: false, trim: true, },
    title: { type: String, required: true, minlength: 4, maxlenght: 60, trim: true, },
    info:{  type: String, required: true, minlength: 4, maxlenght: 60, trim: true,},
    descripcion: { type: String, required: true, minlength: 4, maxlenght: 60, trim: true, },
    dateCard: { type: Number, required: false, },
    price: { type: Number, required: true, min: 1, max: 10000000, },
    category: { type: String, required: true, minlength: 4, maxlenght: 60, trim: true}
});

module.exports = mongoose.model('Product', productSchema) 