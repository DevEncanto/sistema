import { Stack, TextField, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ButtonSearch } from "../botoes/botao_busca";
import { PopupAlerta } from "../popups/popup_status";
import { camposObrigatoriosFornecedor } from "../../../contexts/data";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";
import { cadastrarFornecedor } from "../../../service/request_cadastro";
import { DataContext } from "../../../contexts/data_context/data_context";
import { Selector } from "../componentes/select";
import { valoresUnidades } from "../data";

export const CadastroInsumo = () => {
    const {dados, gerenciarDados, funcoes, gerenciarControle, formularioInsumo } = useContext(EstoqueContext);
    const dataContext = useContext(DataContext)

    const [alert, setAlert] = useState("");
    const [type, setType] = useState("");

    const cancelarCadastros = () => {
        gerenciarControle("modalFornecedor", "tabsEntrada", false);
        funcoes.resetFormularioFornecedor()
    };

    const validarDados = async () => {
        for (const campo of camposObrigatoriosFornecedor) {
            if (!formularioFornecedor[campo]) {
                exibirAlerta("Preencha todos os campos", "warning");
                return;
            }
        }
        const response = await cadastrarFornecedor(formularioFornecedor)
        const type = response.status === 200 ? "success" : "error"

        exibirAlerta(response.message, type)

        if (response.status === 200) {
            const dadosFornecedor = [...dataContext.controle.fornecedores, response.fornecedor]

            dataContext.gerenciarControle(dadosFornecedor, "fornecedores")

            setTimeout(() => {
                dataContext.saveLocalStorage()
                gerenciarControle("modalFornecedor", "tabsEntrada", false);
                funcoes.resetFormularioFornecedor()
            }, 2500)
        }
    };

    const exibirAlerta = async (mensagem, tipo) => {
        setAlert(mensagem);
        setType(tipo);
        setTimeout(async () => {
            setAlert("");
            setType("");
        }, 4000);
    };

    const renderAlert = () => (
        alert && <PopupAlerta type={type} title={alert} />
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
                    Novo Insumo
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        width: "50%",
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
                    <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                    <TextField sx={{ ...sxTexfield, width: "405px" }} label="Nome do Insumo" onChange={e => funcoes.gerenciarDados("insumo", "nome", e)} value={dados.insumo.nome} />
                    </Stack>
                    <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                        <TextField sx={sxTexfield} label={"Categoria do Insumo"} value={formularioInsumo.categoria} />
                        <ButtonSearch onClick={() => gerenciarControle("modalCategoriaInsumo", "tabsEntrada", false)} />
                    </Stack>

                    <Stack spacing={1} direction="row" sx={{ alignItems: "center", marginTop: "5px", justifyContent: "center", display: "flex" }}>
                        <TextField sx={{ ...sxTexfieldMenor, height: "70px", width: "198px", marginTop: "px" }} label="Composição" onChange={e => funcoes.alterarDadosInsumo(e, "minimo")} value={formularioInsumo.minimo} />
                        <TextField sx={{ ...sxTexfieldMenor, height: "70px", width: "198px", marginTop: "8px" }} label="Estoque Mínimo" onChange={e => funcoes.alterarDadosInsumo(e, "minimo")} value={formularioInsumo.minimo} />
                    </Stack>
                    <Stack spacing={1} direction="row" sx={{ alignItems: "center", marginTop: "-5px", justifyContent: "center", display: "flex" }}>
                        <Selector item="unidade" value={formularioInsumo.unidade} valores={valoresUnidades} label="Unidade" width="199px" />
                    </Stack>
                </Stack>
                <Stack>

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
