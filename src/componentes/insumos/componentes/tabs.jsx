import { Stack } from "@mui/material"
import { useContext } from "react"
import { EstoqueContext } from "../../../contexts/components_context/estoque_context"
import { EntradaInsumos } from "../pages/entrada_insumos"
import { TabelaEstoqueInsumos } from "../tabelas/tabela_estoque_insumos"

export const TabsInsumos = () => {

    const { controleEstoque } = useContext(EstoqueContext)
    const sx = {
        width: "100%",
        heigth: "100%",
        display: "flex",
        padding: "-20px 0",
    }


    return (
        <Stack sx={sx}>
            {controleEstoque.tab === "resumo" ? <TabelaEstoqueInsumos /> : <></>}
            {controleEstoque.tab === "entradas" ? <EntradaInsumos /> : <></>}
            {controleEstoque.tab === "saidas" ? <TabelaInsumos /> : <></>}
        </Stack>
    )
}