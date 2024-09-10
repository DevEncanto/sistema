import { Button, Stack, TextField, Typography } from "@mui/material";
import { PopupAlerta } from "../popups/popup_status";
import { TabelaParcelas } from "../tabelas/tabela_entrada_parcela";
import { DataContext } from "../../../contexts/data_context/data_context";
import { useContext, useEffect, useLayoutEffect } from "react";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";
import { Calendario } from "../componentes/calendario";
import { camposObrigatorios, valoresFormasPagamento, valoresStatusFinanceiro } from "../data";
import { ButtonSearch } from "../botoes/botao_busca";
import { Selector } from "../componentes/select";

export const CadastroNovaEntrada = () => {
    const { controleEstoque, gerenciarControle, dados, funcoes } = useContext(EstoqueContext);
    const data = useContext(DataContext)

    useLayoutEffect(() => {
        funcoes.gerenciarControle(false, "navigate", false)
    }, [])

    const cancelarCadastros = () => {
        funcoes.gerenciarControle("tabela", "tabsEntrada", false);
        funcoes.gerenciarControle(true, "navigate", false)
        funcoes.resetFormularios("entrada_insumo")
        funcoes.resetFormularios("insumo_entrada")
    };


    const salvarInsumo = async () => {
        for (const campo of camposObrigatorios) {
            console.log(dados.insumo_entrada[campo])
            if (!dados.insumo_entrada[campo]) {
                funcoes.exibirAlerta("Preencha todos os campos", "warning");
                return false;
            }
        }

        const total = parseFloat(dados.entrada_insumo.total_geral) + parseFloat(dados.insumo_entrada.valor_total)

        const dadosAntigos = dados.entrada_insumo.insumos
        const dadosNovos = dados.insumo_entrada
        funcoes.gerenciarDadosEstoque("entrada_insumo", "insumos", [...dadosAntigos, dadosNovos], false)
        funcoes.gerenciarDadosEstoque("entrada_insumo", "total_geral", total.toFixed().toString(), false)
        funcoes.resetFormularios("insumo_entrada")
        return true
    }


    const validarDados = async () => {
        let dadosEmCadastro = false
        let continuar = true

        console.log("Validando os dados...")

        for (const campo of camposObrigatorios) {
            if (dados.insumo_entrada[campo]) {
                dadosEmCadastro = true
            }
        }
        console.log(dadosEmCadastro)

        if (dadosEmCadastro) {
            continuar = await salvarInsumo()
            if (!continuar) {
                return
            }
            return funcoes.gerenciarControle("itensEntrada", "tabsEntrada", false);
        }

        if (dados.entrada_insumo.insumos.length === 0) {
            funcoes.exibirAlerta("Adicione pelo menos um insumo!", "error");
            return
        }


        funcoes.gerenciarControle("itensEntrada", "tabsEntrada", false);

    };

    const renderAlert = () => (
        controleEstoque.alert && <PopupAlerta type={controleEstoque.type} title={controleEstoque.alert} />
    );

    const exibirFornecedores = () => {
        funcoes.gerenciarControle("fornecedores", "tabela", false)
        funcoes.gerenciarControle("modal", "tabsEntrada", false)
    }

    return (
        <Stack
            spacing={1}
            sx={{
                padding: "-50px 20px"
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
                        margin: "6px 0 0 0",
                        width: "50%",
                    }}
                >
                    Nova Entrada
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        height: "80%",
                        width: "70%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {renderAlert()}
                </Stack>
            </Stack>
            {JSON.stringify(dados.entrada_insumo.insumos)}
            <Stack
                direction="row"
                spacing={4}
            >
                <Stack>
                    <CampoComBotao label="Fornecedor" value={dados.insumo_entrada.fornecedor || ""} onClick={exibirFornecedores} />
                    <CampoComBotao label="Insumo" value={dados.insumo_entrada.insumo || ""} onClick={() => funcoes.gerenciarControle("modalInsumos", "tabsEntrada", false)} />
                    <CampoComBotao label="Estoque" value={dados.insumo_entrada.estoque || ""} onClick={() => funcoes.gerenciarControle("modalEstoques", "tabsEntrada", false)} />
                    {/* <Stack direction="row" spacing={1} sx={{ marginTop: "5px" }}>
                        <Calendario object="entrada_insumo" item="data_emissao" value={dados.entrada_insumo.data_emissao} width="180px" label="Data de Emissão" />
                        <Calendario object="entrada_insumo" item="data_recebimento" value={dados.entrada_insumo.data_recebimento}  width="218px" label="Data de Recebimento" />
                    </Stack> */}
                    {/* <Stack direction="row" spacing={1} sx={{ marginTop: "5px", alignItems: "center" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "180px", marginTop: "0px" }} label="Nº Nota Fiscal/Boleto" onChange={ e => funcoes.gerenciarDadosEstoque("entrada_insumo", "nf_boleto", e)} value={dados.entrada_insumo.nf_boleto} />
                        {dados.entrada_insumo.status_financeiro === "Em Aberto" && (
                            <>
                                <TextField sx={{ ...sxTexfieldMenor, width: "105px" }} label="Parcelamento" onChange={ e => funcoes.gerenciarDadosEstoque("entrada_insumo", "parcelamento", e)} value={dados.entrada_insumo.parcelamento} />
                                <TextField sx={{ ...sxTexfieldMenor, width: "105px" }} label="Prazo" onChange={ e => funcoes.gerenciarDadosEstoque("entrada_insumo", "prazo", e)} value={dados.entrada_insumo.prazo} />
                            </>
                        )}
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ marginTop: "5px", marginBottom: "5px" }}>
                        <Selector object="entrada_insumo" item="status_financeiro" value={dados.entrada_insumo.status_financeiro} valores={valoresStatusFinanceiro} label="Status Financeiro" width="199px" />
                        <Selector object="entrada_insumo" item="forma_pagamento" value={dados.entrada_insumo.forma_pagamento} valores={valoresFormasPagamento} label="Forma de Pagamento" width="199px" />
                    </Stack> */}
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "px" }} label="Qtde do Insumo" onChange={e => funcoes.calculoValores("entrada_insumo", "qtde_insumo", e, false)} value={dados.insumo_entrada.qtde_insumo} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "8px" }} label="Valor Unitário" onChange={e => funcoes.calculoValores("entrada_insumo", "valor_unitario", e, false)} value={dados.insumo_entrada.valor_unitario} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "px" }} label="Descontos" onChange={e => funcoes.calculoValores("entrada_insumo", "descontos", e, false)} value={dados.insumo_entrada.descontos} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "8px" }} label="Valor Total" value={dados.insumo_entrada.valor_total} />
                    </Stack>
                </Stack>
                {/* <Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "px" }} label="Qtde do Insumo" onChange={e => funcoes.calculoValores("entrada_insumo", "qtde_insumo", e, false)} value={dados.entrada_insumo.qtde_insumo} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "8px" }} label="Valor Unitário" onChange={e => funcoes.calculoValores("entrada_insumo", "valor_unitario", e, false)} value={dados.entrada_insumo.valor_unitario} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "px" }} label="Descontos" onChange={e => funcoes.calculoValores("entrada_insumo", "descontos", e, false)} value={dados.entrada_insumo.descontos} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "8px" }} label="Valor Total" value={dados.entrada_insumo.valor_total} />
                    </Stack>
                    <TabelaParcelas />
                </Stack> */}
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
                <ButtonSalvar onClick={salvarInsumo} label="Salvar Insumo" />
                <ButtonContinuar onClick={validarDados} label="Continuar" />
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

const ButtonSalvar = ({ onClick, label }) => (
    <Button
        variant="contained"
        onClick={onClick}
        sx={{
            backgroundColor: "success.main",
            width: "150px",
            "&:hover": {
                backgroundColor: "success.dark",
            },
        }}
    >
        {label}
    </Button>
);

const ButtonContinuar = ({ onClick, label }) => (
    <Button
        variant="contained"
        onClick={onClick}
        sx={{
            backgroundColor: "primary.main",
            width: "150px",
            "&:hover": {
                backgroundColor: "primary.dark",
            },
        }}
    >
        {label}
    </Button>
);

const sxTexfield = {
    width: "400px",
    height: "60px",
    marginTop: "5px",
};

const sxTexfieldMenor = {
    width: "170px",
    height: "60px",
    marginTop: "5px",
};
