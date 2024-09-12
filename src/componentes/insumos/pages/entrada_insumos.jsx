import { useContext } from "react";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";
import { CadastroFornecedor } from "../cadastros/cadastro_fornecedor";
import { Stack } from "@mui/material";
import { CadastroInsumo } from "../cadastros/cadastro_insumo";
import { CadastroCategoriaInsumo } from "../cadastros/cadastro_categoria_insumo";
import { CadastroEstoque } from "../cadastros/cadastro_estoque";
import { CadastroLote } from "../cadastros/cadastro_lote";
import { VerificacaoItensEntrada } from "../componentes/verificacao_itens";
import { ModalTabelas } from "../modais/modalTabelas";
import { TabelaEstoque } from "../tabelas/tabelas_estoque";
import { ModalRemocaoItem } from "../modais/modalRemocaoItem";
import { CadastroNovaEntradaI } from "../cadastros/cadastro_entrada_insumos_I";
import { CadastroNovaEntradaII } from "../cadastros/cadastro_entrada_insumos_II";

export const EntradaInsumos = () => {
    const { controleEstoque } = useContext(EstoqueContext);

    const renderContent = () => {
        switch (controleEstoque.tabsEntrada) {
            case "tabela":
                return <TabelaEstoque tabela="fornecedores" />
            case "cadastroEntradaInsumoI":
                return <CadastroNovaEntradaI />;
            case "cadastroEntradaInsumoII":
                return <CadastroNovaEntradaII />;
            case "modal":
                return <ModalTabelas />;
            case "remocaoItem":
                return <ModalRemocaoItem />
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

