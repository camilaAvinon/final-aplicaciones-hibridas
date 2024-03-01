import axios from 'axios'

const createCategory = async (newObject, {token}) => {

    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const req = await axios.post('http://localhost:3000/myblog/categories', newObject, config)
    return req.data
}

export default {createCategory}