import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../../services/categories/getAllCategories'
import CategoryDetail from '../CategoryDetail/CategoryDetail'

const CategoryList = () => {
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        getAllCategories()
        .then(categories => {
            setCategories(categories)
        })
    }, [])

    if(!categories) {
        <div className="alert alert-info" role="alert">
            Obteniendo datos del servidor
        </div>
    } else {
        return (
            <>
            <div className="accordion" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed text-info fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Categorías actuales
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            {categories.map(category=> <CategoryDetail key={category._id} {...category}/>)}
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default CategoryList