import React, {useState} from 'react'
import signup from '../../services/users/signup'
import { useNavigate } from 'react-router-dom'

const SignupForm = ({setUser}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const user = await signup( {name, email, password} )
            setUser(user)
            setName('')
            setEmail('')
            setPassword('')
            navigate('/login')
        } catch (error) {
            if (error.message.includes('401')){
                setError('Faltan datos')
            } else if (error.message.includes('403')){
                setError('Ya hay un usuario registrado con este correo electrónico')
            }
            console.error(error)
        }
    }

    if(!error) {
        return (
            <form onSubmit={handleSignup} className="p-3">
                <div className="m-2">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="m-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="m-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="m-2 d-flex justify-content-end">
                    <button type="submit" className="btn btn-info">Signup</button>
                </div>
            </form>
        )
    } else {
        return (
            <form onSubmit={handleSignup} className="p-3">
                <div className="m-2">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="m-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="m-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <p className="small text-danger">{error}</p>
                <div className="m-2 d-flex justify-content-end">
                    <button type="submit" className="btn btn-info">Signup</button>
                </div>
            </form>
        )

    }
}

export default SignupForm