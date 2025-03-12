import { createContext, useState } from "react";
import delay from "../../utils/delay";
import { useRouter } from "next/navigation";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    //Estados de controle do usuário

    const [uControle, setUControle] = useState({})
    const router = useRouter()

    const gerenciarControle = (e, item, target = true) => {
        setUControle((currentState) => {
            return { ...currentState, [item]: target ? e.target.value : e }
        })
    }

    const statusLogin = async (message, type) => {
        gerenciarControle(type, "alert", false)
        gerenciarControle(message, "message", false)
        await delay(4500)
        gerenciarControle("", "message", false)
    }

    const value = {
        uControle,
        router,
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