import { useState } from 'react'
import login from '../../services/users/login'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({setUser}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const user = await login( {email, password} )
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUser(user)
            setEmail('')
            setPassword('')
            navigate('/')
        }catch(e){
            if (e.message.includes('401')){
                setError('Credenciales incorrectas')
            }
            console.error(e)
        }
    }

    if(error){
        return(
        <form onSubmit={handleLogin} className="p-3">
            <div className="m-2">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="m-2">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <p className="small text-danger">{error}</p>
            <div className="m-2 d-flex justify-content-end">
                <button type="submit" className="btn btn-info">Enviar</button>
            </div>
        </form>
        )
    }
    return (
        <form onSubmit={handleLogin} className="p-3">
            <div className="m-2">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="m-2">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="m-2 d-flex justify-content-end">
                <button type="submit" className="btn btn-info">Enviar</button>
            </div>
        </form>
    )
}

export default LoginForm