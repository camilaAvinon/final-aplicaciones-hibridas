import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {

    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedUser')))
    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault()
        try {
            setUser(null)
            window.localStorage.removeItem('loggedUser')
            navigate('/')
        } catch (error){
            console.log(error)
        }
    }

    if (!user) {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>MyBlog</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href={"/"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"login"}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/signup"}>Signup</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>MyBlog</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/user/me`}>Mi cuenta</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-danger" onClick={logout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
    
}

export default Nav