import { Button } from "@mui/material"
import { BotaoNovoCadastro } from "../../botoes/botao_novo_cadastro"

export const fornecedores = {
  header: [
    "ID FORNECEDOR",
    "FORNECEDOR",
    <BotaoNovoCadastro title="Novo Fornecedor" cadastro="cadastroFornecedor" />
  ],
  body: {
    prop: "fornecedores",
    key: "fornecedor",
    functions: {
      selecionarFornecedor: (funcoes, fornecedor, id_fornecedor) => {
        let eFornecedor = { target: { value: fornecedor } }
        let eIndex = { target: { value: id_fornecedor } }
        funcoes.gerenciarDadosEstoque("insumo_entrada", "fornecedor", eFornecedor)
        funcoes.gerenciarDadosEstoque("insumo_entrada", "id_fornecedor", eIndex)
        funcoes.gerenciarControle("cadastroEntradaInsumoI", "tabsEntrada", false)
      },
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [
      {
        type: "text",
        content: "id_fornecedor"
      },
      {
        type: "text",
        content: "fantasia"
      },
      {
        type: "component",
        function: "selecionarFornecedor",
        params: ["fantasia", "id_fornecedor"],
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
    ],
  },
  sx: { textAlign: "center" },
  modal: {
    title: "Fornecedores",
    destino: "cadastroEntradaInsumoI",
    width: "520px"
  }
}