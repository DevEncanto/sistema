import {
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Stack
} from '@mui/material';
import { sxCardScrollPersonalizada } from '../../../components/config-componentes/config-imagens-perfil';

import { celulasEntradas, entradaInsumos, insumos } from '../data';

export const TabelaEntradaInsumos = (props) => {

    const sx = { textAlign: "center" }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 350, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            {celulasEntradas.map((celula, index) => {
                                return <TableCell sx={sx} key={index}>
                                    {celula}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {entradaInsumos.map((insumo, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`insumo${index}`}
                                >
                                    <TableCell sx={sx}>
                                        {insumo.id_insumo}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        {insumo.insumo}

                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {insumo.qtde}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {insumo.unidade}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {insumo.nf}
                                    </TableCell>

                                    <TableCell sx={sx}>
                                        {insumo.fornecedor}
                                    </TableCell>

                                    <TableCell sx={sx}>
                                        {insumo.total}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
