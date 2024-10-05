import { Button } from "@mui/material";
import { BotaoNovoCadastro } from "../../botoes/botao_novo_cadastro";

export const lotes = {
  header: [
    "ID LOTE",
    "LOTE",
    <BotaoNovoCadastro title="Novo Lote" cadastro="cadastroLote" />
  ],
  body: {
    prop: "lotes",
    key: "lote",
    functions: {
      selecionarLote: (funcoes, lote, id_lote) => {
        let eLote = { target: { value: lote } }
        let eIndex = { target: { value: id_lote } }
        funcoes.gerenciarDadosEstoque("estoque", "lote", eLote)
        funcoes.gerenciarDadosEstoque("estoque", "id_lote", eIndex)
        funcoes.gerenciarControle("cadastroEstoque", "tabsEntrada", false)
      },
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [
      {
        type: "text",
        content: "id_lote"
      },
      {
        type: "text",
        content: "nome"
      },
      {
        type: "component",
        function: "selecionarLote",
        params: ["nome", "id_lote"],
        content: (funcoes, code, params) => {
          const handleClick = () => code(funcoes, ...params);

          return (
            <Button
              sx={{
                fontSize: "12px",
                padding: 1
              }}
              key={`btn_entrada`}
              variant='contained'
              onClick={handleClick}
            >
              Selecionar
            </Button>
          );
        }
      }
    ]
  },
  sx: { textAlign: "center" },
  modal: {
    title: "Lotes",
    destino: "cadastroEstoque",
    width: "520px"
  }
}