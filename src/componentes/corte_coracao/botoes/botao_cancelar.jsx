import { Button } from "@mui/material";

export const ButtonCancelar = ({ onClick, label = "Cancelar" }) => (
    <Button
        variant="contained"
        onClick={onClick}
        sx={{
            backgroundColor: "error.main",
            width: "auto",
            "&:hover": {
                backgroundColor: "error.dark",
            },
        }}
    >
        {label}
    </Button>
);