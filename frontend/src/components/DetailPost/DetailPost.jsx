import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from '../../services/posts/getPost'
import { Link } from 'react-router-dom'

const DetailPost = ({id}) => {
  const [post, setPost] = useState(null)
  
  useEffect( () => {
    getPost(id)
    .then(post => {
      setPost(post)
    })
  }, [])

  if (!post) {
    return (
    <>
      <div className="alert alert-info" role="alert">
        Obteniendo datos del servidor
      </div>
    </>)
  } else {
    return (
      <>
      <div className="card p-3">
        <div className="row my-2">
          <div className="col-9">
            <h2 className='text-info m-0'>{post.title}</h2>
          </div>
          <div className="col">
            <p className='bg-info p-2 text-center rounded fw-semibold text-light m-0'>{post.category.name}</p>
          </div>
        </div>
        <p>{post.body}</p>
        <p className="small"><span className='fw-semibold'>Autor:</span> {post.user.name}</p>
        <p className="small">{post.created}</p>
        <div className="row justify-content-end">
            <Link to={`/posts/${id}/delete`} className='btn btn-outline-danger mx-2 w-25'>Eliminar posteo</Link>
            <Link to={`/posts/${id}/update`} className='btn btn-info mx-2 w-25'>Editar posteo</Link>
        </div>
      </div>
      </>
    )
  }
}

export default DetailPost