export const lista_etiquetas = {
    header: [
        "ETIQUETA",
        "DATA",
        "SEMANA COLHEITA",
        "STATUS",
        "LOCALIZAR",
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