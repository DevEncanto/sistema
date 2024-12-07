import { DataContext } from "../../../../../contexts/contexts/data.context"
import { logger } from "../../../../../utils/logger"
import { MenuPrincipal } from "./menu.principal"
import { SelecionarAreas } from "./selecionar.areas"
import { SelecionarStatus } from "./selecionar.status"
const { useContext, useEffect } = require("react")
const { CorteCoracaoContext } = require("../../../../../contexts/contexts/corte.coracao.context")

export const ModalFiltroListaEtiquetas = () => {

    const { dCorteCoracao,cCorteCoracao, funcoes } = useContext(CorteCoracaoContext)
    const { dData } = useContext(DataContext)

    useEffect(() => {
        logger("Executando")
        const areas_filtro = dData.areas.map(area => ({ area: area.nome, selected: true }))
        const status_filtro = dData.status.map(status => ({ status: status.nome, selected: true }))
        funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "areas", areas_filtro, false)
        funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "status", status_filtro, false)
    }, [])

    return (
        <>
            {JSON.stringify(dCorteCoracao.filtro_lista_etiquetas.status )}
            {cCorteCoracao.tab == "tab3" && <MenuPrincipal />}
            {cCorteCoracao.tab == "tab9" && <SelecionarAreas />}
            {cCorteCoracao.tab == "tab10" && <SelecionarStatus />}
        </>
    )
}   