import { DataContext } from "../../../contexts/contexts/data.context"
import { TabelaListaEtiquetas } from "./tabelas/componentes/tabela.lista.etiquetas"
import { TabelaLotesEtiquetas } from "./tabelas/componentes/tabela.lotes.etiquetas"
import { TabelasCorteCoracao } from "./tabelas/componentes/tabelas.corte_coracao"

const { useContext } = require("react")
const { CorteCoracaoContext } = require("../../../contexts/contexts/corte.coracao.context")

export const Tabelas = () => {

    const { cCorteCoracao } = useContext(CorteCoracaoContext)
    const tab = cCorteCoracao.tab
    const { dData } = useContext(DataContext)

    return (
        <>
            {tab === "TAB1" && <TabelaLotesEtiquetas />}
            {tab === "TAB2" &&
                <TabelasCorteCoracao
                    minHeigth={540}
                    tabela="medias_cachos"
                    dados={dData.medias_cachos}
                />
            }
            {tab === "TAB3" &&
                <TabelasCorteCoracao
                    minHeigth={540}
                    tabela="previsoes_mensais"
                    dados={dData.previsoes_mensais}
                />
            }
            {tab === "TAB4" &&
                <TabelasCorteCoracao
                    minHeigth={540}
                    tabela="lista_etiquetas"
                    dados={cCorteCoracao.lista_etiquetas}
                />}

            {tab === "TAB5" &&
                <TabelasCorteCoracao
                    minHeigth={540}
                    tabela="status_etiqueta"
                    dados={dData.status}
                />
            }
        </>
    )
}