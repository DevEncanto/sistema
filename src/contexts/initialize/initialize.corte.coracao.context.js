//Inicialização dos controles do Contexto Corte Coração
export const cInitialize = {
    tab: "resumo",
    tabela: "lotes_etiquetas",
    tabsCadastro: "tabela",
    id_lote: 0, 
    load: false,
    return: "",
    lista_etiquetas: [],
    type: "",
    alert: ""
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
        total_etiquetas: "",
        ano_corte: "1900",
        ano_colheita: "1900"
    }
}
