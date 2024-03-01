import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPost } from '../../services/posts/getPost'
import { deletePost } from '../../services/posts/deletePost'

const DeletePost = () => {
    const [post, setPost] = useState(null)
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const [user, setUser] = useState(JSON.parse(loggedUserJSON) || null)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getPost(id)
        .then(returnedPost => {
            setPost(returnedPost)
        })
    }, [])


    const handleDelete = async (e) =>{
        e.preventDefault()
        try {
            const {token} = user
            deletePost(id, {token})
            .then(() => {
                navigate('/')
            })
        } catch(error){
            console.error(error)
        }
    }

    if(!post){
        return (
            <div className="alert alert-info" role="alert">
                Obteniendo datos del servidor
            </div>
        )
    } else {
        return (
            <div className='m-4'>
                <h2 className='text-center h3'>¿Estás seguro que querés eliminar el posteo: <span className='text-danger'>{post.title}</span>?</h2>
                <div className='d-flex justify-content-center my-4'>
                    <button className="m-1 btn btn-outline-info px-4 " onClick={() => navigate('/')}>No</button>
                    <button className="m-1 btn btn-danger px-4" onClick={handleDelete}>Sí</button>
                </div>
            </div>
        )
    }
}

export default DeletePost