import axios from 'axios'

const updateComment = async (newObject, {token}, id) => {
    console.log(token)
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const req = await axios.put('http://localhost:3000/myblog/comments/'+id, newObject, config)
    return req.data
}

export default {updateComment}