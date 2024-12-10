import { Stack } from "@mui/material"
import { useContext, useEffect } from "react"
import { DataContext } from "../../../contexts/contexts/data.context"
import { CorteCoracaoContext } from "../../../contexts/contexts/corte.coracao.context"
import { Cadastros } from "./cadastros"
import { Modais } from "./modais/modais"
import { DividerPages } from "./divider"
import { Tabelas } from "./tabelas"
import { OutrosComponentes } from "./outros.componentes"
import { Menu } from "../_sub_pages/menu"

export const SubPagesCorteCoracao = () => {

    const { cCorteCoracao, funcoes } = useContext(CorteCoracaoContext)
    const dataContext = useContext(DataContext)

    useEffect(() => {
        funcoes.gControleCorteCoracao("M1", "tab", false)
        dataContext.funcoes.loadLocalStorage()
    }, [])

    const sx = {
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "20px 0",
        alignItems: cCorteCoracao.tab.includes("MOD") ? "center" : "",
        justifyContent: cCorteCoracao.tab.includes("MOD") ? "center" : ""
    }

    return (
        <Stack sx={sx}>
            {`TAB: ${cCorteCoracao.tab}`}
            <Menu/>
            <Modais />
            <DividerPages />
            <Tabelas />
            <Cadastros />
            <OutrosComponentes />
        </Stack>
    )
}