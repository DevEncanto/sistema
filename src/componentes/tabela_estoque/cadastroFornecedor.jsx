import { Stack, TextField, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user_context/user_context";
import { ButtonSearch } from "./botoes/botao_busca";
import { Calendario } from "../calendario";
import { Selector } from "../select";
import { TabelaParcelas } from "./tabela_entrada_parcela";
import { camposObrigatorios, valoresFormasPagamento, valoresStatusFinanceiro } from "./data";
import { PopupAlerta } from "./popups/popup_status";
import { camposObrigatoriosFornecedor } from "../../contexts/data";
import { EstoqueContext } from "../../contexts/components_context/estoque_context";

export const CadastroFornecedor = () => {
    const { funcoes, gerenciarControle, formularioFornecedor } = useContext(EstoqueContext);
    const [alert, setAlert] = useState("");
    const [type, setType] = useState("");

    const cancelarCadastros = () => {
        setTabsEntrada("modalFornecedor");
    };

    const validarDados = async () => {
        for (const campo of camposObrigatoriosFornecedor) {
            if (!formularioFornecedor[campo]) {
                exibirAlerta("Preencha todos os campos", "warning");
                return;
            }
        }

        console.log(JSON.stringify(formularioFornecedor));
        exibirAlerta("Cadastro Realizado com sucesso!", "success")

        setTimeout(() => {
            setTabsEntrada("modalFornecedor")
        }, 2500)
    };

    const exibirAlerta = (mensagem, tipo) => {
        setAlert(mensagem);
        setType(tipo);
        setTimeout(() => {
            setAlert("");
            setType("");
        }, 2500);
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
                    Novo Fornecedor
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

                    <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "405px", marginTop: "px" }} label="Nome" onChange={e => funcoes.alterarDadosFornecedor(e, "nome")} value={formularioFornecedor.nome} />
                    </Stack>
                    <Stack spacing={1} direction="row" sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="CPF/CNPJ" onChange={e => funcoes.alterarDadosFornecedor(e, "cpf_cnpj")} value={formularioFornecedor.cpf_cnpj} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Inscrição Estadual" onChange={e => funcoes.alterarDadosFornecedor(e, "inscricao")} value={formularioFornecedor.inscricao} />
                    </Stack>

                    <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                        <TextField sx={{ ...sxTexfield, width: "405px" }} label="Endereço" onChange={e => funcoes.alterarDadosFornecedor(e, "endereco")} value={formularioFornecedor.endereco} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="CEP" onChange={e => funcoes.alterarDadosFornecedor(e, "cep")} value={formularioFornecedor.cep} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Bairro" onChange={e => funcoes.alterarDadosFornecedor(e, "bairro")} value={formularioFornecedor.bairro} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="Cidade" onChange={e => funcoes.alterarDadosFornecedor(e, "cidade")} value={formularioFornecedor.cidade} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Estado" onChange={e => funcoes.alterarDadosFornecedor(e, "estado")} value={formularioFornecedor.estado} />
                    </Stack>
                </Stack>
                <Stack>
                    <Stack spacing={1} direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "276px", marginTop: "px" }} label="E-mail" onChange={e => funcoes.alterarDadosFornecedor(e, "email")} value={formularioFornecedor.email} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "120px", marginTop: "8px" }} label="Telefone" onChange={e => funcoes.alterarDadosFornecedor(e, "telefone")} value={formularioFornecedor.telefone} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="Pix" onChange={e => funcoes.alterarDadosFornecedor(e, "pix")} value={formularioFornecedor.pix} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Banco" onChange={e => funcoes.alterarDadosFornecedor(e, "banco")} value={formularioFornecedor.banco} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="Agência" onChange={e => funcoes.alterarDadosFornecedor(e, "agencia")} value={formularioFornecedor.agencia} />
                        <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Conta" onChange={e => funcoes.alterarDadosFornecedor(e, "conta")} value={formularioFornecedor.conta} />
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
