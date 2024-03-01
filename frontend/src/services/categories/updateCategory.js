import axios from 'axios'

const updateCategory = async (newObject, {token}, id) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const req = await axios.put('http://localhost:3000/myblog/categories/'+id, newObject, config)
    return req.data
}

export default {updateCategory}