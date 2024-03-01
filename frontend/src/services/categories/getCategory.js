import axios from 'axios'

export const getCategory = (id) => {
    return axios.get('http://localhost:3000/myblog/categories/'+ id)
        .then((response) => {
            const { data } = response
            return data
        })
}