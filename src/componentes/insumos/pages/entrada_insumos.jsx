import { useContext } from "react";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";
import { TabelaEntradaInsumos } from "../tabelas/tabela_entrada_insumos";
import { CadastroNovaEntrada } from "../cadastros/cadastro_entrada_insumos";
import { ModalTabelaInsumos } from "../modais/modalInsumos";
import { CadastroFornecedor } from "../cadastros/cadastro_fornecedor";
import { Stack } from "@mui/material";
import { ModalTabelaFornecedores } from "../modais/modalFornecedores";
import { CadastroInsumo } from "../cadastros/cadastro_insumo";
import { ModalCategoriaInsumo } from "../modais/modalCategoriaInsumo";
import { CadastroCategoriaInsumo } from "../cadastros/cadastro_categoria_insumo";
import { ModalTabelaEstoques } from "../modais/modalEstoques";
import { CadastroEstoque } from "../cadastros/cadastro_estoque";
import { ModalTabelaLotes } from "../modais/modalLotes";
import { CadastroLote } from "../cadastros/cadastro_lote";
import { VerificacaoItensEntrada } from "../componentes/verificacao_itens";

export const EntradaInsumos = () => {
    const { controleEstoque } = useContext(EstoqueContext);

    const renderContent = () => {
        switch (controleEstoque.tabsEntrada) {
            case "tabela":
                return <TabelaEntradaInsumos />;
            case "cadastroEntradaInsumo":
                return <CadastroNovaEntrada />;
            case "modalFornecedor":
                return <ModalTabelaFornecedores />;
            case "modalInsumos":
                return <ModalTabelaInsumos />;
            case "modalEstoques":
                return <ModalTabelaEstoques />;
            case "modalLotes":
                return <ModalTabelaLotes />;
            case "modalCategoriaInsumo":
                return <ModalCategoriaInsumo />;
            case "cadastroFornecedor":
                return <CadastroFornecedor />;
            case "cadastroInsumo":
                return <CadastroInsumo />;
            case "cadastroEstoque":
                return <CadastroEstoque />;
            case "cadastroLote":
                return <CadastroLote />;
            case "cadastroCategoriaInsumo":
                return <CadastroCategoriaInsumo />;
            case "itensEntrada":
                return <VerificacaoItensEntrada />
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

