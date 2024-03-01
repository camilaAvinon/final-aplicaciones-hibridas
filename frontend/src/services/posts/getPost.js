import axios from 'axios'

export const getPost = (id) => {
    return axios.get('http://localhost:3000/myblog/posts/'+ id)
        .then((response) => {
            const { data } = response
            return data
        })
}