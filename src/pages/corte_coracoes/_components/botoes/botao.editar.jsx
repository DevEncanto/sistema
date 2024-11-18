import { useContext } from "react"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { DataContext } from "../../../../contexts/contexts/data.context"
import { converterDataCalendario } from "../../../../utils/gerador-datas"

const { Button, Tooltip } = require("@mui/material")
const { BsPencil } = require("react-icons/bs")

export const BotaoEditarLotesEtiquetas = (props) => {
    const { id_lote_etiqueta } = props
    const { funcoes } = useContext(CorteCoracaoContext)
    const { dData } = useContext(DataContext)

    const handleClick = () => {
        const lista = dData.lotes_etiquetas.find(lote => lote.id_lote_etiqueta === id_lote_etiqueta)?.etiquetas
        const lote_etiqueta = dData.lotes_etiquetas.find(lote => lote.id_lote_etiqueta === id_lote_etiqueta)
        const data_corte = converterDataCalendario(lote_etiqueta.criacao)
        const previsao_mensal = dData.previsao_mensal
        funcoes.gDadosCorteCoracao("lote_etiqueta", "etiqueta_inicial", lote_etiqueta.etiqueta_inicial, false)
        funcoes.gDadosCorteCoracao("lote_etiqueta", "etiqueta_final", lote_etiqueta.etiqueta_final, false)
        funcoes.gerarPrevisao(data_corte, previsao_mensal)
        funcoes.gControleCorteCoracao("lista_etiquetas", "tabela", false)
        funcoes.gControleCorteCoracao(lista, "lista_etiquetas", false)
        funcoes.gControleCorteCoracao("resumo_lotes_etiquetas", "return", false)
        funcoes.gControleCorteCoracao(id_lote_etiqueta.toString(), "id_lote", false)
        funcoes.gControleCorteCoracao("cadastro_lote", "tab", false)
        funcoes.gControleCorteCoracao(true, "edicao", false)
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