import { createContext, useState } from "react";

export const ControleCampoContext = createContext();

export const ControleCampoProvider = ({ children }) => {

    //Estados de controle do estoque

    //cCorteCoracao = Controle Corte Coração
    const [cControleCampo, setCControleCampo] = useState(cInitialize)

    //dCorteCoracao = Dados Corte Coração
    const [dControleCampo, setDControleCampo] = useState(dInitialize)

    const gControleCorteCoracao = async (e, item, target = true) => {
        setCControleCampo((currentState) => {
            return { ...currentState, [item]: target ? e.target.value : e }
        })
    }
    const dControleCorteCoracaoSimple = (value, item, target = true) => {
        setDControleCampo((currentState) => {
            return { ...currentState, [item]: target ? value.target.value : value }
        })
    }

    const dControleCorteCoracaoComplex = (object, item, value, target = true) => {
        setDControleCampo((currentState) => {
            return {
                ...currentState, [object]: {
                    ...currentState[object], [item]: target ? value.target.value : value
                }
            }
        })
    }

    // const exibirAlerta = (mensagem, tipo, retorno, time = 2500) => {
    //     gControleCorteCoracao(mensagem, "alert", false)
    //     gControleCorteCoracao(tipo, "type", false)
    //     gControleCorteCoracao("MOD1", "tab", false)
    //     setTimeout(() => {
    //         gControleCorteCoracao("", "alert", false)
    //         gControleCorteCoracao("", "type", false)
    //         gControleCorteCoracao(retorno, "tab", false)
    //     }, time);
    // };

    // const validarDados = (dados) => {
    //     let validos = true
    //     const keys = Object.keys(dados)
    //     keys.forEach((key) => {
    //         console.log(`KEY: ${dados[key]}`)
    //         if (dados[key] === "") {
    //             validos = false
    //         }
    //     })
    //     return validos
    // }

    // const resetFormulario = (form) => {
    //     setDCorteCoracao((currentState) => {
    //         return { ...currentState, [form]: dInitialize[form] }
    //     })
    // }

   
    // const gDadosCorteCoracao = (object, item, e, target = true) => {
    //     setDCorteCoracao((currentState) => {
    //         return {
    //             ...currentState, [object]: {
    //                 ...currentState[object], [item]: target ? e.target.value : e
    //             }
    //         }
    //     })
    // }

    const funcoes = {
        gControleCorteCoracao: async (e, item, target = true) => { await gControleCorteCoracao(e, item, target) },
        gDadosCorteCoracao: (object, item, e, target = true) => { gDadosCorteCoracao(object, item, e, target) },
        dControleCorteCoracaoComplex: (object, item, value, target = true) => { dControleCorteCoracaoComplex(object, item, value, target) },
        dControleCorteCoracaoSimple: (value, item, target = true) => { dControleCorteCoracaoSimple(value, item, target) }
    }

    const value = {
        cControleCampo,
        funcoes,
        dControleCampo
    }

    //Agrupamento das funções e states

    return (
        <ControleCampoContext.Provider value={value}>
            {children}
        </ControleCampoContext.Provider>
    )
}