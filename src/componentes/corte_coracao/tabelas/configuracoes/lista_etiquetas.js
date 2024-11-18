export const lista_etiquetas = {
    header: [
        { title: "ETIQUETA", tooltip: "Número da Etiqueta" },
        { title: "DATA", tooltip: "Data de criação da etiqueta" },
        { title: "SEM. COLHEITA", tooltip: "Semana para prevista para colheita" },
        { title: "STATUS", tooltip: "Status atual da etiqueta" },
        { title: "LOCALIZAR", tooltip: "Localização da etiqueta no Google Maps" },
    ],
    body: {
        prop: "lista_etiquetas",
        key: "lista_etiqueta",
        functions: {
            gerarParametros: (object, params = []) => params.map(item => object[item])
        },
        contents: [

            {
                type: "text",
                content: "etiqueta"
            },
            {
                type: "text",
                content: "data"
            },
            {
                type: "text",
                content: "semana_colheita"
            },
            {
                type: "text",
                content: "status"
            },
            {
                type: "blank",
                content: ""
            },
        ],

    },

    sx: { textAlign: "center" },
}