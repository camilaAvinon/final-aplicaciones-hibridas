import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav'
import SignupForm from '../../components/SignupForm/SignupForm'

const Signup = () => {
    const [user, setUser] = useState(null)
    return (
        <>
            <Nav/>
            <h2 className='text-info h3'>Creá tu cuenta</h2>
            <SignupForm setUser={setUser}/>
        </>
    )
}

export default Signup