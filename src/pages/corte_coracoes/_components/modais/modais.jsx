import { useContext } from "react"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { ModalFeedBack } from "../../_sub_pages/modal.feedback.user"
import { MenuFiltroEtiquetas } from "./modal.filtro.etiquetas"
import { Stack } from "@mui/material"

const { ModalFiltroListaEtiquetas } = require("./modal.filtro.lista.etiquetas/modal.filtro.lista.etiquetas")

export const Modais = () => {

    const { cCorteCoracao: { tab } } = useContext(CorteCoracaoContext)

    return (
        <Stack
            sx={{
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ModalFiltroListaEtiquetas />
            {tab === "MOD1" && <ModalFeedBack />}
            {tab === "MOD2" && <MenuFiltroEtiquetas />}
        </Stack>
    )
}