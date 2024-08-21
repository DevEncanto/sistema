import { Stack } from "@mui/material"
import { TabelaInsumos } from "./estoque_insumos"
import { entradaInsumos, insumos } from "./data"
import { EntradaInsumos, TabelaEntradaInsumos } from "./entrada_insumos"
import { useContext } from "react"
import { UserContext } from "../../contexts/user_context/user_context"
import { EstoqueContext } from "../../contexts/components_context/estoque_context"

export const TabsInsumos = () => {

    const { controle } = useContext(EstoqueContext)
    const sx = {
        width: "100%",
        heigth: "100%",
        display: "flex",
        padding: "-20px 0",
    }


    return (
        <Stack sx={sx}>
            {controle.tab === "resumo" ? <TabelaInsumos /> : <></>}
            {controle.tab === "entradas" ? <EntradaInsumos /> : <></>}
            {controle.tab === "saidas" ? <TabelaInsumos /> : <></>}
        </Stack>
    )
}