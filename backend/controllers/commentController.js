const commentModel = require('../models/commentModel');
const userModel = require('../models/userModel')

// Crear
exports.create = async(req, res, next) => {
    try {
        const {body, email, post} = req.body;
        const user = await userModel.findOne({email:email});
        if (!body || !user){
            res.status(401).json({
                error: 'Fields are missing'
            });
        } else if(typeof body !== 'string'){
            res.status(403).json({
                error: 'Invalid data'
            })
        } else {
            const newComment = new commentModel({
                body,
                user: user._id,
                post
            });
            const savedComment = await newComment.save();
            res.json(savedComment);
        }
    } catch(error){
        next(error);
    }
}

// Actualizar
exports.update = async (req, res, next) => {
    const { commentId } = req.params
    const comment = req.body
    if (!comment || !comment.body || !comment.email || !comment.post){
        res.status(403).json({
            error: 'Fields are missing'
        })
    } else if (typeof comment.body !== 'string') {
        // console.log(typeof comment.body)
        res.status(403).json({error: 'Invalid data'})
    }else {
        newCommentInfo = {body: comment.body}
        commentModel.findByIdAndUpdate(commentId, newCommentInfo, {new: true})
        .then( result => {
            res.json(result)
        }).catch(error => next(error))
    }
}

// Eliminar
exports.delete = async (req, res, next) => {
    const { commentId } = req.params;
    try {
        const comment = await commentModel.findByIdAndDelete(commentId).then(() => {
            res.status(204).end()
        }).catch(error => next(error))
    } catch (error) {
        console.log(error);
        res.status(500).json( { msg: 'Error en el servidor.' });
    }
}

// Llamar a todos
exports.call = async (req, res, next) => {
    commentModel.find({}).populate('user', {
        name: 1
    })
    .then(comments => {
        res.json(comments);
    }).catch(error => next(error))
}

// Llamar por id
exports.callById = async (req, res, next) => {
    const { commentId } = req.params
    commentModel.findById(commentId)
    .then(comment => {
        if (comment){
            return res.json(comment)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
}