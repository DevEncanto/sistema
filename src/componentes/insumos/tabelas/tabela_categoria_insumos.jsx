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

import { categoriasInsumos, celulasCategoriaInsumos } from '../data';
import { DataContext } from '../../../contexts/data_context/data_context';
import { useContext } from 'react';

export const TabelaCategoriaInsumos = (props) => {

    const sx = { textAlign: "center" }

    const { controle } = useContext(DataContext)


    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 350, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            {celulasCategoriaInsumos.map((celula, index) => {
                                return <TableCell sx={sx} key={index}>
                                    {celula}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {controle.categorias_insumos.map((categoria, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`categoria${index}`}
                                >
                                    <TableCell sx={sx}>
                                        {categoria.id_categoria_insumo}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        {categoria.nome}

                                    </TableCell>
                                    <TableCell
                                        sx={sx}
                                    >
                                        <Button
                                            sx={{
                                                fontSize: "12px",
                                                padding: 1
                                            }}
                                            key={`btn_entrada`}
                                            variant='contained'
                                            onClick={() => { }}
                                        >
                                            Selecionar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper >
    );
};
