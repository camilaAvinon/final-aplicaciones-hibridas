import axios from 'axios'

export const getAllComments = () => {
    return axios.get('http://localhost:3000/myblog/comments')
        .then((response) => {
            const { data } = response
            return data
        })
}