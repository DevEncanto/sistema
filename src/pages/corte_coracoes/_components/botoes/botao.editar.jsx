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
        // Encontrar o lote etiqueta correspondente
        const lote_etiqueta = dData.lotes_etiquetas.find(lote => lote.id_lote_etiqueta === id_lote_etiqueta)
    
        if (!lote_etiqueta) {
            console.error('Lote etiqueta não encontrado')
            return
        }
    
        // Extrair informações necessárias
        const { etiquetas, criacao, etiqueta_inicial, etiqueta_final } = lote_etiqueta
        const data_corte = converterDataCalendario(criacao)
        const previsao_mensal = dData.previsoes_mensais
    
        // Chamar funções agrupando lógica repetitiva
        const controles = [
            { valor: "TAB1", alvo: "return" },
            { valor: id_lote_etiqueta.toString(), alvo: "id_lote" },
            { valor: "CAD1", alvo: "tab" },
            { valor: true, alvo: "edicao" }
        ]
    
        // Atualizar dados e previsões
        funcoes.gDadosCorteCoracao("lote_etiqueta", "etiqueta_inicial", etiqueta_inicial, false)
        funcoes.gDadosCorteCoracao("lote_etiqueta", "etiqueta_final", etiqueta_final, false)
        funcoes.gerarPrevisao(data_corte, previsao_mensal)
    
        // Atualizar controles
        controles.forEach(({ valor, alvo }) => funcoes.gControleCorteCoracao(valor, alvo, false))
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