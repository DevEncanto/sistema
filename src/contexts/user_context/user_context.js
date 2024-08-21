import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    //Estados de controle do estoque

    const [controle, setControle] = useState({})

    const gerenciarControle = (e, item) => {
        setControle((currentState) => {
            return { ...currentState, [item]: e.target.value }
        })
    }


    const value = {
        controle,
        gerenciarControle
    }



    //Agrupamento das funções e states

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}