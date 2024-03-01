const categoryModel = require('../models/categoryModel');

//Crear
exports.create = async (req, res, next)=> {
    try {
        const {name} = req.body;
        if (!name){
            res.status(401).json({error: 'Fields are missing'});
        } else if (typeof name !== 'string'){
            res.status(403).json({error: 'Invalid data'});
        } else {
            const newCategory = new categoryModel({name});
            await newCategory.save();
            res.json(newCategory);
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//Actualizar
exports.update = async (req, res, next) => {
    const { categoryId } = req.params;
    const category = req.body;
    if (!category || !category.name){
        res.status(401).json({
            error: 'Fields are missing'
        })
    } else if (typeof category.name !== 'string') {
        res.status(403).json({error: 'Invalid data'});
    } else {
        newCategoryInfo = {
            name: category.name
        }
        categoryModel.findByIdAndUpdate(categoryId, newCategoryInfo, {new: true})
        .then(result => {
            res.json(result);
        }).catch(error => next(error))
    }
}

//Eliminar
exports.delete = async (req, res, next) => {
    const { categoryId } = req.params
    try {
        categoryModel.findByIdAndDelete(categoryId).then(() => {
            res.status(204).end()
        }).catch(error => next(error))
    } catch (error){
        console.log(error)
    }
}

//Lamar a todos
exports.call = async (req, res, next) => {
    categoryModel.find({})
    .then(categories => {
        res.json(categories);
    }).catch(error => next(error))
    
}

//Llamar por id
exports.callById = async (req, res, next) => {
    const { categoryId } = req.params;
    categoryModel.findById(categoryId)
    .then(category => {
        if (category){
            return res.json(category)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
}