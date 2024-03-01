import React from 'react'
import { deleteComment } from '../../services/comments/deleteComment'
import { useNavigate } from 'react-router-dom'


const CommentDelete = ({id}) => {
    const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
    const navigate = useNavigate()

    const handleDelete = async (e) =>{
        e.preventDefault()
        try {
            deleteComment(id.id, {token})
            .then(() => {
                navigate('/')
            })
        } catch(error){
            console.error(error)
        }
    }

    return (
        <div className='m-4'>
            <h2 className='text-center h3'>¿Estás seguro que querés eliminar el comentario?</h2>
            <div className='d-flex justify-content-center my-4'>
                <button className="m-1 btn btn-outline-info px-4 " onClick={() => navigate('/')}>No</button>
                <button className="m-1 btn btn-danger px-4" onClick={handleDelete}>Sí</button>
            </div>
        </div>
    )
}

export default CommentDelete