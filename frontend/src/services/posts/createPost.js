import axios from 'axios'

const createPost = async (newObject, {token}) => {

    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const req = await axios.post('http://localhost:3000/myblog/posts', newObject, config)
    return req.data
}

export default {createPost}