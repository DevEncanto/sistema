import { useContext } from "react"
import { CorteCoracaoContext } from "../../../contexts/corte.coracao.context"

const { Button } = require("@mui/material")
const { BsQrCode } = require("react-icons/bs")

export const BotaoGerarQRCode = (props) => {
    const { id_lote } = props[0]
    const { funcoes } = useContext(CorteCoracaoContext)

    const handleClick = () => {
        funcoes.gControleCorteCoracao("gerador_etiquetas", "tab", false)
        funcoes.gControleCorteCoracao(id_lote.toString(), "id_lote", false)
    }

    return (
        <Button
            startIcon={<BsQrCode />}
            sx={{
                fontSize: "12px",
                padding: 1.3
            }}
            key={`btn_entrada`}
            variant='contained'
            onClick={handleClick}
        >
            Gerar
        </Button>
    )
}