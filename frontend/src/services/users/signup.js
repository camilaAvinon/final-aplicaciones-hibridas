import axios from 'axios';

const signup = async credentials => {
    const {data} = await axios.post('http://localhost:3000/myblog/users', credentials)
    return data
}

export default signup