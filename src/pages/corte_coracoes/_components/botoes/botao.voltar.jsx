import { Button } from "@mui/material"
import { useContext } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"

export const BotaoVoltar = () => {

    const { funcoes, cCorteCoracao } = useContext(CorteCoracaoContext)
    const subPages = ["tab5", "tab8", "tab1"]


    const handleClickVoltar = () => {
        funcoes.gControleCorteCoracao(cCorteCoracao.return, "tab", false)
        funcoes.gControleCorteCoracao("lotes_etiquetas", "tabela", false)
        if (cCorteCoracao.return === "tab4") {
            funcoes.gControleCorteCoracao("tab5", "return", false)
        }
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
                Voltar
            </Button>
            :
            <></>
    )
}