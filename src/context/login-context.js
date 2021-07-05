import { createContext, useState } from "react";

export const LoginContext = createContext();

const usserLoginInitial = {
    email: '',
    isLogged : false,
    token : ''
}

export const LoginProvider = ({children}) => {

    const [userLogin, setUserLogin] = useState(usserLoginInitial)

    return(
        <LoginContext.Provider value={{
            userLogin,
            setUserLogin 
        }}> 
            { children }
        </LoginContext.Provider>
    )
}