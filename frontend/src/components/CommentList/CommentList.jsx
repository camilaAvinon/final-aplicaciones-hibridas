import React from 'react'
import CommentDetail from '../CommentDetail/CommentDetail'

const CommentList = ({comments}) => {

    return (
    <div className='my-4 border-top border-info border-opacity-50'>
        {comments.map((comment) => <CommentDetail key={comment._id} {...comment}/>)}
    </div>
    )
}

export default CommentList
