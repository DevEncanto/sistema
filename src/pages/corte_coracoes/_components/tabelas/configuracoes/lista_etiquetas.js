export const lista_etiquetas = {
    header: [
        { title: "ETIQUETA", tooltip: "Número da Etiqueta" },
        { title: "SEM. COLHEITA", tooltip: "Semana para prevista para colheita" },
        { title: "ÁREA", tooltip: "Área onde a etiqueta está localizada" },
        { title: "PREVISÃO (KG)", tooltip: "Previsão de quantos KG será colhido" },
        { title: "STATUS", tooltip: "Status atual da etiqueta" },
        { title: "LOCALIZAR", tooltip: "Localização da etiqueta no Google Maps" },
    ],
    body: {
        prop: "lotes_etiquetas",
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
                content: "semana_colheita"
            },
            {
                type: "text",
                content: "area"
            },
            {
                type: "number",
                content: "previsao_kg"
            },
            {
                type: "colorText",
                content: "status",
                colors: {
                    ["EM USO"]: 'success',
                    ["SEM USO"]: 'primary',
                },
                isSeverityPill: true
            },
            {
                type: "blank",
                content: ""
            },
        ],

    },

    sx: { textAlign: "center" },
}