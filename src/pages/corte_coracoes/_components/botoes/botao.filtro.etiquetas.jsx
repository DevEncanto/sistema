import { useContext } from "react"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { Button, Stack } from "@mui/material"
import PlusIcon from "@heroicons/react/24/solid/PlusIcon"
import { usePopover } from "../../../../hooks/use.popover.filters"
import { FilterPopover } from "../popover.main"
import { BsFilter } from "react-icons/bs"

export const BotaoFiltroEtiquetas = () => {

    const filterPopover = usePopover()
    const { cCorteCoracao } = useContext(CorteCoracaoContext)
    const subPages = ["gerador_etiquetas"]

    return (
        subPages.includes(cCorteCoracao.tab) ?
            <Stack>
                
                <Button
                    ref={filterPopover.anchorRef}
                    key={`btn_entrada`}
                    variant='contained'
                    onClick={filterPopover.handleOpen}
                    startIcon={<BsFilter height={20} width={20} fontWeight={600} />}
                >
                    Filtros
                </Button>
                <FilterPopover
                    anchorEl={filterPopover.anchorRef.current}
                    open={filterPopover.open}
                    onClose={filterPopover.handleToggle}
                />
            </Stack>
            :
            <></>
    )
}