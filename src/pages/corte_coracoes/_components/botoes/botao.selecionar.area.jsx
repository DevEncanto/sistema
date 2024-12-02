import { BsCheck, BsTrash } from "react-icons/bs"
import { logger } from "../../../../utils/logger"

const { Button, Typography, Tooltip, Stack } = require("@mui/material")
const { useContext } = require("react")
const { CorteCoracaoContext } = require("../../../../contexts/contexts/corte.coracao.context")

export const BotaoSelecionarRemoverArea = (props) => {

    const { nome } = props
    const { dCorteCoracao: { filtro_lista_etiquetas }, funcoes } = useContext(CorteCoracaoContext)
    logger("TESTE 1")
    logger(nome)
    const handleClick = () => {
        let array = [...filtro_lista_etiquetas.areas]

        array.forEach(item => {
            if (item.area === nome) {
                item.selected = !item.selected
            }
        })
        funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "areas", array, false)
    }
    logger("TESTE 2")

    const selected = filtro_lista_etiquetas.areas.find(item => item.area === nome)?.selected

    logger(selected)

    return (

        <Button
            onClick={handleClick}
            startIcon={selected ? <BsTrash fontSize={25} /> : <BsCheck fontSize={25} />}
            variant="contained"
            sx={{
                width: "100px",
                backgroundColor: selected ? "error.main" : "success.main",
                "&:hover": {
                    backgroundColor: selected ? "error.dark" : "success.dark",
                },
            }}
        >
            <Typography variant="overline" fontSize={10}>
                {selected ? "remover" : "adicionar"}
            </Typography>
        </Button>
    )
}