import axios from 'axios'

export const getAllPosts = () => {
    return axios.get('http://localhost:3000/myblog/posts')
        .then((response) => {
            const { data } = response
            return data
        })
}