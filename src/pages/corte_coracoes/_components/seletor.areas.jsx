import { MenuItem, FormControl, InputLabel, Select } from "@mui/material"
import { useContext } from "react"
import { DataContext } from "../../../contexts/contexts/data.context"
import { SeverityPill } from "../../../components/severity-pill"

export const SeletorAreas = (props) => {

    const { dData } = useContext(DataContext)
    const data = ["Sem Área", ...dData.areas.map(area => area.nome)]

    const {
        value = [], // Inicializando como um array vazio para suportar múltiplas seleções
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

    const handleSelectionChange = (e) => {
        // O valor será um array de seleções
        handleChange(e.target.value)
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
            label="Área"
            multiple // Adiciona suporte a múltiplas seleções
            onChange={handleSelectionChange}
            renderValue={(selected) => selected.join(", ")} // Exibe as opções selecionadas
        >
            {data.map((item, index) => {
                return (
                    <MenuItem
                        sx={{ cursor: "pointer" }}
                        key={`seletor${index + 1}`}
                        value={item}>
                        {isSeverityPill ?
                            <SeverityPill
                                sx={{ cursor: "pointer" }}
                                color={type !== "" ? type : statusFiltro[item]}>
                                {item}
                            </SeverityPill>
                            :
                            item
                        }
                    </MenuItem>
                )
            })}
        </Select >
    )
}
