import { Stack } from "@mui/material";
import { cloneElement } from "react";
import { BotaoSelecionarPrevisaoMensal } from "../../botoes/botao.selecionar.previsao.mensal";

export const previsoes_mensais = {
  header: [
    { title: "ID PREVISÃO", tooltip: "ID da previsão mensal" },
    { title: "STATUS", tooltip: "Status atual da previsão" },
    { title: "MÊS", tooltip: "Mês referente à previsão" },
    { title: "PREVISÃO (DIAS)", tooltip: "Dias previstos para colher" },
    { title: "AÇÔES", tooltip: "Ações" },

  ],
  body: {
    prop: "previsoes_mensais",
    key: "previsao_mensal",
    functions: {
      gerarParametros: (object, params = []) => params.map(item => object[item])
    },
    contents: [
      {
        type: "text",
        content: "id_previsao_mensal"
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
        content: "nome"
      },
      {
        type: "text",
        content: "dias"
      },
      {
        type: "arrayComponent",
        function: "",
        params: [["status", "id_previsao_mensal", "index"]],
        components: [<BotaoSelecionarPrevisaoMensal />],
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