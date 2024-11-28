import { Box, Button, Divider, MenuItem, MenuList, Popover, Stack, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { useState } from 'react';
import { CorteCoracaoContext } from '../../../../contexts/contexts/corte.coracao.context';
import { SeletorAreas } from '../seletor.areas';

export const FilterPopoverListaEtiquetas = (props) => {
    const { anchorEl, onClose, open } = props;

    const [filtro, setFiltro] = useState("")
    const { funcoes } = useContext(CorteCoracaoContext)

    const handleFiltrar = () => {

    }

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={onClose}
            open={open}
            PaperProps={{ sx: { width: 400 } }}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2
                }}
            >
                <Typography variant="overline">
                    Filtro de etiquetas
                </Typography>
            </Box>
            <Divider color="#dbdbdb" sx={{ height: 2, marginBottom: "5px" }} />
            <Stack
                sx={{ alignItems: "center" }}
            >
                <SeletorAreas />
            </Stack>
        </Popover>
    );
};

