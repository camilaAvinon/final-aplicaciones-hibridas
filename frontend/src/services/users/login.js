import axios from 'axios';

const login = async credentials => {
    const {data} = await axios.post('http://localhost:3000/myblog/users/authentication', credentials)
    return data
}

export default login