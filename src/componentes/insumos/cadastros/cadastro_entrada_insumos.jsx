import { Button, Stack, TextField, Typography } from "@mui/material";
import { PopupAlerta } from "../popups/popup_status";
import { TabelaParcelas } from "../tabelas/tabela_entrada_parcela";
import { DataContext } from "../../../contexts/data_context/data_context";
import { useContext } from "react";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";
import { Calendario } from "../componentes/calendario";
import { valoresFormasPagamento, valoresStatusFinanceiro } from "../data";
import { ButtonSearch } from "../botoes/botao_busca";
import { Selector } from "../componentes/select";

export const CadastroNovaEntrada = () => {
    const { controleEstoque, gerenciarControle, dados, funcoes } = useContext(EstoqueContext);
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
        controleEstoque.alert && <PopupAlerta type={controleEstoque.type} title={controleEstoque.alert} />
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


                    <CampoComBotao label="Fornecedor" value={dados.entrada_insumo.fornecedor} onClick={() => gerenciarControle("modalFornecedor", "tabsEntrada", false)} />
                    <CampoComBotao label="Insumo" value={dados.entrada_insumo.insumo} onClick={() => gerenciarControle("modalInsumos", "tabsEntrada", false)} />
                    <Stack direction="row" spacing={1} sx={{ marginTop: "5px" }}>
                        <Calendario item="data_emissao" value={dados.entrada_insumo.data_emissao} setValue={funcoes.alterarDados} width="180px" label="Data de Emissão" />
                        <Calendario item="data_recebimento" value={dados.entrada_insumo.data_recebimento} setValue={funcoes.alterarDados} width="218px" label="Data de Recebimento" />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ marginTop: "5px", alignItems: "center" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "180px", marginTop: "0px" }} label="Nº Nota Fiscal/Boleto" onChange={e => funcoes.alterarDados(e, "nf_boleto")} value={dados.entrada_insumo.nf_boleto} />
                        {dados.entrada_insumo.status_financeiro === "Em Aberto" && (
                            <>
                                <TextField sx={{ ...sxTexfieldMenor, width: "105px" }} label="Parcelamento" onChange={e => funcoes.alterarDados(e, "parcelamento")} value={dados.entrada_insumo.parcelamento} />
                                <TextField sx={{ ...sxTexfieldMenor, width: "105px" }} label="Prazo" onChange={e => funcoes.alterarDados(e, "prazo")} value={dados.entrada_insumo.prazo} />
                            </>
                        )}
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ marginTop: "5px" }}>
                        <Selector object="entrada_insumo" item="status_financeiro" value={dados.entrada_insumo.status_financeiro} valores={valoresStatusFinanceiro} label="Status Financeiro" width="199px" />
                        <Selector object="entrada_insumo" item="forma_pagamento" value={dados.entrada_insumo.forma_pagamento} valores={valoresFormasPagamento} label="Forma de Pagamento" width="199px" />
                    </Stack>
                </Stack>
                <Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "px" }} label="Qtde do Insumo" onChange={e => funcoes.calculoValores(e, "qtde_insumo")} value={dados.entrada_insumo.qtde_insumo} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "8px" }} label="Valor Unitário" onChange={e => funcoes.calculoValores(e, "valor_unitario")} value={dados.entrada_insumo.valor_unitario} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "px" }} label="Descontos" onChange={e => funcoes.calculoValores(e, "descontos")} value={dados.entrada_insumo.descontos} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "50%", marginTop: "8px" }} label="Valor Total" value={dados.entrada_insumo.valor_total} />
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
