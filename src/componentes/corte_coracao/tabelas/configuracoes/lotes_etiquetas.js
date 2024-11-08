import { Button } from "@mui/material"
import { BsQrCode } from "react-icons/bs"
import { BotaoGerarQRCode } from "../../botoes/botao_gerar_qr";
import { BotaoListarEtiquetas } from "../../botoes/botao.selecionar.lista";

export const lotes_etiquetas = {
  header: [
    "CRIAÇÃO DO LOTE",
    "SEMANA CORTE",
    "SEMANA COLHEITA",
    "ETIQUETA INICIAL",
    "ETIQUETA FINAL",
    "GERAR ETIQUETAS",
    "VISUALIZAR"
  ],
  body: {
    prop: "lotes_etiquetas",
    key: "lote_etiqueta",
    functions: {
      gerarEtiquetas: (id_lote) => { },
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [

      {
        type: "text",
        content: "criacao_lote"
      },
      {
        type: "text",
        content: "semana_corte"
      },
      {
        type: "text",
        content: "semana_colheita"
      },
      {
        type: "text",
        content: "etiqueta_inicial"
      },
      {
        type: "text",
        content: "etiqueta_final"
      },
      {
        type: "componentExt",
        function: "gerarEtiquetas",
        params: ["id_lote"],
        content: (data) => {
          return (
            <BotaoGerarQRCode {...[...data]} />
          );
        }
      },
      {
        type: "componentExt",
        function: "gerarEtiquetas",
        params: ["id_lote"],
        content: (data) => {
          return (
            <>
              <BotaoListarEtiquetas {...[...data]} />
            </>
          );
        }
      }
    ],

  },

  sx: { textAlign: "center" },
  modal: {
    title: "Categoria dos Insumos",
    destino: "cadastroInsumo",
    width: "520px"
  }
}