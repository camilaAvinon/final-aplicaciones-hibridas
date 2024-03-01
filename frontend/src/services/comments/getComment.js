import axios from 'axios'

export const getComment = (id) => {
    return axios.get('http://localhost:3000/myblog/comments/'+ id)
        .then((response) => {
            const { data } = response
            return data
        })
}