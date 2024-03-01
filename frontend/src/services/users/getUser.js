import axios from 'axios'

export const getUser = (id) => {
    return axios.get('http://localhost:3000/myblog/users/'+ id)
        .then((response) => {
            const { data } = response
            return data
        })
}