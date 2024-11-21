import { Stack } from "@mui/material";
import { cloneElement } from "react";
import { BotaoSelecionarMediaCacho } from "../../botoes/botao.selecionar.media.cacho";

export const medias_cachos = {
  header: [
    { title: "ID MÉDIA", tooltip: "ID da média do cachos" },
    { title: "STATUS", tooltip: "Status atual da média" },
    { title: "ÁREA", tooltip: "Àrea referente à média" },
    { title: "MÉDIA (KG)", tooltip: "Média prevista para cada cachos" },
    { title: "AÇÔES", tooltip: "Ações" },
  ],
  body: {
    prop: "medias_cachos",
    key: "media_cacho",
    functions: {
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [
      {
        type: "text",
        content: "id_media_cacho"
      },
      {
        type: "colorText",
        content: "status",
        colors: {
          ["Em uso"]: 'success',
          ["Sem uso"]: 'neutral',
        }
      },
      {
        type: "text",
        content: "area"
      },
      {
        type: "text",
        content: "media"
      },
      {
        type: "arrayComponent",
        function: "",
        params: [["status", "id_media_cacho", "index"]],
        components: [<BotaoSelecionarMediaCacho />],
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