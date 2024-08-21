import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    //Estados de controle do estoque

    const [user, setUser] = useState({})
    const [tab, setTab] = useState("resumo")
    const [insumo, setInsumo] = useState("")
    const [tabsEntrada, setTabsEntrada] = useState("tabela")

    const [formularioEntrada, setFormularioEntrada] = useState(initFormularioEntrada)
    const [formularioFornecedor, setFormularioFornecedor] = useState(initFormularioFornecedor)

    const calculoValores = (e, item) => {
        let total = 0
        let eParsed = e.target.value == "" ? 0 : parseFloat(e.target.value)

        setFormularioEntrada((currentState) => {
            return { ...currentState, [item]: e.target.value }
        })

        const { qtde_insumo, valor_unitario, descontos, parcelamento } = formularioEntrada
        const num1 = qtde_insumo == "" ? 0 : parseFloat(qtde_insumo)
        const num2 = valor_unitario == "" ? 0 : parseFloat(valor_unitario)
        const num3 = descontos == "" ? 0 : parseFloat(descontos)

        switch (item) {
            case "qtde_insumo": total = (eParsed * num2) - num3; break;
            case "valor_unitario": total = (num1 * eParsed) - num3; break;
            case "descontos": total = (num1 * num2) - eParsed; break;
        }

        setFormularioEntrada((currentState) => {
            return {
                ...currentState, valor_total: total
            }
        })
    }

    const alterarDados = (e, item) => {
        let data = e
        if (item !== "data_emissao" && item !== "data_recebimento") {
            data = e.target.value
        }
        setFormularioEntrada((currentState) => {
            return { ...currentState, [item]: data }
        })
    }
    const alterarDadosFornecedor = (e, item) => {
        setFormularioFornecedor((currentState) => {
            return { ...currentState, [item]: e.target.value }
        })
    }

    const parcelar = () => {

        let parcelamentos = []
        const { valor_total, parcelamento, data_emissao, prazo } = formularioEntrada

        const num1 = valor_total == "" ? 0 : parseFloat(valor_total)
        const num2 = parcelamento == "" ? 0 : parseFloat(parcelamento)
        const num3 = prazo == "" ? 0 : parseFloat(prazo)
        const data = converterDateParaString(data_emissao)


        for (let i = 0; i < num2; i++) {
            parcelamentos.push({
                id_parcela: i + 1,
                valor: num1 / num2,
                vencimento: calcularDatas(data, num3 * (i + 1))
            })
        }

        setFormularioEntrada((currentState) => {
            return { ...currentState, parcelamentos: [...parcelamentos] }
        })

    }

    const [admin, setAdmin] = useState({})
    const [mode, setMode] = useState("USER")
    const [chat, setChat] = useState(false)

    const loadAdmin = async () => {
        const localAdmin = JSON.parse(window.localStorage.getItem("admin"))
        if (localAdmin) {
            setAdmin(localAdmin)
        }
    }
    const loadUser = async () => {
        const userLocal = JSON.parse(window.localStorage.getItem("user"))
        if (userLocal) {
            setUser(userLocal)
        }
    }

    const value = {
        user,
        setUser,
        loadUser,
        admin,
        setAdmin,
        loadAdmin,
        mode,
        setMode,
        setChat,
        chat,
        tab,
        setTab,
        insumo,
        setInsumo,
        tabsEntrada,
        setTabsEntrada,
        formularioEntrada,
        setFormularioEntrada,
        alterarDados,
        calculoValores,
        parcelar,
        initFormularioEntrada,
        alterarDadosFornecedor,
        formularioFornecedor, 
        setFormularioFornecedor
    }



    //Agrupamento das funções e states

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}