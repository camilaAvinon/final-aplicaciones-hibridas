import { Link } from "react-router-dom"

const Post = ({_id, title, user, category}) => {
    return(
        <div className="col-md-5">
            <div className="card p-3">
                <Link to={`/posts/${_id}`} className="h2 text-info text-decoration-none">{title}</Link>
                <p className="small">{category.name}</p>
                <p className="small">Escrito por: {user.name}</p>
            </div>
        </div>        
    )
}

export default Post