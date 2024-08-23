import { useContext } from "react";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";
import { TabelaEntradaInsumos } from "../tabelas/tabela_entrada_insumos";
import { CadastroNovaEntrada } from "../cadastros/cadastro_entrada_insumos";
import { ModalTabelaInsumos } from "../modais/modalInsumos";
import { CadastroFornecedor } from "../cadastros/cadastro_fornecedor";
import { Stack } from "@mui/material";
import { ModalTabelaFornecedores } from "../modais/modalFornecedores";

export const EntradaInsumos = () => {
    const { controle } = useContext(EstoqueContext);

    const renderContent = () => {
        switch (controle.tabsEntrada) {
            case "tabela":
                return <TabelaEntradaInsumos />;
            case "form":
                return <CadastroNovaEntrada />;
            case "modalFornecedor":
                return <ModalTabelaFornecedores />;
            case "modalInsumos":
                return <ModalTabelaInsumos />;
            case "cadastroFornecedor":
                return <CadastroFornecedor />;
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

