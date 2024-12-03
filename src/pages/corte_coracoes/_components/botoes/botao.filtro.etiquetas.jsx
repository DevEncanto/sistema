import { useContext } from "react"
import { Button, Stack } from "@mui/material"
import { BsFilter } from "react-icons/bs"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"


export const BotaoFiltroEtiquetas = () => {

    const { cCorteCoracao, funcoes } = useContext(CorteCoracaoContext)
    const subPages = ["gerador_etiquetas"]
    const handleClick = () => {
        funcoes.gControleCorteCoracao("tab2", "tab", false)
    }
    
    return (
        subPages.includes(cCorteCoracao.tab) ?
            <Stack>
                <Button
                    key={`btn_entrada`}
                    variant='contained'
                    onClick={handleClick}
                    startIcon={<BsFilter height={20} width={20} fontWeight={600} />}
                >
                    Filtros
                </Button>

            </Stack>
            :
            <></>
    )
}