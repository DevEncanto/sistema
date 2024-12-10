import { useContext } from "react"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { Button } from "@mui/material"
import PlusIcon from "@heroicons/react/24/solid/PlusIcon"

export const BotaoNovoStatus = () => {

    const { funcoes, cCorteCoracao } = useContext(CorteCoracaoContext)
    const subPages = ["tab12"]

    const handleClickNovoLote = () => {
        funcoes.gControleCorteCoracao("tab13", "tab", false)
        funcoes.gControleCorteCoracao("tab12", "return", false)
    }

    return (
        subPages.includes(cCorteCoracao.tab) ?
            <Button
                key={`btn_entrada`}
                variant='contained'
                onClick={handleClickNovoLote}
                startIcon={<PlusIcon height={20} width={20} fontWeight={600} />}
            >
                Novo Status
            </Button> :
            <></>
    )
}