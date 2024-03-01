import React, {useEffect, useState} from 'react'
import { getPost } from '../../services/posts/getPost'
import {Link, useNavigate, useParams } from 'react-router-dom'
import updatePost from '../../services/posts/updatePost'
import { getAllCategories } from '../../services/categories/getAllCategories'

const UpdatePost = () => {
  const {id} = useParams()
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [post, setPost] = useState(null) 
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  const [user, setUser] = useState(JSON.parse(loggedUserJSON) || null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()


  useEffect( () => {
    getPost(id)
    .then(post => {
      setPost(post)
      setTitle(post.title)
      setBody(post.body)
      setCategory(post.category._id)
    })
  }, [])

  useEffect( () => {
    getAllCategories()
    .then(categories => {
      setCategories(categories)
    }, [])
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
        console.log('Editando el posteo')
        post.title = title
        post.body = body
        post.category = category
        const {token} = user
        updatePost.updatePost(post, {token}, id)
        .then((returnedPost) => {
          navigate('/')
          console.log(returnedPost)
        }).catch(error => {
          if (error.message.includes('401')){
            setError('Faltan datos')
          }
          console.error(error)
        })
    } catch (error) {
        console.error(error)
    }
}

if (!post) {
  return (
    <div className="alert alert-info" role="alert">
      Obteniendo datos del servidor
    </div>
  )
} else if (!error){
  return (
    <>
      <form onSubmit={handleSubmit} className='p-3'>
        <div className="m-2">
            <label htmlFor="title" className='form-label'>Title</label>
            <input className='form-control' type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="m-2">
            <label htmlFor="body" className='form-label'>Body</label>
            <input className='form-control' type="text" name="body" id="body" value={body} onChange={(e) => setBody(e.target.value)}/>
        </div>
        <div className="m-2">
                <label htmlFor="body" className='form-label'>Categoría</label>
                <select name="category" id="category" className="form-select" defaultValue={category} onChange={(e) => setCategory(e.target.value)}>
                    {
                        categories.map(category => <option value={category._id} key={category._id} >{category.name}</option>)
                    }
                </select>
            </div>
        <div className="m-2 d-flex justify-content-end">
            <Link to="/" className="btn btn-outline-secondary mx-2">Cancelar</Link>
            <button type="submit" className='btn btn-info mx-2'>Actualizar</button>
        </div>
      </form>
    </>
  )
} else {
  return (
    <>
      <form onSubmit={handleSubmit} className='p-3'>
        <div className="m-2">
            <label htmlFor="title" className='form-label'>Title</label>
            <input className='form-control' type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="m-2">
            <label htmlFor="body" className='form-label'>Body</label>
            <input className='form-control' type="text" name="body" id="body" value={body} onChange={(e) => setBody(e.target.value)}/>
        </div>
        <div className="m-2">
                <label htmlFor="body" className='form-label'>Categoría</label>
                <select name="category" id="category" className="form-select" defaultValue={category} onChange={(e) => setCategory(e.target.value)}>
                    {
                        categories.map(category => <option value={category._id} key={category._id} >{category.name}</option>)
                    }
                </select>
            </div>
            <p className="small text-danger">{error}</p>
        <div className="m-2 d-flex justify-content-end">
            <Link to="/" className="btn btn-outline-secondary mx-2">Cancelar</Link>
            <button type="submit" className='btn btn-info mx-2'>Actualizar</button>
        </div>
      </form>
    </>
  )
}
}

export default UpdatePost