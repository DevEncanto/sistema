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
import { sxCardScrollPersonalizada } from '../../components/config-componentes/config-imagens-perfil';

import { celulasInsumos, insumos } from './data';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context';



export const TabelaInsumos = (props) => {

    const { alterarDados, setTabsEntrada } = useContext(UserContext)

    const sx = { textAlign: "center" }

    const selecionarInsumo = (insumo) => {
        let e = { target: { value: insumo } }
        alterarDados(e, "insumo")
        setTabsEntrada("form")
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 350, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            {celulasInsumos.map((celula, index) => {
                                return <TableCell sx={sx} key={index}>
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

                                        <Button
                                            sx={{
                                                fontSize: "13px"
                                            }}
                                            key={`btn_entrada`}
                                            variant='contained'
                                            onClick={() => { selecionarInsumo(insumo.insumo) }}
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
        </Paper>
    );
};
