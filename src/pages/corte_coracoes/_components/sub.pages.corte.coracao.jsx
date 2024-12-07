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
import { MenuFiltroListaEtiquetas } from "./modais/modal.filtro.lista.etiquetas/menu.principal"
import { ModalFiltroListaEtiquetas } from "./modais/modal.filtro.lista.etiquetas/modal.filtro.lista.etiquetas"

export const SubPagesCorteCoracao = () => {

    const { cCorteCoracao, funcoes } = useContext(CorteCoracaoContext)
    const dataContext = useContext(DataContext)

    useEffect(() => {
        funcoes.gControleCorteCoracao("tab5", "tab", false)
        funcoes.gControleCorteCoracao("lotes_etiquetas", "tabela", false)
        dataContext.funcoes.loadLocalStorage()
    }, [])


    const tabsCenter = ["tab2", "tab3", "tab9", "tab10"]

    const tabelas = [
        "tab4",
        "medias_cachos"
    ]

    const divideHide = [
        "tab5",
        "previsao_colheita"
    ]

    const sx = {
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "20px 0",
        alignItems: tabsCenter.includes(cCorteCoracao.tab) ? "center" : "",
        justifyContent: tabsCenter.includes(cCorteCoracao.tab) ? "center" : ""
    }

    return (
        <Stack sx={sx}>
            {/* {JSON.stringify(cCorteCoracao)} */}
            {cCorteCoracao.tab === "tab1" && <ModalFeedBack />}
            {cCorteCoracao.tab === "tab2" && <MenuFiltroEtiquetas />}
            <ModalFiltroListaEtiquetas />
            {!divideHide.includes(cCorteCoracao.tab) && <Divider color="#dbdbdb" sx={{ height: 3, marginBottom: "5px" }} />}
            {cCorteCoracao.tab === "tab5" && <MenuPrincipalCorteCoracao />}
            {tabelas.includes(cCorteCoracao.tab) && <TabelasCorteCoracao minHeigth={540} />}
            {cCorteCoracao.tab === "tab6" ? <TabelasCorteCoracao minHeigth={540} tabela="lista_etiquetas" dados={cCorteCoracao.lista_etiquetas} /> : <></>}
            {cCorteCoracao.tab === "tab7" ? <TabelasCorteCoracao minHeigth={540} tabela="previsoes_mensais" dados={dataContext.dData.previsoes_mensais} /> : <></>}
            {cCorteCoracao.tab === "tab8" && <CadastroLoteEtiqueta />}
            {cCorteCoracao.tab === "gerador_etiquetas" && <GeradorEtiquetas />}
            {cCorteCoracao.tab === "previsao_colheita" && <PrevisaoColheita />}
        </Stack>
    )
}