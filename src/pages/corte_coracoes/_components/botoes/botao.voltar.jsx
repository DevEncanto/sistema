import { Button, Typography } from "@mui/material"
import { useContext } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"

export const BotaoVoltar = () => {

    const { funcoes, cCorteCoracao } = useContext(CorteCoracaoContext)
    const subPages = ["M1", "CAD1"]


    const handleClickVoltar = () => {
        funcoes.gControleCorteCoracao(cCorteCoracao.return, "tab", false)
    }

    return (
        !subPages.includes(cCorteCoracao.tab)
            ?
            <Button
                key={`btn_entrada`}
                variant='contained'
                onClick={handleClickVoltar}
                startIcon={<BsArrowLeft height={20} width={20} fontWeight={600} />}
            >
                 <Typography variant="overline" fontSize={11}>
                    voltar
                </Typography>
            </Button>
            :
            <></>
    )
}