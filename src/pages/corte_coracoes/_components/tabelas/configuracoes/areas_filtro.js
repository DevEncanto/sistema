import { Stack } from "@mui/material";
import { BotaoSelecionarRemoverArea } from "../../botoes/botao.selecionar.area";
import { cloneElement } from "react";

export const areas_filtro = {
    header: [
        { title: "ID ÁREA", tooltip: "ID da Área" },
        { title: "ÁREA", tooltip: "Área de Plantio" },
        { title: "AÇÕES", tooltip: "Selecionar ou Remover áreas" },
        
    ],
    body: {
        prop: "areas",
        key: "area",
        functions: {
            gerarParametros: (object, params = []) => params.map(item => object[item])
        },
        contents: [

            {
                type: "text",
                content: "id_area"
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
                components: [<BotaoSelecionarRemoverArea />],
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