import { Button } from "@mui/material";

export const ButtonSalvar = ({ onClick}) => (
    <Button
        variant="contained"
        onClick={onClick}
        sx={{
            backgroundColor: "success.main",
            width: "100px",
            "&:hover": {
                backgroundColor: "success.dark",
            },
        }}
    >
        Salvar
    </Button>
);