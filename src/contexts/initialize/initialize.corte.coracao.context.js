import { SvgIcon } from "@mui/material"
import { BsBox2Fill } from "react-icons/bs"
import { BiAbacus, BiCalendar } from "react-icons/bi";
//Inicialização dos controles do Contexto Corte Coração
export const cInitialize = {
    tab: "tab1",
    tabela: "lotes_etiquetas",
    tabsCadastro: "tabela",
    tabFiltroListaEtiqueta: "resumo_filtro",
    id_lote: 0,
    load: false,
    return: "",
    lista_etiquetas: [],
    type: "",
    filtro: "",
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
            subPage: "tab4",
            tabelaComponent: true,
            tabela: "lotes_etiquetas"
        },
        {
            label: "Médias de Cachos",
            icon: (
                <SvgIcon fontSize="medium" color='white'>
                    <BiAbacus />
                </SvgIcon>
            ),
            subPage: "medias_cachos",
            tabelaComponent: true,
            tabela: "medias_cachos"
        },
        {
            label: "Previsões Mensais",
            icon: (
                <SvgIcon fontSize="medium" color='white'>
                    <BiCalendar />
                </SvgIcon>
            ),
            subPage: "tab7",
            tabelaComponent: true,
            tabela: "previsoes_mensais"
        },
        ,
        {
            label: "Previsões de Colheita",
            icon: (
                <SvgIcon fontSize="medium" color='white'>
                    <BiCalendar />
                </SvgIcon>
            ),
            subPage: "previsao_colheita",
            tabelaComponent: false,
            tabela: ""
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
    },
    filtro_lista_etiquetas: {
        areas: [],
        status: ["todos"]
    }
}
