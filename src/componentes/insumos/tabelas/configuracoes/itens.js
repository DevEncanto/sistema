import { Button } from "@mui/material";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

export const itens = {
  header: [
    "ID ITEM",
    "INSUMO",
    "QTDE",
    "VALOR UNITÁRIO",
    "FORNECEDOR",
    "TOTAL",
    "AÇÕES"
  ],
  body: {
    prop: "itens",
    key: "item",
    functions: {
      editarItem: (funcoes, index) => {
        console.log(index)
        console.log("editando...")
        funcoes.gerenciarControle(true, "emEdicao", false);
        funcoes.gerenciarControle(index, "itemEdicao", false);
        funcoes.gerenciarControle("cadastroEntradaInsumoI", "tabsEntrada", false);
      },
      removerItem: (funcoes, index) => {
        funcoes.gerenciarControle(index, "itemRemocao", false);
        funcoes.gerenciarControle("remocaoItem", "tabsEntrada", false);
      },
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [
      {
        type: "text",
        content: "index"
      },
      {
        type: "text",
        content: "insumo"
      },
      {
        type: "number",
        content: "qtde_insumo"
      },
      {
        type: "moeda",
        content: "valor_unitario"
      },
      {
        type: "text",
        content: "fornecedor"
      },
      {
        type: "moeda",
        content: "valor_total"
      },
      {
        type: "component",
        function: "editarItem",
        params: ["index"],
        content: (funcoes, code, params) => {
          console.log(params)
          const handleClick = () => code(funcoes, ...params);

          return (
            <Button
              sx={{
                fontSize: "12px",
                width: "90px",
                padding: 1,
                backgroundColor: "success.main",
                ":hover": { backgroundColor: "success.dark" }
              }}
              key={`btn_entrada`}
              variant='contained'
              onClick={handleClick}
              startIcon={<FaEdit />}
            >
              Editar
            </Button>
          );
        }
      },
      {
        type: "component",
        function: "removerItem",
        params: ["index"],
        content: (funcoes, code, params) => {
          const handleClick = () => code(funcoes, ...params);

          return (
            <Button
              sx={{
                fontSize: "12px",
                width: "110px",
                padding: 1,
                marginLeft: "-20px",
                backgroundColor: "error.main",
                ":hover": { backgroundColor: "error.dark" }
              }}
              key={`btn_entrada`}
              variant='contained'
              onClick={handleClick}
              startIcon={<FaRegTrashAlt fontWeight={600} />}
            >
              Remover
            </Button>
          );
        }
      }
    ],

  },
  sx: { textAlign: "center" },
  modal: {

  },

}