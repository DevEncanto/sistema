import { useContext } from "react"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { Button } from "@mui/material"
import PlusIcon from "@heroicons/react/24/solid/PlusIcon"

export const BotaoNovoLote = () => {

    const { funcoes, cCorteCoracao } = useContext(CorteCoracaoContext)
    const subPages = ["resumo_lotes_etiquetas"]


    const handleClickNovoLote = () => {
        funcoes.gControleCorteCoracao("cadastro_lote", "tab", false)
        funcoes.gControleCorteCoracao("resumo_lotes_etiquetas", "return", false)
    }

    return (
        subPages.includes(cCorteCoracao.tab) ?
            <Button
                key={`btn_entrada`}
                variant='contained'
                onClick={handleClickNovoLote}
                startIcon={<PlusIcon height={20} width={20} fontWeight={600} />}
            >
                Novo Lote
            </Button> :
            <></>
    )
}