import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser } from '../../services/users/getUser'
import updateUser from '../../services/users/updateUser'
import login from '../../services/users/login'


const UserUpdate = () => {

    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const id = JSON.parse(window.localStorage.getItem('loggedUser')).id
    const {token} = JSON.parse(window.localStorage.getItem('loggedUser')).token
    const navigate = useNavigate()

    useEffect( () => {
        getUser(id)
        .then (user => {
            setUser(user)
            setName(user.name)
            setEmail(user.email)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)
        try {
            console.log('Editando el usuario')
            user.name = name
            user.email = email
            updateUser.updateUser(user, {token}, id)
            .then(async(returnedUser) =>{
                const authUser = JSON.parse(window.localStorage.getItem('loggedUser'))
                authUser.email = returnedUser.email
                authUser.name = returnedUser.name
                window.localStorage.removeItem('loggedUser')
                window.localStorage.setItem('loggedUser', JSON.stringify(authUser))
                navigate('/user/me')  
            }).catch(error => {
                if (error.message.includes('403')){
                    setError('Faltan datos')
                }
                console.error(error)
            })
        } catch (error){
            console.error(error)
        }
    }

    if(!error){
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className='form-label'>Nombre</label>
                    <input type="text" className='form-control' value={name} name="name" id="name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="name" className='form-label'>Email</label>
                    <input type="email" className='form-control' value={email} name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='d-flex justify-content-end my-2'>
                    <Link type="submit" className='btn btn-outline-secondary mx-1' to="/user/me">Atrás</Link>
                    <button type="submit" className='btn btn-info mx-1'>Actualizar</button>
                </div>
            </form>
        )
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className='form-label'>Nombre</label>
                    <input type="text" className='form-control' value={name} name="name" id="name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="name" className='form-label'>Email</label>
                    <input type="email" className='form-control' value={email} name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <p className="small text-danger">{error}</p>
                <div className='d-flex justify-content-end my-2'>
                    <Link type="submit" className='btn btn-outline-secondary mx-1' to="/user/me">Atrás</Link>
                    <button type="submit" className='btn btn-info mx-1'>Actualizar</button>
                </div>
            </form>
        )
    }
}

export default UserUpdate