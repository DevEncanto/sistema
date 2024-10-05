import { useContext, useEffect, useLayoutEffect } from "react";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";
import { CadastroFornecedor } from "../cadastros/entrada/cadastro_fornecedor";
import { Stack } from "@mui/material";
import { CadastroInsumo } from "../cadastros/entrada/cadastro_insumo";
import { CadastroCategoriaInsumo } from "../cadastros/entrada/cadastro_categoria_insumo";
import { CadastroEstoque } from "../cadastros/entrada/cadastro_estoque";
import { CadastroLote } from "../cadastros/entrada/cadastro_lote";
import { VerificacaoItensEntrada } from "../componentes/verificacao_itens";
import { ModalTabelas } from "../modais/modalTabelas";
import { TabelaEstoque } from "../tabelas/tabelas_estoque";
import { ModalRemocaoItem } from "../modais/modalRemocaoItem";
import { CadastroNovaEntradaI } from "../cadastros/entrada/cadastro_entrada_insumos_I";
import { CadastroNovaEntradaII } from "../cadastros/entrada/cadastro_entrada_insumos_II";
import { DataContext } from "../../../contexts/data_context/data_context";

export const EntradaInsumos = () => {
    const { controleEstoque } = useContext(EstoqueContext);
    const { loadLocalStorage } = useContext(DataContext)

    useLayoutEffect(() => {
        loadLocalStorage()
    }, [])


    const renderContent = () => {
        switch (controleEstoque.tabsEntrada) {
            case "tabela":
                return <TabelaEstoque />
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

