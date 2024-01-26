const express = require('express');
const app = express();
const cors = require('cors')

const userRoutes = require('./routes/user.routes')
const productRoutes=require('./routes/product.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(userRoutes);
// app.use(productRoutes)

app.use([userRoutes,productRoutes]); //que app use las rutas definidas en userRoutes/productRoutes

module.exports = app;