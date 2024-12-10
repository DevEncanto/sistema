import { useContext } from "react"
import { CorteCoracaoContext } from "../../../contexts/contexts/corte.coracao.context"
import { GeradorEtiquetas } from "../_sub_pages/gerador_etiquetas"
import { PrevisaoColheita } from "../_sub_pages/previsao.colheita"

export const OutrosComponentes = () => {

    const { cCorteCoracao: { tab } } = useContext(CorteCoracaoContext)

    return (
        <>
            {tab === "COMP1" && <GeradorEtiquetas />}
            {tab === "COMP2" && <PrevisaoColheita />}
        </>
    )
}   