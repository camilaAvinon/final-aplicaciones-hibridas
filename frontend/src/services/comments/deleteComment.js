import axios from 'axios'

export const deleteComment = (id, {token}) => {

    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    return axios.delete('http://localhost:3000/myblog/comments/'+ id, config)
        .then((response) => {
            const { data } = response
            return data
    })
}