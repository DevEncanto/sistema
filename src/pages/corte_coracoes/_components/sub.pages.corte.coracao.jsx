import { Divider, Stack } from "@mui/material"
import { useContext, useEffect } from "react"
import { DataContext } from "../../../contexts/contexts/data.context"
import { CorteCoracaoContext } from "../../../contexts/contexts/corte.coracao.context"
import { CadastroLoteEtiqueta } from "../_sub_pages/cadastro.edicao.lote.etiqueta"
import { GeradorEtiquetas } from "../_sub_pages/gerador_etiquetas"
import { MenuPrincipalCorteCoracao } from "../_sub_pages/menu"
import { ModalFeedBack } from "../_sub_pages/modal.feedback.user"
import { TabelasCorteCoracao } from "./tabelas/tabelas.corte_coracao"
import { PrevisaoColheita } from "../_sub_pages/previsao.colheita"
import { MenuFiltroEtiquetas } from "./modais/modal.filtro.etiquetas"

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
        height: "100%",
        display: "flex",
        padding: "20px 0",
        alignItems: cCorteCoracao.tab.includes("modal") ? "center" : "",
        justifyContent: cCorteCoracao.tab.includes("modal") ? "center" : ""
    }

    const tabelas = [
        "resumo_lotes_etiquetas",
        "medias_cachos"
    ]

    const divideHide = [
        "menu",
        "previsao_colheita"
    ]

    return (
        <Stack sx={sx}>
            {/* {JSON.stringify(cCorteCoracao)} */}
            {cCorteCoracao.tab === "modal_feedback" && <ModalFeedBack />}
            {cCorteCoracao.tab === "modal_menu_etiquetas" && <MenuFiltroEtiquetas />}
            {!divideHide.includes(cCorteCoracao.tab) && <Divider color="#dbdbdb" sx={{ height: 3, marginBottom: "5px" }} />}
            {cCorteCoracao.tab === "menu" && <MenuPrincipalCorteCoracao />}
            {tabelas.includes(cCorteCoracao.tab) && <TabelasCorteCoracao minHeigth={540} />}
            {cCorteCoracao.tab === "resumo_etiquetas" ? <TabelasCorteCoracao minHeigth={540} tabela="lista_etiquetas" dados={cCorteCoracao.lista_etiquetas} /> : <></>}
            {cCorteCoracao.tab === "previsoes_mensais" ? <TabelasCorteCoracao minHeigth={540} tabela="previsoes_mensais" dados={dataContext.dData.previsoes_mensais} /> : <></>}
            {cCorteCoracao.tab === "cadastro_lote" && <CadastroLoteEtiqueta />}
            {cCorteCoracao.tab === "gerador_etiquetas" && <GeradorEtiquetas />}
            {cCorteCoracao.tab === "previsao_colheita" && <PrevisaoColheita />}
        </Stack>
    )
}