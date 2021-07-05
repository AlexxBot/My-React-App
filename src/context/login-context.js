import { createContext, useState } from "react";

export const LoginContext = createContext();

const userLoginInitial = {
    email: '',
    isLogged : false,
    token : ''
}

export const LoginProvider = ({children}) => {

    const [userLogin, setUserLogin] = useState(userLoginInitial)

    return(
        <LoginContext.Provider value={{
            userLogin,
            setUserLogin 
        }}> 
            { children }
        </LoginContext.Provider>
    )
}