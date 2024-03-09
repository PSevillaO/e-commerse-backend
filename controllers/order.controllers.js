const Order = require("../models/order.models")
const User = require('../models/user.models');

async function createOrder(req, res) {
    try {

        const order = new Order(req.body)
        const orderDB = await order.save();
        return res.status(200).send({
            ok: true,
            messege: "Order Creada correctamente",
            order: orderDB
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo crear la orden"
        })
    }
}

async function getOrders(req, res) {
    try {
        // Obtener el ID de usuario desde los parámetros de la solicitud
        const userId = req.params.userId;

        // Verificar si se proporcionó un ID de usuario válido
        if (!userId) {
            return res.status(400).send({
                ok: false,
                message: "No se proporcionó un ID de usuario válido en la solicitud"
            });
        }

        // Obtener el usuario desde la base de datos
        const user = await User.findById(userId);

        // Verificar si se encontró el usuario y obtener su rol
        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "No se encontró ningún usuario con el ID proporcionado"
            });
        }

        const userRole = user.role;

        // Inicializar una variable para almacenar las órdenes
        let orders;

        // Determinar la búsqueda de órdenes basada en el rol del usuario
        if (userRole === 'ADMIN_ROLE') {
            orders = await Order.find()
                .populate('user')
                .populate('products.productId');
        } else {
            orders = await Order.find({ user: userId })
                .populate('products.productId');
        }

        // Verificar si se encontraron órdenes
        if (orders && orders.length > 0) {
            return res.status(200).send({
                ok: true,
                message: "Órdenes obtenidas correctamente",
                orders: orders
            });
        } else {
            return res.status(404).send({
                ok: false,
                message: "No se encontraron órdenes para el usuario con ID: " + userId
            });
        }
    } catch (error) {
        console.error('Error al buscar órdenes:', error);
        return res.status(500).send({
            ok: false,
            message: "No se pudo buscar las órdenes",
            error: error.message
        });
    }
}


module.exports = {
    createOrder,
    getOrders
}