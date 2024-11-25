import { Stack } from "@mui/material";

export const ContainerDashboard = (props) => {
    const { padding = "5px",children, width, height, bkColor = "#fff", direction = "column" } = props;

    const sx = {
        height: height,
        width: width,
        backgroundColor: bkColor,
        alignItems: "center", // Corrigir alignItens para alignItems
        justifyContent: "center",
        borderRadius: "12px",
        border: "solid 1px grey",
        padding: padding
        // boxShadow: "0px 0px 5px 4px rgba(0,0,0,0.2)",
    };

    return (
        <Stack direction={direction} sx={sx} spacing={.5}>
            {children}
        </Stack>
    );
};
