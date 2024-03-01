import React from 'react'
import UpdatePost from '../../components/UpdatePost/UpdatePost'
import Nav from '../../components/Nav/Nav'

const PostUpdate = () => {
  return (
    <>
      <Nav/>
      <h2 className='h3 text-info'>Actualizando el posteo</h2>
      <UpdatePost/>
    </>
  )
}

export default PostUpdate