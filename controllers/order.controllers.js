const Order = require("../models/order.models")

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
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo crear la orden"
        })
    }
}

async function getOrders(req, res) {
    try {
        if (req.user.role === 'ADMIN_ROLE') {
            const orders = await Order.find()
                .populate('user')
                .populate('products.productId')
            return res.status(200).send({
                ok: true,
                messege: "Ordener Enviadas correctamente",
                order: orders
            })
        }
        const orders = await Order.find({ userId: req.user._id }).populate('products.productId');

        return res.status(200).send({
            ok: true,
            messege: "Orden Enviada correctamente",
            order: orders
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo buscar las ordenes"
        })

    }
}

module.exports = {
    createOrder,
    getOrders
}