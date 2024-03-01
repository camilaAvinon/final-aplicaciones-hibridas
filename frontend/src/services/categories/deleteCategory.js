import axios from 'axios'

export const deleteCategory = (id, {token}) => {

    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    return axios.delete('http://localhost:3000/myblog/categories/'+ id, config)
        .then((response) => {
            const { data } = response
            return data
    })
}