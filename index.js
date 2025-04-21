require('dotenv').config(); 

const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS
const corsOptions = {
    origin: 'http://localhost:5173'
};
app.use(cors(corsOptions));


// parsear solicitudes con JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// middleware para validacion de errores de JSON
app.use(function(error, req, res, next) {
    if (error instanceof SyntaxError) {
        res.status(400).json({
            error: 'Error en el JSON'
        });
    } else {
        next()
    }
});


const db = require('./models');

db.sequelize.sync({
    //force: true // Borra y recrea la base de datos cada vez que se inicia el servidor
}).then(() => {
    console.log('Base de datos sincronizada')
});


require('./routes')(app)



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});