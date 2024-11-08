import { Button, Stack, TextField, Typography } from "@mui/material";
import { PopupAlerta } from "../../popups/popup_status";
import { useContext, useEffect, useLayoutEffect } from "react";
import { EstoqueContext } from "../../../../contexts/components_context/estoque_context";
import { ButtonSearch } from "../../botoes/botao_busca";

export const CadastroNovaSaidaI = () => {
    const { controleEstoque, dados, funcoes } = useContext(EstoqueContext);

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
    };

    const salvarInsumo = async () => {
        for (const campo of camposObrigatorios) {
            console.log(dados.insumo_entrada[campo])
            if (!dados.insumo_entrada[campo]) {
                funcoes.exibirAlerta("Preencha todos os campos", "warning");
                return false;
            }
        }
        let dadosAntigos = dados.entrada_insumo.insumos

        let total = 0

        const dadosNovos = {
            ...dados.insumo_entrada,
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
            funcoes.exibirAlerta("Adicione pelo menos um insumo!", "error");
            return
        }
        funcoes.gerenciarControle("itensEntrada", "tabsEntrada", false);
    };

    const renderAlert = () => (
        controleEstoque.alert && <PopupAlerta type={controleEstoque.type} title={controleEstoque.alert} />
    );

    const exibirTiposSaidas = () => {
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


    const buscarEtiquetas = () => {
        console.log("Ativando o loader")
        funcoes.gerenciarControle(true, "load", false)
        funcoes.gerenciarControle("1", "key", false)
        setTimeout(() => {
            console.log("Desativando o loader")
            funcoes.gerenciarControle(false, "load", false)
            funcoes.gerenciarControle("", "key", false)
        }, 3000)

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
                        : "Nova Saída"
                    }
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        height: "80%",
                        width: "80%",
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
                    <CampoComBotao keyButton="1" label="Destinatário" value={dados.insumo_entrada.fornecedor || ""} onClick={buscarEtiquetas} sx={sxTexfieldMenor} loader={true} />
                    <CampoComBotao keyButton="2" label="Área" value={dados.insumo_entrada.insumo || ""} onClick={exibirInsumos} sx={sxTexfieldMenor} />
                    <CampoComBotao keyButton="3" label="Tipo de Saída" value={dados.insumo_entrada.estoque || ""} onClick={exibirEstoques} sx={sxTexfieldMenor} />
                    <CampoComBotao keyButton="4" label="Estoque" value={dados.insumo_entrada.estoque || ""} onClick={exibirEstoques} sx={sxTexfieldMenor} />
                    <CampoComBotao keyButton="5" label="Estoque" value={dados.insumo_entrada.estoque || ""} onClick={exibirEstoques} sx={sxTexfieldMenor} />
                </Stack>
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

                    <TextField sx={sxTexfieldMenor} label="Etiqueta" onChange={e => funcoes.calculoValores("entrada_insumo", "qtde_insumo", e, false)} value={dados.insumo_entrada.qtde_insumo} />
                    <TextField sx={sxTexfieldMenor} label="Valor Unitário" onChange={e => funcoes.calculoValores("entrada_insumo", "valor_unitario", e, false)} value={dados.insumo_entrada.valor_unitario} />
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

const CampoComBotao = ({ label, value, onClick, sx, params, loader = false, keyButton }) => (
    <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
        <TextField sx={sx} label={label} value={value} />
        <ButtonSearch keyButton={keyButton} onClick={onClick} params={params} loader={loader} />
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
    width: "320px",
    height: "60px",
    marginTop: "5px",
};
