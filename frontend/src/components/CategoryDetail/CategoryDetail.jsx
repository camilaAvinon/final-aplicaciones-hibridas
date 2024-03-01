import React from 'react'
import { Link } from 'react-router-dom'

const CategoryDetail = ({name, _id}) => {
    return (
        <div className='row border-bottom border-info p-2 my-2 border-opacity-25'>
            <div className="col">
                <p>{name}</p>
            </div>
            <div className="col text-end">
                <Link className="btn btn-sm btn-outline-danger" to={`/category/${_id}/delete`}>Eliminar</Link>
                <Link className="btn btn-sm btn-info" to={`/category/${_id}/edit`}>Editar</Link>
            </div>
        </div>
    )
}

export default CategoryDetail