import { Stack, TextField, Button, Typography } from "@mui/material";
import { TabelaEntradaInsumos } from "./tabela_entrada_insumos";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user_context/user_context";
import { ButtonSearch } from "./botoes/botao_busca";
import { Calendario } from "../calendario";
import { Selector } from "../select";
import { TabelaParcelas } from "./tabela_entrada_parcela";
import { camposObrigatorios, valoresFormasPagamento, valoresStatusFinanceiro } from "./data";
import { PopupAlerta } from "./popups/popup_status";
import { ModalTabelaFornecedores } from "./modais/modalFornecedores";
import { ModalTabelaInsumos } from "./modais/modalInsumos";
import { CadastroFornecedor } from "./cadastroFornecedor";
import { EstoqueContext } from "../../contexts/components_context/estoque_context";
import { DataContext } from "../../contexts/data_context/data_context";

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

const CadastroNovaEntrada = () => {
    const { controle, gerenciarControle, formularioEntrada, setFormularioEntrada, funcoes, initFormularioEntrada } = useContext(EstoqueContext);
    const data = useContext(DataContext)
    const cancelarCadastros = () => {
        gerenciarControle("tabela", "tabsEntrada", false);
        setFormularioEntrada(initFormularioEntrada);
    };

    const validarDados = async () => {
        for (const campo of camposObrigatorios) {
            if (!formularioEntrada[campo]) {
                funcoes.exibirAlerta("Preencha todos os campos", "warning");
                return;
            }
        }

        if (parseInt(formularioEntrada.parcelamento) !== formularioEntrada.parcelamentos.length) {
            funcoes.exibirAlerta("Atualize os parcelamentos", "error");
            return;
        }

        console.log(JSON.stringify(formularioEntrada));
    };



    const renderAlert = () => (
        controle.alert && <PopupAlerta type={controle.type} title={controle.alert} />
    );

    return (
        <Stack
            spacing={1}
            sx={{
                padding: "-40px 20px"
            }}
        >
            <Stack
                direction="row"
                sx={{ justifyContent: "center", marginTop: "-5px" }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: "20px",
                        margin: "6px 0 15px 0",
                        width: "60%",
                    }}
                >
                    Nova Entrada
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        width: "40%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {renderAlert()}
                </Stack>
            </Stack>
            <Stack
                direction="row"
                spacing={4}
            >
                <Stack>

                    {JSON.stringify(data.controle)}
                    <CampoComBotao label="Fornecedor" value={formularioEntrada.fornecedor} onClick={() => gerenciarControle("modalFornecedor", "tabsEntrada", false)} />
                    <CampoComBotao label="Insumo" value={formularioEntrada.insumo} onClick={() => gerenciarControle("modalInsumos", "tabsEntrada", false)} />
                    <Stack direction="row" spacing={1} sx={{ marginTop: "5px" }}>
                        <Calendario item="data_emissao" value={formularioEntrada.data_emissao} setValue={funcoes.alterarDados} width="180px" label="Data de Emissão" />
                        <Calendario item="data_recebimento" value={formularioEntrada.data_recebimento} setValue={funcoes.alterarDados} width="218px" label="Data de Recebimento" />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ marginTop: "5px", alignItems: "center" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "180px", marginTop: "0px" }} label="Nº Nota Fiscal/Boleto" onChange={e => funcoes.alterarDados(e, "nf_boleto")} value={formularioEntrada.nf_boleto} />
                        {formularioEntrada.status_financeiro === "Em Aberto" && (
                            <>
                                <TextField sx={{ ...sxTexfieldMenor, width: "105px" }} label="Parcelamento" onChange={e => funcoes.alterarDados(e, "parcelamento")} value={formularioEntrada.parcelamento} />
                                <TextField sx={{ ...sxTexfieldMenor, width: "105px" }} label="Prazo" onChange={e => funcoes.alterarDados(e, "prazo")} value={formularioEntrada.prazo} />
                            </>
                        )}
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ marginTop: "5px" }}>
                        <Selector item="status_financeiro" value={formularioEntrada.status_financeiro} valores={valoresStatusFinanceiro} label="Status Financeiro" width="199px" />
                        <Selector item="forma_pagamento" value={formularioEntrada.forma_pagamento} valores={valoresFormasPagamento} label="Forma de Pagamento" width="199px" />
                    </Stack>
                </Stack>
                <Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "px" }} label="Qtde do Insumo" onChange={e => funcoes.calculoValores(e, "qtde_insumo")} value={formularioEntrada.qtde_insumo} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "8px" }} label="Valor Unitário" onChange={e => funcoes.calculoValores(e, "valor_unitario")} value={formularioEntrada.valor_unitario} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "px" }} label="Descontos" onChange={e => funcoes.calculoValores(e, "descontos")} value={formularioEntrada.descontos} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "8px" }} label="Valor Total" value={formularioEntrada.valor_total} />
                    </Stack>
                    <TabelaParcelas />
                </Stack>
            </Stack>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "30px"
                }}
            >
                <ButtonCancelar onClick={cancelarCadastros} />
                <ButtonSalvar onClick={validarDados} />
            </Stack>
        </Stack>
    );
};

const CampoComBotao = ({ label, value, onClick }) => (
    <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
        <TextField sx={sxTexfield} label={label} value={value} />
        <ButtonSearch onClick={onClick} />
    </Stack>
);

const ButtonCancelar = ({ onClick }) => (
    <Button
        variant="contained"
        onClick={onClick}
        sx={{
            backgroundColor: "error.main",
            width: "100px",
            "&:hover": {
                backgroundColor: "error.dark",
            },
        }}
    >
        Cancelar
    </Button>
);

const ButtonSalvar = ({ onClick }) => (
    <Button
        variant="contained"
        onClick={onClick}
        sx={{
            backgroundColor: "success.main",
            width: "100px",
            "&:hover": {
                backgroundColor: "success.dark",
            },
        }}
    >
        Salvar
    </Button>
);

const sxTexfield = {
    width: "350px",
    height: "60px",
    marginTop: "5px",
};

const sxTexfieldMenor = {
    width: "170px",
    height: "60px",
    marginTop: "5px",
};
