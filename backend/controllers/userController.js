const userModel = require('../models/userModel');
const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;

// Autenticar
exports.auth = async (req, res) => {
    try {
        const {body} = req;
        const {email, password} = body;
    
        const user = await userModel.findOne({email});
        const passwordCorrect = user == null
        ? false
        : await bcrypt.compare(password, user.password)
        
        if (!(user && passwordCorrect)){
            res.status(401).json({
                error: 'Invalid user or password'
            });
        } else {
            const userToken = {
                id: user._id,
                email: user.email
            }
        
            const token = jwt.sign(userToken, process.env.KEY)
        
            res.send({
                name: user.name,
                email: user.email,
                id: user._id,
                token
            });
        }
    } catch(error){
        console.error(error)
    }
}

// Crear
exports.create = async( req, res ) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password){
        res.status(401).json({
            error: 'Fields are missing'
        });
    } else if (typeof name !== 'string' || typeof email !== 'string') {
        res.status(403).json({error: 'Invalid data'})
    } else {
        const user = await userModel.findOne({email: email});
        if (user) {
            console.log(user)
            res.status(403).json({
                error: 'Email already in use'
            });
        } else {
            const passwordHash = await bcrypt.hash( password, salt);
            const user = new userModel({name, email, password: passwordHash});
            const newUser = await user.save();
            res.json(newUser);
        }
    }
}

// Editar
exports.update = async (req, res) => {
    const { userId } = req.params;
    const user = req.body;
    if (!userId || !user || !user.name || !user.email){
        res.status(403).json({
            error: 'Fields are missing'
        })
    } else if (typeof user.name !== 'string' || typeof user.email !== 'string') {
        res.status(403).json({error: 'Invalid data'})
    } else {
        newUserInfo = {
            name: user.name,
            email: user.email
        }
        userModel.findByIdAndUpdate(userId, newUserInfo, {new: true})
        .then(result => {
            res.json(result);
        }).catch(error => next(error));
    }
}

// Eliminar
exports.delete = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        res.status(403).json({
            error: 'Invalid data'
        })
    } else {
        await postModel.deleteMany({user: userId})
        await commentModel.deleteMany({user: userId})
        userModel.findByIdAndDelete(userId).then(() => {
            res.status(204).end()
        }).catch(error => next(error))
    }
}

// Llamar a todos
exports.call = async (req, res, next) => {
    userModel.find({}).populate('posts', {
        title: 1,
        body: 1,
        date: 1,
        created: 1,
        categoryId: 1
    })
    .then(users => {
        res.json(users);
    }).catch(error => next(error))
}

// Llamar por id
exports.callById = async (req, res, next) => {
    const { userId } = req.params;
    if (!userId) {
        res.status(403).json({
            error: 'Invalid data'
        })
    } else {
        userModel.findById(userId).then(user => {
            if (user){
                return res.json(user)
            } else {
                res.status(404).end()
            }
        }).catch(error => next(error))
    }
}