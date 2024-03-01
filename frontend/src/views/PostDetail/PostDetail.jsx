import React, {useState, useEffect} from 'react'
import DetailPost from '../../components/DetailPost/DetailPost'
import Nav from '../../components/Nav/Nav'
import CommentForm from '../../components/CommentForm/CommentForm'
import { getAllComments } from '../../services/comments/getAllComments'
import CommentList from '../../components/CommentList/CommentList'
import { useParams } from 'react-router-dom'

const PostDetail = () => {

    const [comments, setComments] = useState(null)
    const {id} = useParams()


    useEffect( () => {
        getAllComments()
        .then( comments => {
            setComments(comments.filter((comment) => comment.post == id))
        })
    }, [])

    if (!comments) {
        return (
            <>
                <Nav/>
                <DetailPost id={id}/>
                <CommentForm id={id}/>
            </>
        )
    } else {
        return (
            <>
                <Nav/>
                <DetailPost id={id}/>
                <CommentList comments={comments}/>
                <CommentForm id={id} comments={comments} setComments={setComments}/>
            </>
        )
    }

    
}

export default PostDetail