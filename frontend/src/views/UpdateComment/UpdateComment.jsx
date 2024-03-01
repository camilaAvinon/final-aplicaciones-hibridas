import React from 'react'
import Nav from '../../components/Nav/Nav'
import CommentUpdate from '../../components/CommentUpdate/CommentUpdate'
import { useParams } from 'react-router-dom'

const UpdateComment = () => {

  const id = useParams()

  return (
    <>
    <Nav/>
    <CommentUpdate id={id}/>
    </>
  )
}

export default UpdateComment