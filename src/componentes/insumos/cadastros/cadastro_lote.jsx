import { Stack, TextField, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ButtonSearch } from "../botoes/botao_busca";
import { PopupAlerta } from "../popups/popup_status";
import { camposObrigatoriosFornecedor } from "../../../contexts/data";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";
import { cadastrarFornecedor, cadastrarInsumo } from "../../../service/request_cadastro";
import { DataContext } from "../../../contexts/data_context/data_context";
import { Selector } from "../componentes/select";
import { camposObrigatoriosEstoque, camposObrigatoriosInsumos, valoresUnidades } from "../data";

export const CadastroLote = () => {
    const { dados, funcoes, gerenciarControle, controleEstoque } = useContext(EstoqueContext);
    const dataContext = useContext(DataContext)

    const cancelarCadastros = () => {
        gerenciarControle("modalLotes", "tabsEntrada", false);
        funcoes.resetFormularios("lotes")
    };

    const validarDados = async () => {

        if (!dados.lotes.nome) {
            funcoes.exibirAlerta("Informe o nome do lote!", "warning");
            return;
        }


        const response = await cadastrarInsumo(dados.lote)
        const type = response.status === 200 ? "success" : "error"

        // funcoes.exibirAlerta(response.message, type)

        // if (response.status === 200) {
        //     const dadosInsumos = [...dataContext.controle.insumos, response.insumo]

        //     dataContext.gerenciarControle(dadosInsumos, "insumos")

        //     setTimeout(() => {
        //         gerenciarControle("modalInsumos", "tabsEntrada", false);
        //         funcoes.resetFormularios("insumo")
        //     }, 2500)
        // }
    };

    const renderAlert = () => (
        controleEstoque.alert && <PopupAlerta type={controleEstoque.type} title={controleEstoque.alert} />
    );

    return (
        <Stack
            spacing={1}
            sx={{
                padding: "-40px 20px",
                width: "60%"
            }}
        >
            <Stack
                direction="row"
                sx={{ justifyContent: "center", marginTop: "-5px", width: "100%" }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: "20px",
                        margin: "6px 0 15px 0",
                        width: "50%",
                    }}
                >
                    Novo Lote
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        width: "70%",
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
                sx={{
                    justifyContent: "center",
                }}
            >
                <Stack>
                    <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                        <TextField sx={{ ...sxTexfield, width: "405px" }} label="Nome do Lote" onChange={e => funcoes.gerenciarDadosEstoque("lote", "nome", e)} value={dados.lote.nome} />
                    </Stack>
                    <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                        <TextField multiline rows={4} sx={{ ...sxTexfield, width: "405px", height: "150px" }} label="Descrição" onChange={e => funcoes.gerenciarDadosEstoque("lote", "descricao", e)} value={dados.lote.descricao} />
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
