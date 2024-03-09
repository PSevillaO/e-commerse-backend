const express = require('express');
const router = express.Router();
const jwtVerify = require('../middelwares/isAuth');

const orderControllers = require('../controllers/order.controllers')

router.post('/orders', orderControllers.createOrder)

router.get('/orders/:userId?', orderControllers.getOrders)



module.exports = router