import { Button } from "@mui/material";
import { BotaoNovoCadastro } from "../../botoes/botao_novo_cadastro";

export const categorias_insumos = {
  header: [
    "ID CATEGORIA",
    "CATEGORIA",
    <BotaoNovoCadastro title="Nova Categoria" cadastro="cadastroCategoriaInsumo" />
  ],
  body: {
    prop: "categorias_insumos",
    key: "categoria_insumo",
    functions: {
      selecionarCategoria: (funcoes, categoria, id_categoria_insumo) => {
        console.log(categoria)
        console.log(id_categoria_insumo)
        let eCategoria = { target: { value: categoria } }
        let eIndex = { target: { value: id_categoria_insumo } }
        funcoes.gerenciarDadosEstoque("insumo", "categoria", eCategoria)
        funcoes.gerenciarDadosEstoque("insumo", "id_categoria_insumo", eIndex)
        funcoes.gerenciarControle("cadastroInsumo", "tabsEntrada", false)
      },
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [
      {
        type: "text",
        content: "id_categoria_insumo"
      },
      {
        type: "text",
        content: "nome"
      },
      {
        type: "component",
        function: "selecionarCategoria",
        params: ["nome", "id_categoria_insumo"],
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
    title: "Categoria dos Insumos",
    destino: "cadastroInsumo",
    width: "520px"
  }
}