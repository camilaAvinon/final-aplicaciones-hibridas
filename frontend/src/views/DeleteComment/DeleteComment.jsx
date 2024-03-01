import React from 'react'
import Nav from '../../components/Nav/Nav'
import CommentDelete from '../../components/CommentDelete/CommentDelete'
import { useParams } from 'react-router-dom'

const DeleteComment = () => {

  const id = useParams()

  return (
    <div>
        <Nav/>
        <CommentDelete id={id}/>
    </div>
  )
}

export default DeleteComment