import { Button } from "@mui/material";
import { BotaoNovoCadastro } from "../botoes/botao_novo_cadastro";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FabClick } from "../botoes/FabFunction";

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
      title: "Insumos",
      destino: "cadastroEntradaInsumoI",
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
  },
  lotes: {
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
          function: "selecionarCategoria",
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
  },
  estoques: {
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
  },
  itens: {
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
                startIcon={<FaRegTrashCan fontWeight={600} />}
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
    
  },
  parcelas: {
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
};
