import Post from "../Post/Post"

const PostList = ({posts}) => {
    
    if(!posts){
        return (
        <div className="alert alert-info" role="alert">
            Obteniendo datos del servidor
        </div>)
    } else {
        return (
            <div className="row gap-3 justify-content-between">
                {posts.map(post => <Post key={post._id} {...post}/>)}
            </div>
        )
    }    
}

export default PostList