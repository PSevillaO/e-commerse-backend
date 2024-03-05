const express = require('express');
const app = express();
const cors = require('cors')

const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const orderRoutes = require('./routes/order.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'))

// app.use(userRoutes);
// app.use(productRoutes)

app.use([
    userRoutes,
    productRoutes,
    categoryRoutes,
    orderRoutes
]); //que app use las rutas definidas en userRoutes/productRoutes

module.exports = app;