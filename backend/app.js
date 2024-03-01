require ('dotenv').config();
const express = require('express');
const dataBase = require('./database.js');
const cors = require('cors')
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const commentController = require('./controllers/commentController');
const categoryController = require('./controllers/categoryController');
const notFound = require('./middleware/notFound.js');
const handleErrors = require('./middleware/handleErrors.js');
const validatingToken = require('./middleware/validatingToken.js');
const app = express();
const port = process.env.PORT;
const key =  process.env.KEY;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use(cors());
app.use(express.json());

// Conexión con la BDD
dataBase.on( 'error', () => {
    console.error('Error de conexion con la base de datos.')
});
dataBase.once( 'open', ()=> {
    console.log('Conexión con la base de datos exitosa.');
});

// Rutas
app.get('/', (req, res) => {
    res.send('<h1>Api Blog</h1>');
});

//Ruta autenticación
app.post('/myblog/users/authentication', userController.auth);

//Rutas usuarios
app.get('/myblog/users', userController.call);
app.get('/myblog/users/:userId', userController.callById);
app.post('/myblog/users', userController.create);
// Rutas protegidas de usuarios
app.put('/myblog/users/:userId', validatingToken, userController.update);
app.delete('/myblog/users/:userId', validatingToken, userController.delete);

//Rutas posteos
app.get('/myblog/posts', postController.call);
app.get('/myblog/posts/:postId', postController.callById);

// Rutas protegidas de posteos
app.post('/myblog/posts', validatingToken, postController.create);
app.put('/myblog/posts/:postId', validatingToken, postController.update);
app.delete('/myblog/posts/:postId', validatingToken, postController.delete);

//Rutas comentarios
app.get('/myblog/comments', commentController.call);
app.get('/myblog/comments/:commentId', commentController.callById);

// Rutas protegidas de comentarios
app.post('/myblog/comments', validatingToken, commentController.create);
app.put('/myblog/comments/:commentId', validatingToken, commentController.update);
app.delete('/myblog/comments/:commentId', validatingToken, commentController.delete);

//Rutas categorias
app.get('/myblog/categories', categoryController.call);
app.get('/myblog/categories/:categoryId', categoryController.callById);

// Rutas protegidas de categorias
app.post('/myblog/categories', validatingToken, categoryController.create);
app.put('/myblog/categories/:categoryId', validatingToken, categoryController.update);
app.delete('/myblog/categories/:categoryId', validatingToken, categoryController.delete);

app.use(notFound)
app.use(handleErrors)

app.listen( port, () => {
    console.log('Servidor en el puerto: ', port);
});