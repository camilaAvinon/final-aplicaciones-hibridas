import React from 'react'
import PostForm from '../../components/PostForm/PostForm'
import Nav from '../../components/Nav/Nav'

const CreatePost = () => {
  const token = JSON.parse(window.localStorage.getItem('loggedUser')).token

  return (
    <>
    <Nav/>
    <h2 className='h4'>Crear posteo</h2>
    <PostForm token={token}/>
    </>
  )
}

export default CreatePost