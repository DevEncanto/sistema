import { Stack } from "@mui/material";
import { cloneElement } from "react";
import { BotaoGerarQRCode } from "../../botoes/botao.etiquetas";
import { BotaoListarEtiquetas } from "../../botoes/botao.selecionar.lista";
import { BotaoEditarLotesEtiquetas } from "../../botoes/botao.editar";

export const lotes_etiquetas = {
  header: [
    { title: "CRIAÇÃO", tooltip: "Data de Criação do Lote" },
    { title: "SEM. CORTE", tooltip: "Semana do corte de coração" },
    { title: "SEM. COLHEITA", tooltip: "Semana prevista para colheita" },
    { title: "ETI. INICIAL", tooltip: "Etiqueta Inicial" },
    { title: "ETI. FINAL", tooltip: "Etiqueta Final" },
    { title: "AÇÔES", tooltip: "Ações" },

  ],
  body: {
    prop: "lotes_etiquetas",
    key: "lote_etiqueta",
    functions: {
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [

      {
        type: "text",
        content: "criacao"
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
        type: "arrayComponent",
        function: "",
        params: [["id_lote_etiqueta"], ["id_lote_etiqueta"], ["id_lote_etiqueta"]],
        components: [<BotaoGerarQRCode />, <BotaoListarEtiquetas />, <BotaoEditarLotesEtiquetas />],
        content: (components = []) => {
          return (
            <Stack
              direction={`row`}
              sx={{ alignItems: "center", justifyContent: "center" }}
              spacing={.4}
            >
              {components.map((component, index) => {
                return cloneElement(component)
              })}
            </Stack>
          );
        }
      },
    ],

  },

  sx: { textAlign: "center" },
  modal: {
    title: "Categoria dos Insumos",
    destino: "cadastroInsumo",
    width: "520px"
  }
}