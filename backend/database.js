const mongoose = require('mongoose');

// Conexion con la base de datos
mongoose.connect( process.env.MONGO_DB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose.connection;