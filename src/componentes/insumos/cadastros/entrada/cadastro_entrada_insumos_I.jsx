import { Button, Stack, TextField, Typography } from "@mui/material";
import { PopupAlerta } from "../../popups/popup_status";
import { useContext, useEffect, useLayoutEffect } from "react";
import { EstoqueContext } from "../../../../contexts/components_context/estoque_context";
import { camposObrigatorios } from "../../data";
import { ButtonSearch } from "../../botoes/botao_busca";
import { Selector } from "../../componentes/select";
import { DataContext } from "../../../../contexts/contexts/data.context";

export const CadastroNovaEntradaI = () => {
    const { controleEstoque, dados, funcoes } = useContext(EstoqueContext);
    const { controle } = useContext(DataContext)
    useLayoutEffect(() => {
        funcoes.gerenciarControle(false, "navigate", false)
    }, [])

    useEffect(() => {
        if (controleEstoque.emEdicao) {
            const index = controleEstoque.itemEdicao - 1
            const insumos = dados.entrada_insumo.insumos
            let keys = Object.keys(insumos[index])
            keys.forEach((key) => {
                console.log(insumos[index][key])
                funcoes.gerenciarDadosEstoque("insumo_entrada", key, insumos[index][key], false)
            })
        }
    }, [])

    const cancelarCadastros = () => {
        const destino = controleEstoque.emEdicao ? "itensEntrada" : "tabela"
        const navigate = controleEstoque.emEdicao ? false : true
        funcoes.gerenciarControle(destino, "tabsEntrada", false);
        funcoes.gerenciarControle(navigate, "navigate", false)
        funcoes.resetFormularios("insumo_entrada")
        funcoes.resetFormularios("entrada_insumo")
    };

    const salvarInsumo = async () => {


        for (const campo of camposObrigatorios) {
            if (!dados.insumo_entrada[campo]) {
                funcoes.exibirAlerta("Preencha todos os campos", "warning");
                return false;
            }
        }

        if (dados.insumo_entrada.valor_total < 0) {
            funcoes.exibirAlerta("Verifique o total do lançamento", "error");
            return false
        }

        if (dados.entrada_insumo.insumos.length > 0) {
            const insumoInicial = dados.entrada_insumo.insumos[0]
            if (insumoInicial.tipo_entrada !== dados.insumo_entrada.tipo_entrada) {
                funcoes.exibirAlerta("Tipo de entrada incompatível", "error");
                setTimeout(() => {
                    funcoes.exibirAlerta(`Selecione o tipo: ${insumoInicial.tipo_entrada}`, "success");
                }, 2600)
                return false
            }

            if (insumoInicial.fornecedor!== dados.insumo_entrada.fornecedor) {
                funcoes.exibirAlerta("Adicione mesmo fornecedor!", "error");
                return false
            }
        }


        let dadosAntigos = dados.entrada_insumo.insumos || []
        let insumoPrimario = dados.insumo_entrada

        dadosAntigos.forEach((item, index) => {
            if (item.fornecedor === insumoPrimario.fornecedor &&
                item.valor_unitario === insumoPrimario.valor_unitario &&
                item.estoque === insumoPrimario.estoque &&
                item.insumo === insumoPrimario.insumo
            ) {
                insumoPrimario.qtde_insumo = parseFloat(insumoPrimario.qtde_insumo) + parseFloat(item.qtde_insumo)
                insumoPrimario.descontos = parseFloat(insumoPrimario.descontos) + parseFloat(item.descontos)
                insumoPrimario.valor_total = (insumoPrimario.qtde_insumo * insumoPrimario.valor_unitario) - insumoPrimario.descontos
                dadosAntigos.splice(index, 1)
            }
        })

        let total = 0

        const dadosNovos = {
            ...insumoPrimario,
            index: controleEstoque.emEdicao ? dados.insumo_entrada.index : dadosAntigos.length + 1,
        }

        if (controleEstoque.emEdicao) {
            dadosAntigos.splice(controleEstoque.itemEdicao - 1, 1)
        }
        let itens = [...dadosAntigos, dadosNovos]
        itens.sort((a, b) => {
            if (a.index > b.index) return 1
            if (a.index < b.index) return -1
        })

        itens.forEach((item) => {
            total += parseFloat(item.valor_total)
        })


        funcoes.gerenciarDadosEstoque("entrada_insumo", "insumos", itens, false)
        funcoes.gerenciarDadosEstoque("entrada_insumo", "total_geral", total.toFixed().toString(), false)
        funcoes.resetFormularios("insumo_entrada")

        if (controleEstoque.emEdicao) {
            funcoes.gerenciarControle("itensEntrada", "tabsEntrada", false);
        }

        return true
    }

    const validarDados = async () => {
        let dadosEmCadastro = false
        let continuar = true
        for (const campo of camposObrigatorios) {
            if (dados.insumo_entrada[campo]) {
                dadosEmCadastro = true
            }
        }
        if (dadosEmCadastro) {
            continuar = await salvarInsumo()
            if (!continuar) {
                return
            }
            return funcoes.gerenciarControle("itensEntrada", "tabsEntrada", false);
        }
        if (dados.entrada_insumo.insumos.length === 0) {
            funcoes.exibirAlerta("Adicione no mínimo um item!", "error");
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
    const exibirInsumos = () => {
        funcoes.gerenciarControle("insumo", "tabela", false)
        funcoes.gerenciarControle("modal", "tabsEntrada", false)
    }
    const exibirEstoques = () => {
        funcoes.gerenciarControle("estoques", "tabela", false)
        funcoes.gerenciarControle("modal", "tabsEntrada", false)
    }
    const exibirQuantidade = () => {
        const itens = dados.entrada_insumo?.insumos?.length
        return itens > 0 && !controleEstoque.emEdicao ? `Itens Cadastrados: ${itens}` : ""
    }

    return (


        <Stack
            spacing={1}
            sx={{
                padding: "10px 20px"
            }}
        >
            <Stack
                direction="row"
                sx={{
                    alignItems: "center",
                    marginTop: "-5px",
                    // backgroundColor:"red", 
                    height: "50px"
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: "20px",
                        margin: "6px 0 0 0",
                        width: "80%",
                    }}
                >
                    {controleEstoque.emEdicao
                        ? "Edição de Lançamento"
                        : "Nova Entrada"
                    }
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        height: "80%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {renderAlert()}
                </Stack>
            </Stack>
            <Stack
                direction="row"
                spacing={2}
            >
                <Stack>
                    <Stack
                        sx={{ height: "18px" }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontSize: "13px", marginLeft: "1px" }}
                        >
                            {exibirQuantidade()}
                        </Typography>
                    </Stack>
                    <CampoComBotao label="Fornecedor" value={dados.insumo_entrada.fornecedor || ""} onClick={exibirFornecedores} sx={{ ...sxTexfield, width: "240px" }} />
                    <CampoComBotao label="Insumo" value={dados.insumo_entrada.insumo || ""} onClick={exibirInsumos} sx={{ ...sxTexfield, width: "240px" }} />
                    <CampoComBotao label="Estoque" value={dados.insumo_entrada.estoque || ""} onClick={exibirEstoques} sx={{ ...sxTexfield, width: "240px" }} />
                    <Selector object="insumo_entrada" item="tipo_entrada" value={dados.insumo_entrada.tipo_entrada} valores={controle?.tipos_movimentacoes} label="Tipo de Entrada" width="240px" />

                </Stack>
                <Stack

                >
                    <Stack
                        sx={{ height: "18px" }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontSize: "13px", marginLeft: "1px" }}
                        >

                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "100%" }} label="Qtde do Insumo" onChange={e => funcoes.calculoValores("entrada_insumo", "qtde_insumo", e, false)} value={dados.insumo_entrada.qtde_insumo} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "100%", }} label="Valor Unitário" onChange={e => funcoes.calculoValores("entrada_insumo", "valor_unitario", e, false)} value={dados.insumo_entrada.valor_unitario} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "100%" }} label="Descontos" onChange={e => funcoes.calculoValores("entrada_insumo", "descontos", e, false)} value={dados.insumo_entrada.descontos} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "100%", }} label="Valor Total" value={dados.insumo_entrada.valor_total} />
                    </Stack>
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
                <ButtonSalvar onClick={salvarInsumo} label="Salvar Insumo" />
                {!controleEstoque.emEdicao ? <ButtonContinuar onClick={validarDados} label="Continuar" /> : <></>}
            </Stack>
        </Stack>
    );
};

const CampoComBotao = ({ label, value, onClick, sx }) => (
    <Stack spacing={1} direction="row">
        <TextField sx={sx} label={label} value={value} />
        <ButtonSearch onClick={onClick} marginTop="-50px" />
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
};

const sxTexfieldMenor = {
    width: "170px",
    height: "60px",
};
