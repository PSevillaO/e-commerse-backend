const jwt = require('jsonwebtoken');
const secret = 'PalabraSecreta123';

function jwtVerify(req, res, next){
    const token = req.headers.authorization;
    
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWM5MTc1OGJkNGZhZjJjZTAyOTFiOSIsIm5hbWUiOiJIYXNoIiwiZW1haWwiOiJoYXNzQGdtYWlsLmNvbSIsImFnZSI6MjUsInJvbGUiOiJVU0VSX1JPTEUiLCJfX3YiOjB9LCJpYXQiOjE3MDQ5MzIyMzcsImV4cCI6MTcwNDkzMjUzN30.gQTsSst-iQQdLyGMzWhWldFhm1-u11q_6lpyi1fZOrg' ;

    jwt.verify(token,secret, (error, payload )=> {
        // El token es incorrecto deberimos cortar a peticion 
        if(error){
            return res.status(401).send({
                ok:false,
                message: "No Tienes Autorizacion"
            })
        }
        // El token es correcto continuamos y agregamos el payload a mi request 
        req.user = payload.user;
        // continuamos hacia el controlador
        next();
    })
}

module.exports=jwtVerify;