import { Stack } from "@mui/material"
import { useContext, useEffect } from "react"
import { DataContext } from "../../../contexts/data_context/data_context"
import { CorteCoracaoContext } from "../../../contexts/corte.coracao.context"
import { TabelasCorteCoracao } from "../tabelas/tabelas.corte_coracao"
import { CadastroLoteEtiqueta } from "../cadastros/entrada/cadastro.lote.etiqueta"
import { GeradorEtiquetas } from "../cadastros/entrada/gerador_etiquetas"
import { Loader } from "./loader"

export const TabsCorteCoracao = () => {

    const { cCorteCoracao, funcoes } = useContext(CorteCoracaoContext)
    const { loadLocalStorage } = useContext(DataContext)

    useEffect(() => {
        funcoes.gControleCorteCoracao("resumo", "tab", false)
        loadLocalStorage()
    }, [])

    const sx = {
        width: "100%",
        heigth: "100%",
        display: "flex",
        padding: "-20px 0",
    }

    return (
        <Stack sx={sx}>
            {cCorteCoracao.tab === "resumo" ? <TabelasCorteCoracao /> : <></>}
            {cCorteCoracao.tab === "resumo_etiquetas" ? <TabelasCorteCoracao tabela="lista_etiquetas" dados={cCorteCoracao.lista_etiquetas} /> : <></>}
            {cCorteCoracao.tab === "cadastro_lote" ? <CadastroLoteEtiqueta /> : <></>}
            {cCorteCoracao.tab === "gerador_etiquetas" ? <GeradorEtiquetas /> : <></>}
        </Stack>
    )
}