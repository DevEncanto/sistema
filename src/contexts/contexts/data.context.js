import { createContext, useState } from "react";
import { dInitialize } from "../initialize/initialize.data.context";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    //Estados de controle do estoque
    //dData = "d" de DataProvider e Data, de Dados seguindo p padrão Camel Case
    const [dData, setDData] = useState(dInitialize)

    const dControleS = (item, value, target = true) => {
        setDData((currentState) => {
            return { ...currentState, [item]: target ? value.target.value : value }
        })
    }

    const dControleC= (object, item, value, target = true) => {
        setDData((currentState) => {
            return {
                ...currentState, [object]: {
                    ...currentState[object], [item]: target ? value.target.value : value
                }
            }
        })
    }

    const saveLocalStorage = () => {
        window.localStorage.setItem("dados", JSON.stringify(dData))
    }

    const loadLocalStorage = async () => {
        const localData = JSON.parse(window.localStorage.getItem("dados"))
        setDData(localData)
    }

    const funcoes = {
        loadLocalStorage: () => { loadLocalStorage() },
        saveLocalStorage: () => { saveLocalStorage() },
        dControleC: (object, item, value, target = true) => {
            dControleC(object, item, value, target)
        },
        dControleS: (item, value, target = true) => {
            dControleS(item, value, target)
        }
    }

    const value = {
        dData,
        funcoes
    }

    //Agrupamento das funções e states

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}