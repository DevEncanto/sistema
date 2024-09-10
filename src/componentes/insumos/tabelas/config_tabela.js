import { Button } from "@mui/material";
import { BotaoNovoCadastro } from "../botoes/botao_novo_cadastro";

export const config_tables = {
  insumo: {
    header: [
      "ID INSUMO",
      "INSUMO",
      <BotaoNovoCadastro title="Novo Insumo" cadastro="cadastroInsumo" />
    ],
    body: {
      prop: "insumos",
      key: "insumo",
      functions: {
        selecionarInsumo: (funcoes, insumo, id_insumo) => {
          const eInsumo = { target: { value: insumo } };
          const eIndex = { target: { value: id_insumo } };
          funcoes.gerenciarDadosEstoque("insumo_entrada", "insumo", eInsumo);
          funcoes.gerenciarDadosEstoque("insumo_entrada", "id_insumo", eIndex);
          funcoes.gerenciarControle("cadastroEntradaInsumo", "tabsEntrada", false);
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
          params: ["nome", "id_insumo"],
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
      title: "Insumos - Testando aaaa",
      destino: "cadastroEntradaInsumo",
      width: "520px"
    }
  },
  fornecedores: {
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
          funcoes.gerenciarControle("cadastroEntradaInsumo", "tabsEntrada", false)
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
      title: "Insumos - Testando aaaa",
      destino: "cadastroEntradaInsumo",
      width: "520px"
    }
  },
  categorias_insumos: {
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
          params: ["categoria", "id_categoria_insumo"],
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
    sx: { textAlign: "center" }
  }
};
