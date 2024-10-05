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

    const saveLocalStorage = (data) => {
        if (data) {
            window.localStorage.setItem("dados", JSON.stringify(data))
            return
        }
        window.localStorage.setItem("dados", JSON.stringify(controle))
    }

    const loadLocalStorage = async () => {
        const localData = JSON.parse(window.localStorage.getItem("dados"))
        if (localData) {
            await iniciarControle(localData)
        }
    }

    const iniciarControle = async (dados) => {
        if (dados) {
            const listaDados = Object.keys(dados)
            listaDados.forEach((key) => {
                console.log(dados[key])
                gerenciarControle(dados[key], key)
            })
        }
    }

    const value = {
        controle,
        gerenciarControle,
        iniciarControle,
        loadLocalStorage,
        saveLocalStorage
    }

    //Agrupamento das funções e states

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}