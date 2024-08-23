import { Stack } from "@mui/material"
import { useContext } from "react"
import { TabelaInsumos } from "../tabelas/tabela_insumos"
import { EstoqueContext } from "../../../contexts/components_context/estoque_context"
import { EntradaInsumos } from "../pages/entrada_insumos"
import { TabelaEstoqueInsumos } from "../tabelas/tabela_estoque_insumos"

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
            {controle.tab === "resumo" ? <TabelaEstoqueInsumos /> : <></>}
            {controle.tab === "entradas" ? <EntradaInsumos /> : <></>}
            {controle.tab === "saidas" ? <TabelaInsumos /> : <></>}
        </Stack>
    )
}