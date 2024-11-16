import { useContext, useLayoutEffect } from "react";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";
import { Stack } from "@mui/material";
import { TabelaEstoque } from "../tabelas/tabelas_estoque";
import { DataContext } from "../../../contexts/contexts/data.context";
import { CadastroNovaSaidaI } from "../cadastros/saida/cadastro_saida_insumos_I";

export const SaidaInsumos = () => {
    const { controleEstoque } = useContext(EstoqueContext);
    const { loadLocalStorage } = useContext(DataContext)

    useLayoutEffect(() => {
        loadLocalStorage()
    }, [])

    const renderContent = () => {
        switch (controleEstoque.tabsSaida) {
            case "tabela":
                return <TabelaEstoque />
            case "cadastroSaidaInsumoI":
                return <CadastroNovaSaidaI />

            default:
                return null;
        }
    };

    return (
        <Stack
            sx={{
                display: "flex",
                height: "100%",
                padding: "-50px 0",
                alignItems: "center"
            }}
        >
            {renderContent()}
        </Stack>
    );
};

