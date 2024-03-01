import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from '../../services/users/deleteUser'

const UserDelete = () => {

  const id = JSON.parse(window.localStorage.getItem('loggedUser')).id
  const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
  const navigate = useNavigate()

  const handleDelete = async (e) =>{
    e.preventDefault()
    try {
        deleteUser(id, {token})
        .then(() => {
            navigate('/')
            window.localStorage.removeItem('loggedUser')
        }).catch(error => console.log(error))
    } catch(error){
        console.error(error)
    }
}

  return (
    <div className='m-4'>
        <h2 className='text-center h3'>¿Estás seguro que querés eliminar tu cuenta?</h2>
        <div className='d-flex justify-content-center my-4'>
            <button className="m-1 btn btn-outline-info px-4 " onClick={() => navigate('/user/me')}>No</button>
            <button className="m-1 btn btn-danger px-4" onClick={handleDelete}>Sí</button>
        </div>
    </div>
)
}

export default UserDelete