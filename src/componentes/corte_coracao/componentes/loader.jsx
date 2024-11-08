
const { Stack, Typography } = require("@mui/material")

export const LoaderEstatico = () => {

    return (
        <Stack
            spacing={0}
            sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                marginTop: "120px"
            }}
        >
            <img src="/assets/logo_encanto_transparente.png" width={130} height={130} />
            <Typography
                variant="h5"
                fontSize={20}
            >
                Gerando Etiquetas...
            </Typography>
        </Stack>
    )
}