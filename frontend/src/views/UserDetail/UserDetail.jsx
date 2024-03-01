import { useState, useEffect } from 'react'
import Nav from '../../components/Nav/Nav'
import User from '../../components/User/User'
import { getUser } from '../../services/users/getUser'

const UserDetail = () => {

    const [user, setUser] = useState(null)
    const id = JSON.parse(window.localStorage.getItem('loggedUser')).id

    useEffect( () => {
        getUser(id)
        .then (user => {
            setUser(user)
        })
    }, [])

    if(!user) {
        <>
            <Nav/>
            <div className="alert alert-info" role="alert">
                Obteniendo datos del servidor
            </div>
        </>
    } else {
        return (
            <>
                <Nav/>
                <User user={user}/>
            </>
        )
    }
}

export default UserDetail