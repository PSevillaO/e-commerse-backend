const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = 'PalabraSecreta123'

async function getUsers(req, res) {
    try {
        const id = req.params.id;

        if (id) {
            const user = await User.findById(id ,{password: 0})
            if (!user) {
                return res.status(404).send({
                    ok: false,
                    message: "No se encontro el usuario"
                })
            }
            return res.send({
                ok: true,
                user,
                messege: "Usuario Encontrado"
            })
        }
        const users = await User.find()

        if(!users.length){
            return res.status(404).send({
                ok: false,
                messege: "Usuarioa No Encontrados"
            })
        }

        res.send({
            ok: true,
            users,
            message: "Usuarios Encontrados"
        })


    } catch (error) {
        res.status(500).send({
            ok: false,
            message: "No se pudo obtener el usuario"
        })
    }

    // res.send('GET Nuevo usuario');
}

async function createUser(req, res) {
    try {
        const user = new User(req.body)

        // encriptar contraseña
        user.password = await bcrypt.hash(user.password,saltRounds)


        const userSave = await user.save();
        userSave.password="********"

        res.status(201).send({
            ok: true,
            message: "Usuario Creado correctamente",
            user: userSave
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo crear el usuario"
        });
    }
}

async function deleteUser(req, res) {
    try {
        // comprobar que la persona que desea borrar es un admin

        console.log(req.User.role)
        
        if(req.user.role !== 'ADMIN_ROLE') {
            return res.status(401).send({
                ok: false,
                message: "No tienes permisos para realizar esta acción"
            })
        }
        const id = req.params.idUser

        const userDeleted = await User.findByIdAndDelete(id)

        if(!userDeleted){
            return res.status(404).send({
                ok:false,
                messege:"No se encontro el Usuario"
            })
        }


        res.send({
            ok: true,
            message: "Usuario Borrado Correctamente",
            user: userDeleted
        });
    } catch (error) {
        res.send(error);
    }
}

async function updateUser(req, res) {
    try {
        const id = req.params.idUser;
        const nuevosValores = req.body;

        const userUpdater = await User.findByIdAndUpdate(id, nuevosValores, { new: true })

        res.send({
            ok: true,
            message: "Usuario fue actuaizado Correctamente",
            user: userUpdater
        });

    } catch (error) {
        res.send({
            ok: false,
            message: "El usuario no se pudo actualizar"
        })
    }
}

async function login(req,res){
    try {

        //obtenemos del Body el email y el password
        const{password,email} = req.body;

        if(!password || !email){
            return res.status(400).send({
                ok: false,
                message:"Faltan Datos"
            }); 
        }

        const user = await User.findOne({email: email.toLowerCase()})

        if(!user ){
            return res.status(404).send({
                ok: false,
                message:"Datos Incorrectos"
            });
        }
        // Si existe el usuario verificar la contraseña
        const verifyUser = await bcrypt.compare(password, user?.password)

        // si el usuario no existe o la contraseña no es correcta 
        if(!verifyUser ){
            return res.status(404).send({
                ok: false,
                message:"Datos Incorrectos"
            });
        }
        
        user.password = undefined;

        // generar un token 
        const token = jwt.sign({user},secret,{expiresIn: '1h'})


        res.send({ 
            ok: true,
            message: "Login Correcto",
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message:"No se pudo hacer el Login"
        })
    }
}




module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    login
}