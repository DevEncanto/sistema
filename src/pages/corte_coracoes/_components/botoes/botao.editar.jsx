import { useContext } from "react"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { DataContext } from "../../../../contexts/contexts/data.context"

const { Button, Tooltip } = require("@mui/material")
const { BsPencil } = require("react-icons/bs")

export const BotaoEditarLotesEtiquetas = (props) => {
    const { id_lote_etiqueta } = props
    const { funcoes } = useContext(CorteCoracaoContext)
    const { dData } = useContext(DataContext)

    const handleClick = () => {
        const lista = dData.lotes_etiquetas.find(lote => lote.id_lote_etiqueta === id_lote_etiqueta)?.etiquetas
        const lote_etiqueta = dData.lotes_etiquetas.find(lote => lote.id_lote_etiqueta === id_lote_etiqueta)
        const data = {
            data_corte: lote_etiqueta.data_corte,
            data_prevista: lote_etiqueta.data_prevista,
            semana_corte: lote_etiqueta.semana_corte,
            semana_colheita: lote_etiqueta.semana_colheita,
            etiqueta_inicial: lote_etiqueta.etiqueta_inicial,
            etiqueta_final: lote_etiqueta.etiqueta_final,
            total_etiquetas: lote_etiqueta.etiqueta_final - lote_etiqueta.etiqueta_inicial + 1,
            ano_corte: lote_etiqueta.ano_corte,
            ano_colheita: lote_etiqueta.ano_colheita
        }
        funcoes.gControleCorteCoracao("lista_etiquetas", "tabela", false)
        funcoes.gControleCorteCoracao(lista, "lista_etiquetas", false)
        funcoes.gControleCorteCoracao("resumo_lotes_etiquetas", "return", false)
        funcoes.gControleCorteCoracao(id_lote_etiqueta.toString(), "id_lote", false)
        funcoes.gControleCorteCoracao("cadastro_lote", "tab", false)
        funcoes.gControleCorteCoracao(true, "edicao", false)
        funcoes.dControleCorteCoracaoSimple(data, "lote_etiqueta", false)
    }

    return (
        <Tooltip title="Clique para editar o lote!" arrow>
            <Button
                startIcon={<BsPencil />}
                sx={{
                    fontSize: "12px",
                    padding: 1.4
                }}
                key={`btn_entrada`}
                variant='contained'
                onClick={handleClick}
            >
                Editar
            </Button>
        </Tooltip>
    )
}