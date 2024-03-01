import axios from 'axios'

export const deletePost = (id, {token}) => {

    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    return axios.delete('http://localhost:3000/myblog/posts/'+ id, config)
        .then((response) => {
            const { data } = response
            return data
    })
}