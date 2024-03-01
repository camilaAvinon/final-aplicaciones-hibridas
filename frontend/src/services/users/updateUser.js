import axios from 'axios'

const updateUser = async (newObject, {token}, id) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const req = await axios.put('http://localhost:3000/myblog/users/'+ id, newObject, config)
    return req.data
}

export default {updateUser}