import { createContext, useContext, useState } from "react";

const userContext = createContext()

const userProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        setUsuario(null);
    }
}