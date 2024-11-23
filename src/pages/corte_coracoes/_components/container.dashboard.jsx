import { Stack } from "@mui/material";

export const ContainerDashboard = (props) => {
    const { children, width, height, bkColor = "white", direction = "column" } = props;

    const sx = {
        height: height,
        width: width,
        backgroundColor: bkColor,
        alignItems: "center", // Corrigir alignItens para alignItems
        justifyContent: "center",
        borderRadius: "12px"
    };

    return (
        <Stack direction={direction} sx={sx}>
            {children}
        </Stack>
    );
};
