import { Button, Stack, TextField, Typography } from "@mui/material";
import { PopupAlerta } from "../../popups/popup_status";
import { useContext, useEffect, useLayoutEffect } from "react";
import { EstoqueContext } from "../../../../contexts/components_context/estoque_context";
import { camposObrigatorios, camposObrigatoriosII, camposObrigatoriosIII, valoresFormasPagamento, valoresStatusFinanceiro } from "../../data";
import { ButtonSearch } from "../../botoes/botao_busca";
import { Calendario } from "../../componentes/calendario";
import { Selector } from "../../componentes/select";
import { TabelaParcelas } from "../../tabelas/tabela_entrada_parcela";
import { TabelaEstoque } from "../../tabelas/tabelas_estoque";
import formatSaldo from "../../../../utils/formatarSaldos";
import { ButtonCancelar } from "../../botoes/botao_cancelar";
import { ButtonDefault } from "../../botoes/botao";
import { ButtonSalvar } from "../../botoes/botao_salvar";
import { converterDateParaString } from "../../../../utils/formatar-datas-createdAt";

export const CadastroNovaEntradaII = () => {
    const { controleEstoque, dados, funcoes } = useContext(EstoqueContext);

    useEffect(() => {

    }, [])

    const cancelarCadastros = () => {
        funcoes.gerenciarControle("cadastroEntradaInsumoI", "tabsEntrada", false);
        funcoes.gerenciarControle(false, "navigate", false)
        funcoes.resetFormularios("insumo_entrada")
        funcoes.resetFormularios("entrada_insumo")
    };

    const voltar = () => {
        funcoes.gerenciarControle("itensEntrada", "tabsEntrada", false);
    }

    const validarDados = async () => {

        const validacao = dados.entrada_insumo.tipo_entrada === "Compra" ? camposObrigatoriosII : camposObrigatoriosIII

        for (const campo of validacao) {
            if (!dados.entrada_insumo[campo]) {
                funcoes.exibirAlerta("Preencha todos os campos", "warning");
                return false;
            }
        }

        if (dados.entrada_insumo.tipo_entrada === "Compra" && dados.entrada_insumo.status_financeiro === "Pago" && dados.entrada_insumo.parcelamentos.length !== 1) {
            funcoes.exibirAlerta("Atualize os parcelamentos!", "warning");
            return false;
        }

        if (dados.entrada_insumo.tipo_entrada === "Compra" && dados.entrada_insumo.status_financeiro !== "Pago" && parseInt(dados.entrada_insumo.parcelamento) !== dados.entrada_insumo.parcelamentos.length) {
            funcoes.exibirAlerta("Atualize os parcelamentos!", "warning");
            return false;
        }
        
        funcoes.gerenciarDadosEstoque("entrada_insumo", "data_recebimento", converterDateParaString(dados.entrada_insumo.data_recebimento), false)
        funcoes.gerenciarDadosEstoque("entrada_insumo", "data_emissao", converterDateParaString(dados.entrada_insumo.data_emissao), false)

        funcoes.exibirAlerta("Lançamentos cadastrados com sucesso!", "success")
        setTimeout(() => {
            cancelarCadastros()
        }, 2500)
        console.log(dados.entrada_insumo)
    };

    const renderAlert = () => (
        controleEstoque.alert && <PopupAlerta type={controleEstoque.type} title={controleEstoque.alert} />
    );

    return (
        <Stack
            sx={{
                width: "100%",
                height: "75vh"
            }}
        >
            <Stack
                direction="row"
                sx={{
                    alignItems: "center",
                    minHeight: "10%",

                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: "20px",
                        margin: "6px 0 0 0",
                        width: "50%",
                    }}
                >
                    Dados Adicionais
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        height: "80%",
                        width: "90%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {renderAlert()}
                </Stack>
            </Stack>

            <Stack
                direction={"row"}
                spacing={.6}
                sx={{ marginBottom: "5px", fontSize: "13px" }}
            >
                <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>{`Total: `}</Typography>
                <Typography sx={{ fontSize: "15px" }}>{`R$ ${formatSaldo(dados.entrada_insumo.total_geral)}`}</Typography>
            </Stack>
            <Stack
                direction="row"
                spacing={0}
                sx={{
                    width: "100%",
                    minHeight: "70%",
                }}
            >
                <Stack
                    spacing={.1}
                    sx={{ width: "30%", minHeight: "373px" }}
                >

                    <Stack direction="row" spacing={1} >
                        <Calendario object="entrada_insumo" item="data_emissao" value={dados.entrada_insumo.data_emissao} width="218px" label="Data de Emissão" />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Calendario object="entrada_insumo" item="data_recebimento" value={dados.entrada_insumo.data_recebimento} width="218px" label="Data de Recebimento" />
                    </Stack>

                    <Stack direction="row" spacing={1} >

                        {dados.entrada_insumo.tipo_entrada === "Compra" && (
                            <>
                                <Selector object="entrada_insumo" item="status_financeiro" value={dados.entrada_insumo.status_financeiro} valores={valoresStatusFinanceiro} label="Status Financeiro" width="218px" />
                            </>
                        )}

                    </Stack>
                    <Stack direction="row" spacing={1} >
                        {dados.entrada_insumo.tipo_entrada === "Compra" && dados.entrada_insumo.status_financeiro === "Em Aberto" && (
                            <>
                                <Selector object="entrada_insumo" item="forma_pagamento" value={dados.entrada_insumo.forma_pagamento} valores={valoresFormasPagamento} label="Forma de Pagamento" width="218px" />
                            </>
                        )}

                    </Stack>
                    <Stack direction="row" spacing={.7} >
                        {dados.entrada_insumo.tipo_entrada === "Compra" && dados.entrada_insumo.status_financeiro === "Em Aberto" && (
                            <>
                                <TextField sx={{ ...sxTexfieldMenor, width: "106px" }} label="Parcelas" onChange={e => funcoes.gerenciarDadosEstoque("entrada_insumo", "parcelamento", e)} value={dados.entrada_insumo.parcelamento} />
                            </>
                        )}
                        {dados.entrada_insumo.tipo_entrada === "Compra" && dados.entrada_insumo.status_financeiro === "Em Aberto" && (
                            <>
                                <TextField sx={{ ...sxTexfieldMenor, width: "106px" }} label="NF" onChange={e => funcoes.gerenciarDadosEstoque("entrada_insumo", "nf", e)} value={dados.entrada_insumo.nf} />
                            </>
                        )}

                    </Stack>
                    <Stack direction="row" spacing={.7} sx={{ minHeight: "60px" }} >
                        {dados.entrada_insumo.tipo_entrada === "Compra" && dados.entrada_insumo.status_financeiro === "Em Aberto" && (
                            <>
                                <TextField sx={{ ...sxTexfieldMenor, width: "106px" }} label="Prazo Inicial" onChange={e => funcoes.gerenciarDadosEstoque("entrada_insumo", "prazo_inicial", e)} value={dados.entrada_insumo.prazo_inicial} />
                                <TextField sx={{ ...sxTexfieldMenor, width: "106px" }} label="Prazo Geral" onChange={e => funcoes.gerenciarDadosEstoque("entrada_insumo", "prazo_geral", e)} value={dados.entrada_insumo.prazo_geral} />
                            </>
                        )}
                    </Stack>
                </Stack>
                <Stack
                    sx={{ width: "75%" }}
                >
                    <TabelaEstoque tabela="parcelas" dados={dados.entrada_insumo.parcelamentos} minHeigth={370} />
                </Stack>
            </Stack>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "28px",
                    minHeight: "10%",
                }}
            >
                <ButtonCancelar onClick={cancelarCadastros} />
                <ButtonDefault onClick={voltar} label={"Voltar"} />
                <ButtonSalvar onClick={validarDados} />
            </Stack>
        </Stack>
    );
};


const sxTexfield = {
    width: "400px",
    height: "60px",
};

const sxTexfieldMenor = {
    width: "170px",
    height: "60px",
};
