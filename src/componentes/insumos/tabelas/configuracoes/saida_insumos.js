export const saidas_insumos = {
  header: [
    "ID ITEM",
    "INSUMO",
    "CATEGORIA",
    "UNIDADE",
    "QTDE",
    "DATA SAÍDA",
    "TIPO SAÍDA",
    "DESTINO"
  ],
  body: {
    prop: "saidas_insumos",
    key: "saida_insumo",
    functions: {
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [
      {
        type: "text",
        content: "id_insumo"
      },
      {
        type: "text",
        content: "nome"
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
        content: "entradas"
      }
    ]
  },
  sx: { textAlign: "center" },
}