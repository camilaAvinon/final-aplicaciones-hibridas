import React, {useState} from 'react'
import createComment from '../../services/comments/createComment'

const CommentForm = ({id, comments, setComments}) => {

    const [body, setBody] = useState('')
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedUser')))
    const [error, setError] = useState(null)

    const handleSubmit = (e)  => {
        e.preventDefault()
        setError(null)
        const token = user.token
        const email= user.email
        try {
            console.log('Creando el comentario')
            const commentObject = {body, email, post: id}
            createComment.createComment(commentObject, {token})
            .then((returnedComment) => {
                setBody('')
                setComments(comments.concat(returnedComment))
            }).catch(error => {
                if(error.message.includes('401')){
                    setError('Faltan datos')
                }
                console.error(error)
            })
        } catch (e) {
            console.error(e)
        }
    }

    if(!error){
        return (
            <form action="" className='form-floating my-3' onSubmit={handleSubmit}>
                <input type="text" className="form-control" id="comment" placeholder="name@example.com" value={body} onChange={(e) => setBody(e.target.value)}></input>
                <label htmlFor="comment" className='text-secondary'>Dejá tu comentario</label>
                <div className="d-flex justify-content-end">
                    <button type="submit" className='btn btn-info my-2'>Enviar</button>
                </div>
            </form>
        )
    } else {
        return (
            <form action="" className='form-floating my-3' onSubmit={handleSubmit}>
                <input type="text" className="form-control" id="comment" placeholder="name@example.com" value={body} onChange={(e) => setBody(e.target.value)}></input>
                <label htmlFor="comment" className='text-secondary'>Dejá tu comentario</label>
                <p className="small text-danger">{error}</p>
                <div className="d-flex justify-content-end">
                    <button type="submit" className='btn btn-info my-2'>Enviar</button>
                </div>
            </form>
        )
    }
}

export default CommentForm