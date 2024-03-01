const postModel = require('../models/postModel');
const userModel = require('../models/userModel')

// Crear
exports.create = async(req, res, next) => {
    try {
        const {title, body, category} = req.body;
        const userId = req.userId;
        if (!title || !body || !category || !userId){
            res.status(401).json({
                error: 'Fields are missing'
            })
        } else if (typeof title !== 'string' || typeof body !== 'string') {
            res.status(403).json({error: 'Invalid data'})
        } else {
            const user = await userModel.findById(userId);
            if (user) {
                const newPost = new postModel({
                    title,
                    body,
                    user: userId,
                    category
                });
                const savedPost = await newPost.save();
                user.posts = user.posts.concat(savedPost._id);
                await user.save();
                res.json(savedPost);
            } else {
                res.status(403).json({error: 'User not found'})
            }
        }
    } catch(error){
        next(error);
    }
}

// Actualizar
exports.update = async(req, res, next) => {
    const { postId } = req.params;
    const post = req.body;
    if (!post || !post.title || !post.body || !post.category){
        res.status(401).json({
            error: 'Fields are missing'
        })
    } else if (typeof post.title !== 'string' || typeof post.body !== 'string') {
        res.status(403).json({error: 'Invalid data'})
    } else {
        newPostInfo = {
            title: post.title,
            body: post.body,
            category: post.category
        }
        postModel.findByIdAndUpdate(postId, newPostInfo, {new: true})
        .then(result => {
            res.json(result);
        }).catch(error => next(error))
    }
}

// Eliminar
exports.delete = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await postModel.findById(postId).populate('user')
        const user = await userModel.findById(post.user._id)
        if (!post || !user){
            res.status(403).json({
                error: 'Invalid data'
            })
        } else {
            user.posts.pull(postId)
            user.save()            
            postModel.findByIdAndDelete(postId).then(() => {
                res.status(204).end()
            }).catch(error => next(error))
        }            
    } catch (error) {
        console.log(error)
    }
}

// Llamar a todos
exports.call = async (req, res, next) => {
    postModel.find({}).populate('user', {
        name: 1,
        email: 1
    }).populate('category')
    .then(posts => {
        res.json(posts);
    }).catch(error => next(error))
}

// Llamar por id
exports.callById = async (req, res, next) => {
    const { postId } = req.params;
    postModel.findById(postId).populate('user', {
        name: 1
    }).populate('category')
    .then(post => {
        if (post){
            return res.json(post)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
}