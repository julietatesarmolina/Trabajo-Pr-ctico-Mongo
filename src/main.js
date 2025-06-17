const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')

const path = require('path')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')


const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())


const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const post_ImagesRouter = require('./routes/post_ImagesRoutes')
const tagRouter = require('./routes/tagRoutes')
const commentRouter = require('./routes/commentRoutes')

//rutas
app.use('/usuarios', userRouter)
app.use('/posts', postRouter)
app.use('/images', post_ImagesRouter)
app.use('/tags', tagRouter)
app.use('/comments', commentRouter)

//Configuracion del Swagger
const docSwagger = YAML.load(path.join(__dirname, '..', 'swagger.yaml'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docSwagger))


//Conexion a DB
connectDB()

app.listen(PORT, () =>{
    console.log(`la aplicacion esta corriendo en el puerto ${PORT}`)
    console.log(`Documentacion de la API (Swagger): http://localhost:${PORT}/api-docs`)
})
