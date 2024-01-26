const express = require('express');
const router = express.Router();
const jwtVerify = require('../middelwares/isAuth');


const userController = require('../controllers/user.controllers');
// const userController = require('./controllers/user.controllers');

// Busca todos los Usuario
// agrego un middewre de verificacion de token 
router.get('/users/:id?', userController.getUsers)

// Agregamos un usuario
router.post('/users', userController.createUser)

// Borramos un usuario
router.delete('/users/:idUser',jwtVerify, userController.deleteUser)
// Actualizamos un usuario

router.put('/users/:idUser', userController.updateUser)
// Buscamos un usuario especifico

router.post('/login',userController.login)


module.exports = router;