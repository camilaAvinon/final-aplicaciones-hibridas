import axios from 'axios'

const createComment = async (newObject, {token}) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const {data} = await axios.post('http://localhost:3000/myblog/comments', newObject, config)
    return data
}

export default {createComment}