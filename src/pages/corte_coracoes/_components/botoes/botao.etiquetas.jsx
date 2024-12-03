import { useContext } from "react"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { Button, Tooltip } from "@mui/material"
import {  BsTicket } from "react-icons/bs"

export const BotaoGerarQRCode = (props) => {
    const { id_lote_etiqueta } = props
    const { funcoes } = useContext(CorteCoracaoContext)

    const handleClick = () => {
        funcoes.gControleCorteCoracao("gerador_etiquetas", "tab", false)
        funcoes.gControleCorteCoracao("tab4", "return", false)
        funcoes.gControleCorteCoracao(id_lote_etiqueta.toString(), "id_lote", false)
    }

    return (
        <Tooltip title="Clique para gerar as etiquetas!" arrow>
            <Button
                startIcon={<BsTicket />}
                sx={{
                    fontSize: "12px",
                    padding: 1.4
                }}
                key={`btn_entrada`}
                variant="contained"
                onClick={handleClick}
            >
                Gerar
            </Button>
        </Tooltip>
    )
}
