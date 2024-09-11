import { Stack, TextField, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ButtonSearch } from "../botoes/botao_busca";
import { PopupAlerta } from "../popups/popup_status";
import { camposObrigatoriosFornecedor } from "../../../contexts/data";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";
import { cadastrarFornecedor } from "../../../service/request_cadastro";
import { DataContext } from "../../../contexts/data_context/data_context";

export const CadastroFornecedor = () => {
    const { controleEstoque, funcoes, dados } = useContext(EstoqueContext);
    const dataContext = useContext(DataContext)

    const cancelarCadastros = () => {
        funcoes.gerenciarControle("modal", "tabsEntrada", false);
        funcoes.gerenciarControle("fornecedores", "tabela", false)
        funcoes.resetFormularios("fornecedor")
    };

    const validarDados = async () => {
        for (const campo of camposObrigatoriosFornecedor) {
            if (!dados.fornecedor[campo]) {
                funcoes.exibirAlerta("Preencha todos os campos", "warning");
                return;
            }
        }
        const response = await cadastrarFornecedor(dados.fornecedor)
        const type = response.status === 200 ? "success" : "error"

        funcoes.exibirAlerta(response.message, type)

        if (response.status === 200) {
            const dadosFornecedor = [...dataContext.controle.fornecedores, response.fornecedor]

            dataContext.gerenciarControle(dadosFornecedor, "fornecedores")

            setTimeout(() => {
                funcoes.gerenciarControle("modal", "tabsEntrada", false)
                funcoes.gerenciarControle("fornecedores", "tabela", false)
                funcoes.resetFormularios("fornecedor")
            }, 2500)
        }
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
                    Novo Fornecedor
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
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="Nome" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "nome", e)} value={dados.fornecedor.nome} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Fantasia" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "fantasia", e)} value={dados.fornecedor.fantasia} />
                    </Stack>
                    <Stack spacing={1} direction="row" sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="CPF/CNPJ" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "cpf_cnpj", e)} value={dados.fornecedor.cpf_cnpj} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Inscrição Estadual" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "inscricao", e)} value={dados.fornecedor.inscricao} />
                    </Stack>

                    <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                        <TextField sx={{ ...sxTexfield, width: "405px" }} label="Endereço" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "endereco", e)} value={dados.fornecedor.endereco} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="CEP" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "cep", e)} value={dados.fornecedor.cep} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Bairro" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "bairro", e)} value={dados.fornecedor.bairro} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="Cidade" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "cidade", e)} value={dados.fornecedor.cidade} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Estado" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "estado", e)} value={dados.fornecedor.estado} />
                    </Stack>
                </Stack>
                <Stack>
                    <Stack spacing={1} direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "276px", marginTop: "px" }} label="E-mail" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "email", e)} value={dados.fornecedor.email} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "120px", marginTop: "8px" }} label="Telefone" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "telefone", e)} value={dados.fornecedor.telefone} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="Pix" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "pix", e)} value={dados.fornecedor.pix} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Banco" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "banco", e)} value={dados.fornecedor.banco} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="Agência" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "agencia", e)} value={dados.fornecedor.agencia} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Conta" onChange={e => funcoes.gerenciarDadosEstoque("fornecedor", "conta", e)} value={dados.fornecedor.conta} />
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
