import { useContext } from "react"
import { Button, Stack } from "@mui/material"
import { usePopover } from "../../../../hooks/use.popover.filters"

import { BsFilter } from "react-icons/bs"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { FilterPopoverListaEtiquetas } from "../filtros/filtro.popover.lista.etiquetas"

export const BotaoFiltroListaEtiquetas = () => {

    const filterPopover = usePopover()
    const { cCorteCoracao, funcoes } = useContext(CorteCoracaoContext)
    const subPages = ["resumo_etiquetas"]
    const handleClick = () => {
        funcoes.gControleCorteCoracao("modal_menu_etiquetas", "tab", false)
    }


    return (
        subPages.includes(cCorteCoracao.tab) ?
            <Stack>
                <Button
                    ref={filterPopover.anchorRef}
                    key={`btn_entrada`}
                    variant='contained'
                    onClick={handleClick}
                    startIcon={<BsFilter height={20} width={20} fontWeight={600} />}
                >
                    Filtros LE
                </Button>
                <FilterPopoverListaEtiquetas
                    anchorEl={filterPopover.anchorRef.current}
                    open={filterPopover.open}
                    onClose={filterPopover.handleToggle}
                />
            </Stack>
            :
            <></>
    )
}