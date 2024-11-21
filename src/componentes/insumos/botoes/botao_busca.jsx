import { Stack, SvgIcon } from "@mui/material"
import { useContext } from "react"
import { FaSearch } from "react-icons/fa"
import { EstoqueContext } from "../../../contexts/components_context/estoque_context"

export const ButtonSearch = (props) => {

    const { controleEstoque } = useContext(EstoqueContext)
    
    const {
        onClick = () => { },
        height = "55px",
        width = "55px",
        backgroundColor = "#6366F1",
        sizeIcon = "medium",
        keyButton, 
        marginTop = "0px"
    } = props
    const active = controleEstoque.load && controleEstoque.key == keyButton
    const sx = {
        height: height,
        width: width,
        backgroundColor: active ? "none" : backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10%",
        cursor: "pointer",
        marginTop: marginTop
    }

    const eventClick = () => {
        if (controleEstoque.key === "") {
            onClick()
        }
    }

    return (
        <Stack
            onClick={eventClick}
            sx={sx}
        >
            {active ?
                <img src="/assets/loading.svg" width={50} height={50} />
                : <SvgIcon fontSize={sizeIcon} color="white">
                    <FaSearch />
                </SvgIcon>
            }

        </Stack>
    )
}