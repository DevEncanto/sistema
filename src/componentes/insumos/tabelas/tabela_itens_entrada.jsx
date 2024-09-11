import {
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
} from '@mui/material';
import { sxCardScrollPersonalizada } from '../../../components/config-componentes/config-imagens-perfil';

import { celulasEntrada } from '../data';
import { useContext } from 'react';
import { EstoqueContext } from '../../../contexts/components_context/estoque_context';

export const TabelaItensEntrada = (props) => {

    const sx = { textAlign: "center" }
    const { dados: { entrada_insumo: { insumos } } } = useContext(EstoqueContext)

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 350, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            {celulasEntradas.map((celula, index) => {
                                return <TableCell sx={sx} key={index} colSpan={celula == "AÇÕES" ? 2 : 1}>
                                    {celula}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {insumos.map((insumo, index) => {
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
                                        {insumo.qtde_insumo}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {insumo.valor_unitario}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {insumo.descontos}
                                    </TableCell>

                                    <TableCell sx={sx}>
                                        {insumo.fornecedor}
                                    </TableCell>

                                    <TableCell sx={sx}>
                                        {insumo.valor_total}
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
