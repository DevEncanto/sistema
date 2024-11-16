import { Stack } from "@mui/material"
import { useContext, useEffect } from "react"
import { DataContext } from "../../../contexts/contexts/data.context"
import { CorteCoracaoContext } from "../../../contexts/contexts/corte.coracao.context"
import { TabelasCorteCoracao } from "../tabelas/tabelas.corte_coracao"
import { CadastroLoteEtiqueta } from "../cadastros/entrada/cadastro.lote.etiqueta"
import { GeradorEtiquetas } from "../cadastros/entrada/gerador_etiquetas"

export const TabsCorteCoracao = () => {

    const { cCorteCoracao, funcoes } = useContext(CorteCoracaoContext)
    const dataContext = useContext(DataContext)

    useEffect(() => {
        funcoes.gControleCorteCoracao("resumo", "tab", false)
        dataContext.funcoes.loadLocalStorage()
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