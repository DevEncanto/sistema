import { Stack, TextField, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { ButtonSearch } from "../../../componentes/corte_coracao/botoes/botao_busca";
import { DataContext } from "../../../contexts/contexts/data.context";
import { CorteCoracaoContext } from "../../../contexts/contexts/corte.coracao.context";
import { Calendario } from "../_components/calendario";
import { LotesEtiquetasService } from "../../../service/lotes.etiquetas.service";

export const CadastroStatusEtiqueta = () => {
    const corteCoracaoContext = useContext(CorteCoracaoContext);
    const dataContext = useContext(DataContext)
    const { dCorteCoracao, cCorteCoracao, funcoes } = corteCoracaoContext
    const { lote_etiqueta } = dCorteCoracao

    const cancelarCadastros = () => {
        funcoes.gControleCorteCoracao("tab4", "tab", false);
        funcoes.gControleCorteCoracao("lotes_etiquetas", "tabela", false);
        funcoes.gControleCorteCoracao("tabela", "tabsCadastro", false);
        funcoes.resetFormulario("lote_etiqueta")
        if (cCorteCoracao.edicao) {
            funcoes.gControleCorteCoracao(false, "edicao", false);
        }
    };

    const salvarLote = async () => {
        const aService = LotesEtiquetasService.build(corteCoracaoContext, dataContext)
        if (cCorteCoracao.edicao) {
            await aService.update()
        } else {
            await aService.create()
        }
    }

    return (
        <Stack
            spacing={1}
            sx={{
                padding: "-40px 20px",
                width: "100%"
            }}
        >
            <Stack
                spacing={0}
                direction="row"
                sx={{ marginTop: "-5px", width: "100%", height: "100px" }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: "20px",
                        marginTop: "15px",
                        width: "50%",
                    }}
                >
                    <Stack
                        sx={{ alignItems: "center", height: "50px" }}
                        direction={`row`}
                        spacing={2}
                    >
                        {cCorteCoracao.edicao ? `Edição ` : `Novo `}
                        Status de Etiquetas
                        {cCorteCoracao.load ?
                            <img src="/assets/loading.svg" width={50} height={50} style={{ marginLeft: "20px" }} />
                            :
                            <></>
                        }
                    </Stack>
                </Typography>

            </Stack >
            <Stack
                direction="row"
                spacing={4}
                sx={{
                    justifyContent: "center",
                }}
            >
                <Stack
                    sx={{ marginTop: "20px" }}
                >
                    <Stack
                        sx={{ alignItems: "center" }}
                    >
                        <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                            <TextField sx={{ ...sxTexfieldMenor, width: "386px", marginTop: "px" }} label="Status Etiqueta" value={lote_etiqueta.semana_corte} />
                        </Stack>
                        <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                            <TextField multiline rows={4} sx={{ ...sxTexfieldMenor, width: "386px", height: "150px", marginTop: "px" }} label="Descrição do Status" value={lote_etiqueta.ano_corte} />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "30px 30px"
                }}
            >
                <ButtonCancelar onClick={cancelarCadastros} />
                <ButtonSalvar onClick={salvarLote} />
            </Stack>
        </Stack >
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
