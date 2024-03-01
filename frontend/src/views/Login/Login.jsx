import React, { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import Nav from '../../components/Nav/Nav'

const Login = () => {
  const [user, setUser] = useState(null)
  return (
    <div>
      <Nav/>
      <h2 className='text-info h3'>Ingresá a tu cuenta</h2>
      <LoginForm setUser={setUser}/>
    </div>
  )
}

export default Login
