import { createContext, useState } from "react";
import { initControle } from "./data";
import { initFormularioEntrada, initFormularioFornecedor } from "../data";
import { converterDateParaString } from "../../utils/formatar-datas-createdAt";
import { calcularDatas } from "../../utils/gerador-datas";

export const EstoqueContext = createContext();

export const EstoqueProvider = ({ children }) => {

    //Estados de controle do estoque

    const [controle, setControle] = useState(initControle)
    const [formularioEntrada, setFormularioEntrada] = useState(initFormularioEntrada)
    const [formularioFornecedor, setFormularioFornecedor] = useState(initFormularioFornecedor)

    const gerenciarControle = (e, item, target = true) => {
        setControle((currentState) => {
            return { ...currentState, [item]: target ? e.target.value : e }
        })
    }

    const exibirAlerta = (mensagem, tipo) => {
        gerenciarControle(mensagem, "alert", false)
        gerenciarControle(tipo, "type", false)
        setTimeout(() => {
            gerenciarControle("", "alert", false)
            gerenciarControle("", "type", false)
        }, 2500);
    };

    const validarCampo = (campo, mensagem) => {
        if (campo === null || campo === undefined || campo === "") {
            exibirAlerta(mensagem, "warning");
            return false;
        }
        return true;
    }


    const funcoes = {
        calculoValores: (e, item) => {
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
        },
        alterarDados: (e, item) => {
            let data = e
            if (item !== "data_emissao" && item !== "data_recebimento") {
                data = e.target.value
            }
            setFormularioEntrada((currentState) => {
                return { ...currentState, [item]: data }
            })
        },
        alterarDadosFornecedor: (e, item) => {
            setFormularioFornecedor((currentState) => {
                return { ...currentState, [item]: e.target.value }
            })
        },
        parcelar: () => {

            let parcelamentos = []
            const { valor_total, parcelamento, data_emissao, prazo } = formularioEntrada


            if (!validarCampo(data_emissao, "Informe uma data de emissão!")) return;
            if (!validarCampo(parcelamento, "Informe um parcelamento!")) return;
            if (!validarCampo(prazo, "Informe o prazo de pagamento!")) return;
            if (!validarCampo(valor_total, "Informe o total do lançamento")) return;

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

        },
        exibirAlerta: (mensagem, tipo) => { exibirAlerta(mensagem, tipo) }
    }

    const value = {
        funcoes,
        gerenciarControle,
        controle,
        formularioFornecedor,
        setFormularioEntrada,
        setFormularioFornecedor,
        formularioEntrada,
        initFormularioEntrada,
        initFormularioFornecedor
    }



    //Agrupamento das funções e states

    return (
        <EstoqueContext.Provider value={value}>
            {children}
        </EstoqueContext.Provider>
    )
}