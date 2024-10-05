import { Stack } from "@mui/material"
import { useContext, useEffect } from "react"
import { EstoqueContext } from "../../../contexts/components_context/estoque_context"
import { EntradaInsumos } from "../pages/entrada_insumos"
import { TabelaEstoque } from "../tabelas/tabelas_estoque"
import { DataContext } from "../../../contexts/data_context/data_context"
import { SaidaInsumos } from "../pages/saida_insumos"

export const TabsInsumos = () => {

    const { controleEstoque } = useContext(EstoqueContext)
    const { loadLocalStorage } = useContext(DataContext)

    useEffect(() => {
        loadLocalStorage()
    }, [])

    const sx = {
        width: "100%",
        heigth: "100%",
        display: "flex",
        padding: "-20px 0",
    }


    return (
        <Stack sx={sx}>
            {controleEstoque.tab === "resumo" ? <TabelaEstoque /> : <></>}
            {controleEstoque.tab === "entradas" ? <EntradaInsumos /> : <></>}
            {controleEstoque.tab === "saidas" ? <SaidaInsumos /> : <></>}
        </Stack>
    )
}