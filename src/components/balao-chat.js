import { CalcWidth } from "./config-componentes/config-calc-width-balao-chat"

const { Stack } = require("@mui/material")

export const BalaoMessage = (props) => {
    const { message, type = "", typeChat = "", horario } = props
    const size = message.length
    const horas = (horas) => {
        const horario = new Date(horas)
        return horario.toLocaleString().slice(12, 17)
    }


    const style = {
        fontFamily: "Inter",
        textAlign: "justify",
        padding: "7px 12px 2px 12px",
        borderRadius: `${type == "user" ? "7px 0 7px 7px" : "0 7px 7px"}`,
        background: `${type == "user" ? "#D9FDD3" : "#fff"}`,
        marginTop: "10px",
        maxWidth: "400px",
        width: `${CalcWidth(size)}px`,
        alignItens: "center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
    }
    const styleMessage = {
        fontFamily: "Inter",
        textAlign: "left"
    }
    const styleHoras = {
        fontFamily: "Inter",
        fontSize: "7pt",
        fontWeigth: 800,
        justifyContent: "right",
        top: "85%",
        boxSizing: "border-box"
    }
    return (
        <Stack sx={style}>
            <div style={styleMessage}>
                {message}
            </div>
            <div style={styleHoras}>{horas(horario)}</div>
        </Stack >
    )
}