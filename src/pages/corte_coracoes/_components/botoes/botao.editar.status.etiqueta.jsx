import { useContext } from "react"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { DataContext } from "../../../../contexts/contexts/data.context"
import { converterDataCalendario } from "../../../../utils/gerador-datas"

const { Button, Tooltip } = require("@mui/material")
const { BsPencil } = require("react-icons/bs")

export const BotaoEditarStatusEtiquetas = (props) => {
    const { id_status } = props
    const { funcoes } = useContext(CorteCoracaoContext)
    const { dData } = useContext(DataContext)

    const handleClick = () => {
    }


    return (
        <Tooltip title="Clique para editar o status!" arrow>
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