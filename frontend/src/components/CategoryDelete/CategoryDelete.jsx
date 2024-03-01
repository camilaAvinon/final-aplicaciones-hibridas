import React from 'react'
import { deleteCategory } from '../../services/categories/deleteCategory'
import { useNavigate } from 'react-router-dom'

const CategoryDelete = ({id}) => {
    
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    const {token} = user
    const navigate = useNavigate()

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            console.log('entre')
            deleteCategory(id.id, {token})
            .then(() => {
                console.log('se elimino')
                navigate('/category/create')
            })
        } catch (error){
            console.log(error)
        }
    }

    return (
        <div className='m-4'>
            <h2 className='text-center h3'>¿Estás seguro que querés eliminar la categoría?</h2>
            <div className='d-flex justify-content-center my-4'>
                <button className="m-1 btn btn-outline-info px-4 " onClick={() => navigate('/')}>No</button>
                <button className="m-1 btn btn-danger px-4" onClick={handleDelete}>Sí</button>
            </div>
        </div>
    )
}

export default CategoryDelete