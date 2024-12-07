import { Stack } from "@mui/material";
import { cloneElement } from "react";
import { BotaoSelecionarRemoverStatus } from "../../botoes/botao.selecionar.status";

export const status_filtro = {
    header: [
        { title: "ID STATUS", tooltip: "ID do Status" },
        { title: "STATUS", tooltip: "Status da Etiqueta" },
        { title: "AÇÕES", tooltip: "Selecionar ou Remover status" },
        
    ],
    body: {
        prop: "status",
        key: "status",
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
            ,
            {
                type: "arrayComponent",
                function: "",
                params: [["nome"]],
                components: [<BotaoSelecionarRemoverStatus />],
                content: (components = []) => {
                    return (
                        <Stack
                            direction={`row`}
                            sx={{ alignItems: "center", justifyContent: "center"}}
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