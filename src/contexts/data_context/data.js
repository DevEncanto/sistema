export const dataInit = {
    fornecedores: [],
    areas: [],
    permissoes: [],
    estoque_insumos: [{
        id_insumo: 1,
        nome: "Cloreto de Potássio",
        categoria: "Fertilizante",
        unidade: "KG",
        entradas: 5000
    }],
    saidas_insumos: [],
    previsao_mensal: [
        { mes: 1, dias: 77 },
        { mes: 2, dias: 84 },
        { mes: 3, dias: 91 },
        { mes: 4, dias: 91 },
        { mes: 5, dias: 91 },
        { mes: 6, dias: 91 },
        { mes: 7, dias: 91 },
        { mes: 8, dias: 84 },
        { mes: 9, dias: 84 },
        { mes: 10, dias: 77 },
        { mes: 11, dias: 77 },
        { mes: 12, dias: 77 },
    ],
    lista_etiquetas: [],
    lotes_etiquetas: [{
        id_lote: "1",
        criacao_lote: "04/11/2024",
        semana_corte: 2,
        semana_colheita: 14,
        etiqueta_inicial: 0,
        etiqueta_final: 3,
        total_etiquetas: 4,
        etiquetas: [
            {
                semana_colheita: 6,
                data: "04/11/2024",
                etiqueta: "0000",
                status: "À Colher",
                latitude: -11.919467,
                longitude: -44.876939
            },
            {
                semana_colheita: 6,
                data: "04/11/2024",
                etiqueta: "0001",
                status: "À Colher",
                latitude: -11.919240,
                longitude: -44.876703
            },
            {
                semana_colheita: 6,
                data: "04/11/2024",
                etiqueta: "0002",
                status: "À Colher",
                latitude: -11.919364,
                longitude: -44.877004
            },
            {
                semana_colheita: 6,
                data: "04/11/2024",
                etiqueta: "0003",
                status: "À Colher",
                latitude: -11.919263,
                longitude: -44.877133
            }
        ]
    },
    {
        id_lote: "2",
        criacao_lote: "11/11/2024",
        semana_corte: 46,
        semana_colheita: 7,
        etiqueta_inicial: 0,
        etiqueta_final: 2145,
        total_etiquetas: 2146
    }
    ]
}