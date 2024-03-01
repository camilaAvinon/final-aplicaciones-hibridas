import React, {useEffect, useState} from 'react'
import { getCategory } from '../../services/categories/getCategory'
import { Link, useNavigate } from 'react-router-dom'
import updateCategory from '../../services/categories/updateCategory'

const CategoryUpdate = ({id}) => {

    const [name, setName] = useState('')
    const [category, setCategory] = useState(null)
    const [error, setError] = useState(null)
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    const navigate = useNavigate()
    
    useEffect( () => {
        getCategory(id.id)
        .then(category => {
            setCategory(category)
            setName(category.name)
        })
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const {token} = user
            const newCategorytInfo = {id:id.id, name}
            updateCategory.updateCategory(newCategorytInfo, {token}, id.id)
            .then(() => {
                navigate(`/category/create`)
            }).catch(error => {
                if (error.message.includes('401')){
                    setError('Faltan datos')
                }
                console.error(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    if(!error){
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
                <form onSubmit={handleSubmit} className='py-3'>
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

export default CategoryUpdate