import axios from 'axios'

export const deleteUser = (id, {token}) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    return axios.delete('http://localhost:3000/myblog/users/'+ id, config)
        .then((response) => {
            const { data } = response
            return data
    })
}