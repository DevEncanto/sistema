import { Stack } from "@mui/material";
import { BotaoSelecionarRemoverArea } from "../../botoes/botao.selecionar.area";
import { cloneElement } from "react";
import { BotaoEditarStatusEtiquetas } from "../../botoes/botao.editar.status.etiqueta";

export const status_etiqueta = {
    header: [
        { title: "ID STATUS ETIQUETA", tooltip: "ID do Status Etiqueta" },
        { title: "STATUS", tooltip: "Área de Plantio" },
        { title: "AÇÕES", tooltip: "Selecionar ou Remover áreas" },

    ],
    body: {
        prop: "status",
        key: "status_etiqueta",
        functions: {
            gerarParametros: (object, params = []) => params.map(item => object[item])
        },
        contents: [

            {
                type: "text",
                content: "id_status"
            },
            {
                type: "text",
                content: "nome"
            },
            {
                type: "arrayComponent",
                function: "",
                params: [["id_status"]],
                components: [<BotaoEditarStatusEtiquetas />],
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
}