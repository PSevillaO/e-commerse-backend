// const { request } = require("../app");
const Category = require("../models/category.models")

async function getCategories(req, res) {
    try {
        const categories = await Category.find()

        res.send({
            ok: true,
            categories,
            message: "Categorias Encontradas"
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            ok: false,
            message: "Error del servidor"
        });
    }
}

async function createCategory(req, res) {
    try {
        const category = new Category(req.body);
        const categoryDB = await category.save();
        res.status(201).send({
            ok: true,
            category: categoryDB,
            message: "Categoria Creada"
        });

    } catch (error) {
        console.error(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo crear la Categoria"
        });
    }
}


module.exports = {
    getCategories,
    createCategory
}