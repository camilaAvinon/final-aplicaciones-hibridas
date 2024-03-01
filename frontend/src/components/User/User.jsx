import React from 'react'
import { Link } from 'react-router-dom'

const User = ({user}) => {
    
    const {name, email} = user

    return (
        <>
            <h2 className="h3 text-info">Mi cuenta</h2>
            <div className="row">
                <div className="col my-4">
                    <p><span className='fw-bold'>Nombre</span> {name}</p>
                </div>
                <div className="col my-4">
                    <p><span className='fw-bold'>Correo electrónico</span> {email}</p>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <Link className="btn btn-outline-danger mx-1" to="/user/me/delete">Eliminar cuenta</Link>
                <Link className="btn btn-info mx-1" to="/user/me/edit">Editar mis datos</Link>
            </div>
        </>
    )
}

export default User