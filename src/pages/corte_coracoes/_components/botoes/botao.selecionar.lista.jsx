import { useContext } from "react"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { DataContext } from "../../../../contexts/contexts/data.context"

const { Button, Tooltip } = require("@mui/material")
const { BsEye, BsEyeFill, BsList } = require("react-icons/bs")

export const BotaoListarEtiquetas = (props) => {
    const { id_lote_etiqueta } = props
    const { funcoes } = useContext(CorteCoracaoContext)
    const { dData } = useContext(DataContext)

    const handleClick = () => {
        const lista = dData.lotes_etiquetas.find(lote => lote.id_lote_etiqueta === id_lote_etiqueta)?.etiquetas
        funcoes.gControleCorteCoracao("lista_etiquetas", "tabela", false)
        funcoes.gControleCorteCoracao(lista, "lista_etiquetas", false)
        funcoes.gControleCorteCoracao("tab4", "return", false)
        funcoes.gControleCorteCoracao(id_lote_etiqueta.toString(), "id_lote", false)
        funcoes.gControleCorteCoracao("tab6", "tab", false)
    }

    return (
        <Tooltip title="Clique para ver os detalhes das etiquetas" arrow>
            <Button
                startIcon={<BsList />}
                sx={{
                    fontSize: "12px",
                    padding: 1.4
                }}
                key={`btn_entrada`}
                variant='contained'
                onClick={handleClick}
            >
                Listar
            </Button>
        </Tooltip>
    )
}