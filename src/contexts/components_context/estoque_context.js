import { createContext, useState } from "react";
import { initControle, initDados, initFormularioInsumo } from "./data";
import { converterDateParaString } from "../../utils/formatar-datas-createdAt";
import { calcularDatas } from "../../utils/gerador-datas";

export const EstoqueContext = createContext();

export const EstoqueProvider = ({ children }) => {

    //Estados de controle do estoque

    const [controleEstoque, setControle] = useState(initControle)

    const [dados, setDados] = useState(initDados)

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

    const gerenciarDadosEstoque = (object, item, e, target = true) => {
        setDados((currentState) => {
            return {
                ...currentState, [object]: {
                    ...currentState[object], [item]: target ? e.target.value : e
                }
            }
        })
    }

    const gerenciarControle = (e, item, target = true) => {
        setControle((currentState) => {
            return { ...currentState, [item]: target ? e.target.value : e }
        })
    }

    const funcoes = {

        resetFormularios: (formulario) => {
            setDados((currentState) => {
                return { ...currentState, [formulario]: initDados[formulario] }
            })
        },
        calculoValores: (object, item, e, target = true) => {
            if (!e.target.value.includes(",")) {
                let total = 0
                let eParsed = e.target.value == "" ? 0 : parseFloat(e.target.value.toString().replace(",", "."))

                gerenciarDadosEstoque("entrada_insumo", item, e.target.value, false)

                const { qtde_insumo, valor_unitario, descontos, parcelamento } = dados.entrada_insumo
                const num1 = qtde_insumo == "" ? 0 : parseFloat(qtde_insumo)
                const num2 = valor_unitario == "" ? 0 : parseFloat(valor_unitario)
                const num3 = descontos == "" ? 0 : parseFloat(descontos)

                switch (item) {
                    case "qtde_insumo": total = (eParsed * num2) - num3; break;
                    case "valor_unitario": total = (num1 * eParsed) - num3; break;
                    case "descontos": total = (num1 * num2) - eParsed; break;
                }
                console.log(`Valor Total: R$ ${total}`)
                gerenciarDadosEstoque("entrada_insumo", "valor_total", total.toFixed(2), false)
            }
        },
        parcelar: () => {

            let parcelamentos = []
            const { valor_total, parcelamento, data_emissao, prazo } = dados.entrada_insumo


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
            gerenciarDadosEstoque("entrada_insumo", "parcelamentos", [...parcelamentos], false)
        },
        exibirAlerta: (mensagem, tipo) => { exibirAlerta(mensagem, tipo) },
        gerenciarDadosEstoque: (object, item, e, target = true) => { gerenciarDadosEstoque(object, item, e, target) },
        gerenciarControle: (e, item, target = true) => { gerenciarControle(e, item, target) }
    }

    const value = {
        funcoes,
        controleEstoque,
        dados
    }



    //Agrupamento das funções e states

    return (
        <EstoqueContext.Provider value={value}>
            {children}
        </EstoqueContext.Provider>
    )
}