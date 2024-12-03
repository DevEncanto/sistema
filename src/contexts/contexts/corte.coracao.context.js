import { createContext, useState } from "react";
import { cInitialize, dInitialize } from "../initialize/initialize.corte.coracao.context";
import { calcularDatas, converterDataCalendario, obterSemana, parseDate } from "../../utils/gerador-datas";
import { converterAno, converterDateParaString } from "../../utils/formatar-datas-createdAt";
import { logger } from "../../utils/logger";

export const CorteCoracaoContext = createContext();

export const CorteCoracaoProvider = ({ children }) => {

    //Estados de controle do estoque

    //cCorteCoracao = Controle Corte Coração
    const [cCorteCoracao, setCCorteCoracao] = useState(cInitialize)

    //dCorteCoracao = Dados Corte Coração
    const [dCorteCoracao, setDCorteCoracao] = useState(dInitialize)

    const gControleCorteCoracao = async (e, item, target = true) => {
        setCCorteCoracao((currentState) => {
            return { ...currentState, [item]: target ? e.target.value : e }
        })
    }
    const dControleCorteCoracaoSimple = (value, item, target = true) => {
        setDCorteCoracao((currentState) => {
            return { ...currentState, [item]: target ? value.target.value : value }
        })
    }

    const dControleCorteCoracaoComplex = (object, item, value, target = true) => {
        setDCorteCoracao((currentState) => {
            return {
                ...currentState, [object]: {
                    ...currentState[object], [item]: target ? value.target.value : value
                }
            }
        })
    }

    const exibirAlerta = (mensagem, tipo, retorno, time = 2500) => {
        gControleCorteCoracao(mensagem, "alert", false)
        gControleCorteCoracao(tipo, "type", false)
        gControleCorteCoracao("tab1", "tab", false)
        setTimeout(() => {
            gControleCorteCoracao("", "alert", false)
            gControleCorteCoracao("", "type", false)
            gControleCorteCoracao(retorno, "tab", false)
        }, time);
    };

    const validarDados = (dados) => {
        let validos = true
        const keys = Object.keys(dados)
        keys.forEach((key) => {
            console.log(`KEY: ${dados[key]}`)
            if (dados[key] === "") {
                validos = false
            }
        })
        return validos
    }

    const resetFormulario = (form) => {
        setDCorteCoracao((currentState) => {
            return { ...currentState, [form]: dInitialize[form] }
        })
    }

    const gerarPrevisao = (data, previsao_mensal = []) => {
        const dataString = converterDateParaString(data)
        const mes = parseDate(dataString).getMonth() + 1
        const semana_corte = obterSemana(dataString)
        const dias_previsao = previsao_mensal.find(item => item.mes === mes)?.dias ?? 0
        const data_prevista = converterDataCalendario(calcularDatas(dataString, dias_previsao))
        const semana_previsao = obterSemana(converterDateParaString(data_prevista))

        logger(data_prevista)


        gDadosCorteCoracao("lote_etiqueta", "data_corte", data, false)
        gDadosCorteCoracao("lote_etiqueta", "data_prevista", data_prevista, false)
        gDadosCorteCoracao("lote_etiqueta", "semana_corte", semana_corte, false)
        gDadosCorteCoracao("lote_etiqueta", "semana_colheita", semana_previsao, false)
        gDadosCorteCoracao("lote_etiqueta", "ano_corte", converterAno(data), false)
        gDadosCorteCoracao("lote_etiqueta", "ano_colheita", converterAno(data_prevista), false)
    }

    const gDadosCorteCoracao = (object, item, e, target = true) => {
        setDCorteCoracao((currentState) => {
            return {
                ...currentState, [object]: {
                    ...currentState[object], [item]: target ? e.target.value : e
                }
            }
        })
    }

    const funcoes = {
        gControleCorteCoracao: async (e, item, target = true) => { await gControleCorteCoracao(e, item, target) },
        gDadosCorteCoracao: (object, item, e, target = true) => { gDadosCorteCoracao(object, item, e, target) },
        gerarPrevisao: (data, previsao_mensal = []) => { gerarPrevisao(data, previsao_mensal) },
        atualizarEtiquetas: (object, item, e, target = true) => { atualizarEtiquetas(object, item, e, target) },
        validarDados: (dados) => { return validarDados(dados) },
        exibirAlerta: (mensagem, tipo, retorno = "", time = 2500) => { exibirAlerta(mensagem, tipo, retorno, time) },
        resetFormulario: (form) => { resetFormulario(form) },
        dControleCorteCoracaoComplex: (object, item, value, target = true) => { dControleCorteCoracaoComplex(object, item, value, target) },
        dControleCorteCoracaoSimple: (value, item, target = true) => { dControleCorteCoracaoSimple(value, item, target) }
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
                gControleCorteCoracao(dados[key], key)
            })
        }
    }

    const value = {
        cCorteCoracao,
        funcoes,
        dCorteCoracao
    }

    //Agrupamento das funções e states

    return (
        <CorteCoracaoContext.Provider value={value}>
            {children}
        </CorteCoracaoContext.Provider>
    )
}