import { MenuItem, FormControl, InputLabel, Select } from "@mui/material"
import { SeverityPill } from "./severity-pill"

export const Seletor = (props) => {


    const {
        value = "",
        handleChange = () => { },
        itens = [],
        label = "",
        isSeverityPill = false,
        width = "160px",
        height = "30px",
        type = ""
    } = props

    const statusFiltro = {
        PENDENTE: 'warning',
        "À RECEBER": 'warning',
        PAGO: 'success',
        RECEBIDO: 'success',
        CANCELADO: 'error',
        TODOS: 'primary',
        VISIVEL: 'success',
        OCULTO: 'error'
    }

    return (
        <Select
            sx={{
                height: height,
                width: width,
                border: "none",
                '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' },
                '.MuiOutlinedInput-notchedOutline.Mui-focused ': { borderStyle: 'none' }
            }}

            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Age"
            onChange={(e) => { handleChange(e.target.value) }}
        >
            {
                itens.map((item, index) => {
                    return (
                        <MenuItem
                            sx={{ cursor: "pointer" }}
                            key={`seletor${index + 1}`}
                            value={item}>
                            {isSeverityPill ?
                                <SeverityPill
                                    sx={{ cursor: "pointer" }}
                                    color={type != "" ? type : statusFiltro[item]}>
                                    {item}
                                </SeverityPill> :
                                item
                            }
                        </MenuItem>

                    )
                })
            }
        </Select >
    )
}