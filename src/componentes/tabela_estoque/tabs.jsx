import { Stack } from "@mui/material"
import { TabelaInsumos } from "./estoque_insumos"
import { entradaInsumos, insumos } from "./data"
import { EntradaInsumos, TabelaEntradaInsumos } from "./entrada_insumos"
import { useContext } from "react"
import { UserContext } from "../../contexts/user-context"

export const TabsInsumos = () => {

    const { tab } = useContext(UserContext)
    const sx = {
        width: "100%",
        heigth: "100%",
        display: "flex",
        padding: "-20px 0",
    }


    return (
        <Stack sx={sx}>
            {tab === "resumo" ? <TabelaInsumos /> : <></>}
            {tab === "entradas" ? <EntradaInsumos /> : <></>}
            {tab === "saidas" ? <TabelaInsumos /> : <></>}
        </Stack>
    )
}