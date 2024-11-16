import { createContext, useState } from "react";
import { dInitialize } from "../initialize/initialize.data.context";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    //Estados de controle do estoque

    const [dData, setDData] = useState(dInitialize)

    const dControleDataSimple = (item, value, target = true) => {
        setDData((currentState) => {
            return { ...currentState, [item]: target ? value.target.value : value }
        })
    }

    const dControleDataComplex = (object, item, value, target = true) => {
        setDData((currentState) => {
            return {
                ...currentState, [object]: {
                    ...currentState[object], [item]: target ? value.target.value : value
                }
            }
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

    const funcoes = {
        loadLocalStorage: () => { loadLocalStorage() },
        saveLocalStorage: (data) => { saveLocalStorage(data) },
        dControleDataComplex: (object, item, value, target = true) => {
            dControleDataComplex(object, item, value, target)
        },
        dControleDataSimple: (item, value, target = true) => {
            dControleDataSimple(item, value, target)
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