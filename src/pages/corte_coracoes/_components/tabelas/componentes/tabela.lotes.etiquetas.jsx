import { useContext, useEffect } from "react"
import { DataContext } from "../../../../../contexts/contexts/data.context"
import { TabelasCorteCoracao } from "./tabelas.corte_coracao"
import { CorteCoracaoContext } from "../../../../../contexts/contexts/corte.coracao.context"

export const TabelaLotesEtiquetas = () => {

    const { dData } = useContext(DataContext)
    const { funcoes } = useContext(CorteCoracaoContext)

    useEffect(() => {
        funcoes.gControleCorteCoracao("M1", "return", false)
    }, [])

    return (
        <TabelasCorteCoracao
            minHeigth={540}
            tabela="lotes_etiquetas"
            dados={dData.lotes_etiquetas}
        />
    )
}