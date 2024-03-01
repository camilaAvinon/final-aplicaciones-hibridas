import React, { useEffect, useState } from 'react'
import { getComment } from '../../services/comments/getComment'
import updateComment from '../../services/comments/updateComment'
import { useNavigate } from 'react-router-dom'

const CommentUpdate = ({id}) => {

    const [body, setBody] = useState('')
    const [comment, setComment] = useState(null)
    const [error, setError] = useState(null)
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    const navigate = useNavigate()
    
    useEffect ( () => {
        getComment(id.id)
        .then( comment => {
            setComment(comment)
            setBody(comment.body)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try{
            const {token, email} = user
            const newCommentInfo = {id:id.id, body, email, post:comment.post}
            updateComment.updateComment(newCommentInfo, {token}, id.id)
            .then(() => {
                navigate(`/posts/${comment.post}`)
            }).catch(error => {
                if (error.message.includes('401')){
                    setError('Faltan datos')
                }
                console.error(error)
            })
        }catch(error){
            console.error(error)
        }
    }

    if(!comment){
        return (
            <div className="alert alert-info" role="alert">
                Obteniendo datos del servidor
            </div>
        )
    } else {
        if(!error){
            return (
                <form action="" className='form-floating my-3' onSubmit={handleSubmit}>
                    <input type="text" className="form-control" id="comment" value={body} onChange={(e) => setBody(e.target.value)}></input>
                    <label htmlFor="comment" className='text-secondary'>Dejá tu comentario</label>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className='btn btn-info my-2'>Enviar</button>
                    </div>
                </form>
            )
        } else {
            return (
                <form action="" className='form-floating my-3' onSubmit={handleSubmit}>
                    <input type="text" className="form-control" id="comment" value={body} onChange={(e) => setBody(e.target.value)}></input>
                    <label htmlFor="comment" className='text-secondary'>Dejá tu comentario</label>
                    <p className="small text-danger">{error}</p>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className='btn btn-info my-2'>Enviar</button>
                    </div>
                </form>
            )
        }
    }
}

export default CommentUpdate