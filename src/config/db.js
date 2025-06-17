const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conectado a la DB')
    } catch (error) {
        console.log('Error en la conexion a la DB: ', error.message)
    }
}



module.exports = connectDB