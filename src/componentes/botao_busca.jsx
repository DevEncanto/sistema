import { Stack, SvgIcon } from "@mui/material"
import { FaSearch } from "react-icons/fa"

export const ButtonSearch = (props) => {

    const {
        onClick = () => { },
        height = "50px",
        width = "50px",
        backgroundColor = "#6366F1",
        sizeIcon = "medium"
    } = props

    const sx = {
        height: height,
        width: width,
        backgroundColor: backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10%",
        cursor: "pointer",
        marginTop: "1px"
    }

    return (
        <Stack
            onClick={onClick}
            sx={sx}
        >
            <SvgIcon fontSize={sizeIcon} color="white">
                <FaSearch />
            </SvgIcon>
        </Stack>
    )
}