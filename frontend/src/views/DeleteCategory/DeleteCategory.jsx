import React from 'react'
import CategoryDelete from '../../components/CategoryDelete/CategoryDelete'
import { useParams } from 'react-router-dom'

const DeleteCategory = () => {

    const id = useParams()
    
  return (
    <div>
        <CategoryDelete id={id}/>
    </div>
  )
}

export default DeleteCategory