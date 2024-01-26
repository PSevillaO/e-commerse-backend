const Product = require('../models/product.models');


async function getProduct(req, res) {
    try {
        const id = req.params.id;

        if (id) {
            const product = await Product.findById(id)
            if (!product) {
                return res.status(404).send({
                    ok: false,
                    message: "No se encontro el producto"
                })
            }
            return res.send({
                ok: true,
                product,
                messege: "Producto Encontrado"
            })
        }
        const products = await Product.find()

        if(!products.length){
            return res.status(404).send({
                ok: false,
                messege: "Productos No Encontrados"
            })
        }

        res.send({
            ok: true,
            products,
            message: "Productos Encontrados"
        })


    } catch (error) {
        res.status(500).send({
            ok: false,
            message: "No se pudo obtener el Producto"
        })
    }

    // res.send('GET Nuevo usuario');
}

async function createProduct(req, res) {
    try {
        const product = new Product(req.body)

        const prodcutSave = await product.save();

        res.status(201).send({
            ok: true,
            message: "Producto Creado correctamente",
            product: prodcutSave
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo crear el producto"
        });
    }
}

async function deleteProduct(req, res) {
    try {
        // comprobar que la persona que desea borrar es un admin

        // console.log(req.User.role)
        
        // if(req.user.role !== 'ADMIN_ROLE') {
            // return res.status(401).send({
                // ok: false,
                // message: "No tienes permisos para realizar esta acción"
            // })
        // }
        const id = req.params.id

        const productDeleted = await Product.findByIdAndDelete(id)

        if(!productDeleted){
            return res.status(404).send({
                ok:false,
                messege:"No se encontro el Producto"
            })
        }
        res.send({
            ok: true,
            message: "Producto Borrado Correctamente",
            product: productDeleted
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            message: "No se pudo borrar el producto"
        });
    }
}


async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const nuevosValores = req.body;

        const productUpdater = await User.findByIdAndUpdate(id, nuevosValores, { new: true })

        res.send({
            ok: true,
            message: "Producto fue actuaizado Correctamente",
            product: productUpdater
        });

    } catch (error) {
        res.send({
            ok: false,
            message: "El producto no se pudo actualizar"
        })
    }
}




module.exports = {
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
}