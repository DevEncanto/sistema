import { Divider, Stack } from "@mui/material"
import { useContext, useEffect } from "react"
import { DataContext } from "../../../contexts/contexts/data.context"
import { CorteCoracaoContext } from "../../../contexts/contexts/corte.coracao.context"
import { TabelasCorteCoracao } from "../../../componentes/corte_coracao/tabelas/tabelas.corte_coracao"
import { CadastroLoteEtiqueta } from "../_sub_pages/cadastro.edicao.lote.etiqueta"
import { GeradorEtiquetas } from "../_sub_pages/gerador_etiquetas"
import { MenuPrincipalCorteCoracao } from "../_sub_pages/menu"

export const SubPagesCorteCoracao = () => {

    const { cCorteCoracao, funcoes } = useContext(CorteCoracaoContext)
    const dataContext = useContext(DataContext)

    useEffect(() => {
        funcoes.gControleCorteCoracao("menu", "tab", false)
        funcoes.gControleCorteCoracao("lotes_etiquetas", "tabela", false)
        dataContext.funcoes.loadLocalStorage()
    }, [])

    const sx = {
        width: "100%",
        heigth: "100%",
        display: "flex",
        padding: "20px 0",
    }

    return (
        <Stack sx={sx}>
            {cCorteCoracao.tab !== "menu" ? <Divider color="#dbdbdb" sx={{ height: 3, marginBottom: "5px" }} /> : <></>}
            {cCorteCoracao.tab === "menu" ? <MenuPrincipalCorteCoracao /> : <></>}
            {cCorteCoracao.tab === "resumo_lotes_etiquetas" ? <TabelasCorteCoracao minHeigth={540} /> : <></>}
            {cCorteCoracao.tab === "resumo_etiquetas" ? <TabelasCorteCoracao minHeigth={540} tabela="lista_etiquetas" dados={cCorteCoracao.lista_etiquetas} /> : <></>}
            {cCorteCoracao.tab === "cadastro_lote" ? <CadastroLoteEtiqueta /> : <></>}
            {cCorteCoracao.tab === "gerador_etiquetas" ? <GeradorEtiquetas /> : <></>}
        </Stack>
    )
}