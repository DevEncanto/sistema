import { Divider } from "@mui/material"
const { useContext } = require("react")
const { CorteCoracaoContext } = require("../../../contexts/contexts/corte.coracao.context")

export const DividerPages = () => {

    const { cCorteCoracao: { tab } } = useContext(CorteCoracaoContext)

    const divideHide = [
        "tab5",
        "previsao_colheita"
    ]

    const isVisible = divideHide.includes(tab)

    return (
        <>
            {isVisible && <Divider color="#dbdbdb" sx={{ height: 3, marginBottom: "5px" }} />}
        </>
    )

}