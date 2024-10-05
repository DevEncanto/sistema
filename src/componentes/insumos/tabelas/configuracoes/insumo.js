import { Button } from "@mui/material";
import { BotaoNovoCadastro } from "../../botoes/botao_novo_cadastro";

export const insumo = {
  header: [
    "ID INSUMO",
    "INSUMO",
    <BotaoNovoCadastro title="Novo Insumo" cadastro="cadastroInsumo" />
  ],
  body: {
    prop: "insumos",
    key: "insumo",
    functions: {
      selecionarInsumo: (funcoes, insumo, id_insumo, id_item) => {
        const eInsumo = { target: { value: insumo } };
        const eIndex = { target: { value: id_insumo } };
        const eItem = { target: { value: id_item } };
        funcoes.gerenciarDadosEstoque("insumo_entrada", "insumo", eInsumo);
        funcoes.gerenciarDadosEstoque("insumo_entrada", "id_insumo", eIndex);
        funcoes.gerenciarDadosEstoque("insumo_entrada", "id_item", eItem);
        funcoes.gerenciarControle("cadastroEntradaInsumoI", "tabsEntrada", false);
      },
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
        type: "component",
        function: "selecionarInsumo",
        params: ["nome", "id_insumo", "id_item"],
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
    title: "Insumos",
    destino: "cadastroEntradaInsumoI",
    width: "520px"
  }
}