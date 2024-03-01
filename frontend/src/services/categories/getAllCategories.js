import axios from 'axios'

export const getAllCategories = () => {
    return axios.get('http://localhost:3000/myblog/categories')
        .then((response) => {
            const { data } = response
            return data
        })
}