import { createContext, useState } from "react";
import { dataInit } from "./data";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    //Estados de controle do estoque

    const [controle, setControle] = useState(dataInit)

    const gerenciarControle = (e, item) => {
        setControle((currentState) => {
            return { ...currentState, [item]: e }
        })
    }

    const iniciarControle = async (dados) => {
        const listaDados = Object.keys(dados) || []

        listaDados.forEach((key) => {
            gerenciarControle(dados[key], key)
        })

    }

    const value = {
        controle,
        gerenciarControle,
        iniciarControle
    }

    //Agrupamento das funções e states

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}