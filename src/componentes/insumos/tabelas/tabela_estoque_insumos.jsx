import {
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { sxCardScrollPersonalizada } from '../../../components/config-componentes/config-imagens-perfil';
import { useContext, useMemo } from 'react';
import { celulasEstoque, insumos } from '../data';
import { EstoqueContext } from '../../../contexts/components_context/estoque_context';

export const TabelaEstoqueInsumos = () => {

    const { controleEstoque } = useContext(EstoqueContext);

    const sx = { textAlign: "center" }

    const insumosFiltrados = useMemo(() => {
        const buscaInsumo = controleEstoque.insumo.toLowerCase()
        const filter = insumos.filter((item) =>
            item.insumo.toLowerCase().includes(buscaInsumo)
        )

        return buscaInsumo === "" ? insumos : filter
    }, [insumos, controleEstoque.insumo])

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 350, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            {celulasEstoque.map((celula, index) => {
                                return <TableCell sx={sx} key={index}>
                                    {celula}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {insumosFiltrados.map((insumo, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={insumo.id_insumo}
                                >
                                    <TableCell sx={sx}>
                                        {insumo.id_insumo}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        {insumo.insumo}

                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {insumo.categoria}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {insumo.unidade}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {insumo.entradas}
                                    </TableCell>

                                    <TableCell sx={sx}>
                                        {insumo.saidas}
                                    </TableCell>

                                    <TableCell sx={sx}>
                                        {insumo.entradas - insumo.saidas}
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
