import { useContext, useState } from "react"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { DataContext } from "../../../../contexts/contexts/data.context"
import { logger } from "../../../../utils/logger"

const { Button, Tooltip } = require("@mui/material")
const { BsPencil, BsCheck } = require("react-icons/bs")

export const BotaoSelecionarPrevisaoMensal = (props) => {
    const { status, id_media_cacho, index } = props
    const { funcoes, cCorteCoracao } = useContext(CorteCoracaoContext)
    const { dData } = useContext(DataContext)


    const [load, setLoad] = useState(false)


    const handleClick = () => {
        logger(props)
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 2000)
    }

    const title = load ? "Atualizando as médias!" : "Clique para selecionar a média"


    return (
        <>
            {status === "Sem uso" && <Tooltip title={title} placement="top" arrow >
                {load && id_media_cacho === index ?
                    <img src="/assets/loading.svg" width={43.7} height={43.7} />
                    :
                    <Button
                        startIcon={<BsCheck />}
                        sx={{
                            fontSize: "12px",
                            padding: 1.4
                        }}
                        key={`btn_entrada`}
                        variant='contained'
                        onClick={handleClick}
                    >
                        Selecionar
                    </Button>
                }
            </Tooltip>}
        </>
    )
}