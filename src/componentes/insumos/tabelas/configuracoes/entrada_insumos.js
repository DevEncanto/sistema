export const entradas_insumos = {
  header: [
    "ID ITEM",
    "INSUMO",
    "CATEGORIA",
    "UNIDADE",
    "QTDE",
    "DATA ENTRADA",
    "ETIQUETA",
    "VALOR",
  ],
  body: {
    prop: "entradas_insumos",
    key: "entrada_insumo",
    functions: {
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [
      {
        type: "text",
        content: "id_item"
      },
      {
        type: "text",
        content: "insumo"
      },
      {
        type: "text",
        content: "categoria"
      },
      {
        type: "text",
        content: "unidade"
      },
      {
        type: "number",
        content: "qtde"
      },
      {
        type: "text",
        content: "data_entrada"
      },
      {
        type: "text",
        content: "etiqueta"
      },
      {
        type: "moeda",
        content: "valor"
      },
    ]
  },
  sx: { textAlign: "center" },
}