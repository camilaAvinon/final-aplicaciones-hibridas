import React from 'react'
import CategoryUpdate from '../../components/CategoryUpdate/CategoryUpdate'
import Nav from '../../components/Nav/Nav'
import { useParams } from 'react-router-dom'

const UpdateCategory = () => {

    const id= useParams()

  return (
    <>
    <Nav/>
    <CategoryUpdate id={id}/>
    </>
  )
}

export default UpdateCategory