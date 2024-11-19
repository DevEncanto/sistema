import { SvgIcon } from "@mui/material"
import { BsBox2Fill } from "react-icons/bs"

//Inicialização dos controles do Contexto Corte Coração
export const cInitialize = {
    tab: "modal_feedback",
    tabela: "lotes_etiquetas",
    tabsCadastro: "tabela",
    id_lote: 0,
    load: false,
    return: "",
    lista_etiquetas: [],
    type: "",
    alert: "",
    edicao: false,
    menu: [
        {
            label: "Lotes de Fitas",
            icon: (
                <SvgIcon fontSize="medium" color='white'>
                    <BsBox2Fill />
                </SvgIcon>
            ),
            subPage: "resumo_lotes_etiquetas"
        }
    ]
}

//Inicialização dos dados do Contexto Corte Coração
export const dInitialize = {
    lote_etiqueta: {
        data_corte: "",
        data_prevista: "",
        semana_corte: "",
        semana_colheita: "",
        etiqueta_inicial: "",
        etiqueta_final: "",
        ano_corte: "",
        ano_colheita: ""
    }
}
