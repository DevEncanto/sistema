export const estoque_insumos = {
  header: [
    "ID INSUMO",
    "INSUMO",
    "CATEGORIA",
    "UNIDADE",
    "ENTRADAS",
    "SAÍDAS",
    "TOTAL",
  ],
  body: {
    prop: "estoque_insumos",
    key: "estoque_insumo",
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