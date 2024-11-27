import { Box, Button, Divider, MenuItem, MenuList, Popover, Stack, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { useState } from 'react';
import { CorteCoracaoContext } from '../../../contexts/contexts/corte.coracao.context';
import { usePopover } from '../../../hooks/use.popover.filters';
import { filter } from 'lodash';
import { logger } from '../../../utils/logger';

export const FilterPopover = (props) => {
    const { anchorEl, onClose, open } = props;

    const [filtro, setFiltro] = useState("")
    const { funcoes } = useContext(CorteCoracaoContext)
    const filterPopover = usePopover()

    const handleFiltrar = () => {
        funcoes.gControleCorteCoracao(filtro, "filtro", false)
        setFiltro("")
        filterPopover.handleToggle()
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
            <Divider />
            <Stack
                sx={{ alignItems: "center" }}
            >
                <Typography textAlign={"left"} fontSize={16} fontWeight={600}>
                    Informe as etiquetas no seguinte formato:
                </Typography>
                <Stack
                    sx={{ margin: "20px 0" }}
                >
                    <Typography textAlign={"left"} fontSize={14} fontWeight={600}>
                        (1-30): Para filtrar intervalos
                    </Typography>
                    <Typography textAlign={"left"} fontSize={14} fontWeight={600}>
                        (3): Para filtrar somente a etiqueta "3"
                    </Typography>
                    <Typography textAlign={"left"} fontSize={14} fontWeight={600}>
                        (1-4,6): Para filtrar intervalos e etiquetas individuais
                    </Typography>
                    <Typography textAlign={"left"} fontSize={14} fontWeight={600}>
                        Separar intervalos e etiquetas por vírgula (,)
                    </Typography>
                </Stack>
                <TextField
                    sx={{ width: "80%", marginBottom: "15px" }}
                    label="Intervalo de Etiquetas"
                    name="usuario"
                    onChange={(e) => { setFiltro(e.target.value) }}
                    type="text"
                    value={filtro}
                />

                <Button
                    onClick={handleFiltrar}
                >
                    Filtrar
                </Button>
            </Stack>
        </Popover>
    );
};
