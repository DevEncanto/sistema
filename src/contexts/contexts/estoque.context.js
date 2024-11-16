import { createContext, useState } from "react";
import { converterDateParaString } from "../../utils/formatar-datas-createdAt";
import { calcularDatas, diasSemanaAnterior } from "../../utils/gerador-datas";
import { initControle, initDados } from "../initialize/initialize.estoque.context";

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
            let value = e.target.value.replace(/,/g, '.').replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1')

            if (!value.includes(",")) {
                let total = 0
                let eParsed = e.target.value == "" ? 0 : parseFloat(value.toString().replace(",", "."))

                gerenciarDadosEstoque("insumo_entrada", item, value, false)

                const { qtde_insumo, valor_unitario, descontos } = dados.insumo_entrada
                const num1 = qtde_insumo == "" ? 0 : parseFloat(qtde_insumo)
                const num2 = valor_unitario == "" ? 0 : parseFloat(valor_unitario)
                const num3 = descontos == "" ? 0 : parseFloat(descontos)

                switch (item) {
                    case "qtde_insumo": total = (eParsed * num2) - num3; break;
                    case "valor_unitario": total = (num1 * eParsed) - num3; break;
                    case "descontos": total = (num1 * num2) - eParsed; break;
                }
                gerenciarDadosEstoque("insumo_entrada", "valor_total", total.toFixed(2), false)
            }
        },
        parcelar: () => {

            let parcelamentos = []
            const { total_geral, parcelamento, data_emissao, prazo_inicial, prazo_geral, status_financeiro } = dados.entrada_insumo

            if (!validarCampo(data_emissao, "Informe uma data de emissão!")) return;
            if (!validarCampo(parcelamento, "Informe um parcelamento!")) return;
            if (status_financeiro !== "Pago") {
                if (!validarCampo(prazo_inicial, "Informe o prazo da primeira parcela")) return;
                if (!validarCampo(prazo_geral, "Informe o prazo entre as parcelas!")) return;
            }

            const num1 = total_geral == "" ? 0 : parseFloat(total_geral)
            const num2 = parcelamento == "" ? 0 : status_financeiro === "Pago" ? 1 : parseFloat(parcelamento)
            const num3 = prazo_inicial == "" ? 0 : parseFloat(prazo_inicial)
            const num4 = prazo_geral == "" ? 0 : parseFloat(prazo_geral)
            const data = converterDateParaString(data_emissao)

            for (let i = 0; i < num2; i++) {
                parcelamentos.push({
                    id_parcela: i + 1,
                    valor: total_geral === 0 ? 0 : num1 / num2,
                    vencimento: status_financeiro === "Pago" ? data : calcularDatas(data, i === 0 ? num3 : (num3 + (num4 * i))),
                    antecipacao: status_financeiro === "Pago" ? data : diasSemanaAnterior(calcularDatas(data, i === 0 ? num3 : (num3 + (num4 * i)))),
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