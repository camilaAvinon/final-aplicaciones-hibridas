import { useEffect, useState } from 'react'
import createPost from '../../services/posts/createPost'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCategories } from '../../services/categories/getAllCategories'

const PostForm = ({token}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect( () => {
        getAllCategories()
        .then( categories => {
            setCategories(categories)
            setCategory(categories[0])
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            console.log('Creando el posteo')
            const postObject = {title, body, category}
            createPost.createPost(postObject, {token})
            .then(() => {
                setTitle('')
                setBody('')
                setCategory('')
                navigate('/')

            }).catch(error => {
                if (error.message.includes('401')){
                    setError('Faltan datos')
                } console.log(error)
            })
        } catch (error) {
            console.error(error)
        }
    }
    
    if (!error){
        return (
            <form onSubmit={handleSubmit} className="p-3">
                <div className="m-2">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input type="text" name="title" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="m-2">
                    <label htmlFor="body" className="form-label">Cuerpo</label>
                    <input type="text" name="body" id="body" className="form-control" value={body} onChange={(e) => setBody(e.target.value)}/>
                </div>
                <div className="m-2">
                    <label htmlFor="category" className="form-label">Categoría</label>
                    <select name="category" id="category" className="form-select" onChange={(e) => setCategory(e.target.value) }>
                        {
                            categories.map(category => <option value={category._id} key={category._id} >{category.name}</option>)
                        }
                    </select>
                </div>
                <div className="my-4 d-flex justify-content-end">
                        <Link to="/" className='btn btn-outline-secondary mx-2'>Cancelar</Link>
                    <button type="submit" className='btn btn-info mx-2'>Crear</button>
                </div>
            </form>
        )
    } else {
        return (
            <form onSubmit={handleSubmit} className="p-3">
                <div className="m-2">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input type="text" name="title" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="m-2">
                    <label htmlFor="body" className="form-label">Cuerpo</label>
                    <input type="text" name="body" id="body" className="form-control" value={body} onChange={(e) => setBody(e.target.value)}/>
                </div>
                <div className="m-2">
                    <label htmlFor="category" className="form-label">Categoría</label>
                    <select name="category" id="category" className="form-select" onChange={(e) => setCategory(e.target.value) }>
                        {
                            categories.map(category => <option value={category._id} key={category._id} >{category.name}</option>)
                        }
                    </select>
                </div>
                <p className="small text-danger">{error}</p>
                <div className="my-4 d-flex justify-content-end">
                        <Link to="/" className='btn btn-outline-secondary mx-2'>Cancelar</Link>
                    <button type="submit" className='btn btn-info mx-2'>Crear</button>
                </div>
            </form>
        )
    }

}

export default PostForm