import { FabClick } from "../../botoes/FabFunction";

export const parcelas =  {
  header: [
    "ID PARCELA",
    "VALOR",
    "DATA VENCIMENTO",
    "DATA ANTECIPAÇÃO",
    <FabClick />
  ],
  body: {
    prop: "parcelamentos",
    key: "parcelamento",
    functions: {
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [
      {
        type: "text",
        content: "id_parcela"
      },
      {
        type: "moeda",
        content: "valor"
      },
      {
        type: "text",
        content: "vencimento"
      },
      {
        type: "text",
        content: "antecipacao"
      },
      {
        type: "blank",
        content: ""
      }
    ]
  },
  sx: { textAlign: "center" },
}