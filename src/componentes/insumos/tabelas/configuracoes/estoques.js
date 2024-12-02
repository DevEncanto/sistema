import { Button } from "@mui/material";
import { BotaoNovoCadastro } from "../../botoes/botao_novo_cadastro";

export const estoques = {
  header: [
    "ID ESTOQUE",
    "ESTOQUE",
    "LOTE", 
    <BotaoNovoCadastro title="Novo Estoque" cadastro="cadastroEstoque" />
  ],
  body: {
    prop: "estoques",
    key: "estoque",
    functions: {
      selecionarEstoque: (funcoes, estoque, id_estoque) => {
        let eEstoque = { target: { value: estoque } }
        let eIndex = { target: { value: id_estoque } }
        funcoes.gerenciarDadosEstoque("insumo_entrada", "estoque", eEstoque)
        funcoes.gerenciarDadosEstoque("insumo_entrada", "id_estoque", eIndex)
        funcoes.gerenciarControle("cadastroEntradaInsumoI", "tabsEntrada", false)
      },
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [
      {
        type: "text",
        content: "id_estoque"
      },
      {
        type: "text",
        content: "nome"
      },
      {
        type: "text",
        content: "lote"
      },
      {
        type: "component",
        function: "selecionarEstoque",
        params: ["nome", "id_estoque"],
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
    title: "Estoques",
    destino: "cadastroEntradaInsumoI",
    width: "580px"
  }
}