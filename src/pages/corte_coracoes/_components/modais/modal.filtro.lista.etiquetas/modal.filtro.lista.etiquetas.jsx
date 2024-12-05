import { MenuPrincipal } from "./menu.principal"
import { SelecionarAreas } from "./selecionar.areas"
const { useContext } = require("react")
const { CorteCoracaoContext } = require("../../../../../contexts/contexts/corte.coracao.context")

export const ModalFiltroListaEtiquetas = () => {

    const { cCorteCoracao } = useContext(CorteCoracaoContext)

    return (
        <>
            {cCorteCoracao.tab == "tab3" && <MenuPrincipal />}
            {cCorteCoracao.tab == "tab9" && <SelecionarAreas />}
        </>
    )
}   