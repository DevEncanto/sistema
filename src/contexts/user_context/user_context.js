import { createContext, useState } from "react";
import delay from "../../utils/delay";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    //Estados de controle do usuário

    const [controle, setControle] = useState({})

    const gerenciarControle = (e, item) => {
        setControle((currentState) => {
            return { ...currentState, [item]: e.target.value }
        })
    }

    const statusLogin = async (message, type) => {
        gerenciarControle(type, "alert", false)
        gerenciarControle(message, "message", false)
        await delay(4500)
        gerenciarControle("", "message", false)
    }

    const value = {
        controle,
        gerenciarControle,
        statusLogin
    }



    //Agrupamento das funções e states

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}