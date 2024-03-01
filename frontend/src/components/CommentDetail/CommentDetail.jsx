import React from 'react'
import { Link } from 'react-router-dom'

const CommentDetail = ({_id, body, user}) => {
  const userId = JSON.parse(window.localStorage.getItem('loggedUser')).id
  if (userId == user._id){
    return (
      <div className='border-bottom border-info p-2 my-2 border-opacity-25'>
        <div className="row">
          <div className="col">
            <p className='m-0 py-1'>{body}</p>
            <p className="small text-secondary m-0 py-1">{user.name}</p>
          </div>
          <div className="col text-end">
            <Link className="btn btn-sm btn-info" to={`/comments/${_id}/edit`}>Editar</Link>
            <Link className="btn btn-sm btn-outline-danger" to={`/comments/${_id}/delete`}>Eliminar</Link>
          </div>
        </div>
      </div>
      )
    
  } else {
    return (
      <div className='border-bottom border-info p-2 my-2 border-opacity-25'>
      <p className='m-0 py-1'>{body}</p>
      <p className="small text-secondary m-0 py-1">{user.name}</p>
      </div>
    )
  }
  
}

export default CommentDetail