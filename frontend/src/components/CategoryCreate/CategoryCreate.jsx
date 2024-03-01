import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import createCategory from '../../services/categories/createCategory'

const CategoryCreate = ({token}) => {
    const [name, setName] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log('Creando la categoria')
            const categoryObject = {name}
            createCategory.createCategory(categoryObject, {token})
            .then((returnedCategory) => {
                navigate('/')

            }).catch(error => {
                if (error.message.includes('401')){
                    setError('Faltan datos')
                } console.log(error)
            })
        } catch(error){
            console.log(error)
        }
    }

    if (!error){
        return (
            <>
            <form onSubmit={handleSubmit} className='py-3'>
                <div className="m-2">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" name="name" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="my-4 d-flex justify-content-end">
                    <Link to="/" className='btn btn-outline-secondary mx-2'>Cancelar</Link>
                    <button type="submit" className='btn btn-info mx-2'>Crear</button>
                </div>
            </form>
            </>
        )
    } else {
        return (
            <>
            <form onSubmit={handleSubmit} className='p-3'>
                <div className="m-2">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" name="name" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
                    <p className="small text-danger">{error}</p>
                </div>
                <div className="my-4 d-flex justify-content-end">
                    <Link to="/" className='btn btn-outline-secondary mx-2'>Cancelar</Link>
                    <button type="submit" className='btn btn-info mx-2'>Crear</button>
                </div>
            </form>
            </>
        )
    }
}

export default CategoryCreate