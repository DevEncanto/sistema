import { Stack } from "@mui/material"

export const ImageStatusFeedback = (props) => {

    const sx = {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    }

    const { type = "warning" } = props
    return (
        <Stack
            sx={sx}
        >
            {type === "error" ? <img src="/assets/error.svg" width={100} height={100} /> : <></>}
            {type === "success" ? <img src="/assets/sucess.svg" width={80} height={80} /> : <></>}
            {type === "warning" ? <img src="/assets/animations/warning_animation.gif" width={180} height={180} /> : <></>}
        </Stack>
    )

}