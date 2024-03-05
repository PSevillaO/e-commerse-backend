const express = require('express');
const router = express.Router();
const jwtVerify = require('../middelwares/isAuth');
const categoryControllers = require('../controllers/category.controllers')

// const { routes } = require('../app');

router.get('/categories', categoryControllers.getCategories)

router.post('/categories', categoryControllers.createCategory)


module.exports = router;