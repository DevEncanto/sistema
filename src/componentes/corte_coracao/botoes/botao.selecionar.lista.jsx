import { useContext } from "react"
import { CorteCoracaoContext } from "../../../contexts/contexts/corte.coracao.context"
import { DataContext } from "../../../contexts/contexts/data.context"

const { Button } = require("@mui/material")
const { BsEye } = require("react-icons/bs")

export const BotaoListarEtiquetas = (props) => {
    const { id_lote_etiqueta } = props[0]
    const { funcoes } = useContext(CorteCoracaoContext)
    const { dData } = useContext(DataContext)

    const handleClick = () => {
        const lista = dData.lotes_etiquetas.find(lote => lote.id_lote_etiqueta)?.etiquetas
        funcoes.gControleCorteCoracao("lista_etiquetas", "tabela", false)
        funcoes.gControleCorteCoracao(lista, "lista_etiquetas", false)
        funcoes.gControleCorteCoracao(id_lote_etiqueta.toString(), "id_lote", false)
        funcoes.gControleCorteCoracao("resumo_etiquetas", "tab", false)
    }

    return (
        <Button
            startIcon={<BsEye />}
            sx={{
                fontSize: "12px",
                padding: 1.3
            }}
            key={`btn_entrada`}
            variant='contained'
            onClick={handleClick}
        >
            Visualizar
        </Button>
    )
}