
const app = require('./app')
const mongoose = require('mongoose');

// mongodb+srv://sevillaolivieri:<password>@cluster0.inuyxe5.mongodb.net/
(async function dbConnect(){
    try {
        await mongoose.connect("mongodb+srv://sevillaolivieri:EHUH4wfpZuzvRgci@cluster0.inuyxe5.mongodb.net/ecommerce");
        console.log("Conexion correcta a la BD");
        app.listen(3000, ()=> {
            console.log('Server in port 3000')
        })
        
    } catch (error) {
        console.log(error)
    }
})()

// app.get('/', (req,res)=>{
    // console.log("endpoint llamado")
    // res.send("Hello Word")
// })

