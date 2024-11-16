import { Stack, TextField, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { ButtonSearch } from "../../botoes/botao_busca";
import { DataContext } from "../../../../contexts/contexts/data.context";
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context";
import { Calendario } from "../../componentes/calendario";
import { PopupAlerta } from "../../popups/popup_status";
import { LotesEtiquetasService } from "../../../../service/lotes.etiquetas.service";

export const CadastroLoteEtiqueta = () => {
    const corteCoracaoContext = useContext(CorteCoracaoContext);
    const dataContext = useContext(DataContext)
    const { dCorteCoracao, cCorteCoracao, funcoes } = corteCoracaoContext
    const { lote_etiqueta } = dCorteCoracao

    const cancelarCadastros = () => {
        funcoes.gControleCorteCoracao("resumo", "tab", false);
        funcoes.gControleCorteCoracao("lotes_etiquetas", "tabela", false);
        funcoes.gControleCorteCoracao("tabela", "tabsCadastro", false);
        // funcoes.resetFormularios("lotes_etiquetas")
    };

    const salvarLote = async () => {
        const aService = LotesEtiquetasService.build(corteCoracaoContext, dataContext)
        await aService.create()
    }

    const renderAlert = () => (
        cCorteCoracao.alert && <PopupAlerta type={cCorteCoracao.type} title={cCorteCoracao.alert} minWidth={"400px"} />
    );


    return (
        <Stack
            spacing={1}
            sx={{
                padding: "-40px 20px",
                width: "100%"
            }}
        >
            <Stack
                direction="row"
                sx={{justifyContent: "center", marginTop: "-5px", width: "100%", minHeight: "40px" }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: "20px",
                        margin: "0",
                        width: "50%",
                    }}
                >
                    Novo Lote de Etiquetas

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
                <Stack
                    sx={{ marginTop: "20px" }}
                >

                    <Stack
                        sx={{ alignItems: "center" }}
                    >

                        <Stack direction="row" spacing={1} >
                            <Calendario object="lote_etiqueta" item="data_corte" value={lote_etiqueta.data_corte} width="198px" label="Data do Corte" />
                            <Calendario disabled={true} object="lote_etiqueta" item="data_prevista" value={lote_etiqueta.data_prevista} width="198px" label="Data Previsão Colheita" />
                        </Stack>
                        <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                            <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="Semana Corte" value={lote_etiqueta.semana_corte} />
                            <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Semana Colheita" value={lote_etiqueta.semana_colheita} />
                        </Stack>
                        <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                            <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "px" }} label="Etiqueta Inicial" onChange={(e) => { funcoes.atualizarEtiquetas("lote_etiqueta", "etiqueta_inicial", e) }} value={lote_etiqueta.etiqueta_inicial} />
                            <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Etiqueta Final" onChange={(e) => { funcoes.atualizarEtiquetas("lote_etiqueta", "etiqueta_final", e) }} value={lote_etiqueta.etiqueta_final} />
                        </Stack>
                        <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                            <TextField sx={{ ...sxTexfieldMenor, width: "198px", marginTop: "8px" }} label="Etiqueta Final" value={lote_etiqueta.total_etiquetas} />
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
