import { Button } from "@mui/material";

export const ButtonDefault = ({ onClick, label }) => (
    <Button
        variant="contained"
        onClick={onClick}
        sx={{
            width: "100px",
        }}
    >
        {label}
    </Button>
);