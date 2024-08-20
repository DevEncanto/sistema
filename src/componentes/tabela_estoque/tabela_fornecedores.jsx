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

import { celulasFornecedores, fornecedores } from './data';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context';



export const TabelaFornecedores = (props) => {

    const { alterarDados, setTabsEntrada } = useContext(UserContext)
    const { maxHeight = 350 } = props
    const sx = { textAlign: "center" }

    const selecionarFornecedor = (fornecedor) => {
        let e = { target: { value: fornecedor } }
        alterarDados(e, "fornecedor")
        setTabsEntrada("form")
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            {celulasFornecedores.map((celula, index) => {
                                return <TableCell sx={sx} key={index}>
                                    {celula}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {fornecedores.map((fornecedor, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`insumo${index}`}
                                >
                                    <TableCell sx={sx}>
                                        {fornecedor.id_fornecedor}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        {fornecedor.fornecedor}

                                    </TableCell>
                                    <TableCell sx={sx}>

                                        <Button
                                            sx={{
                                                fontSize: "12px",
                                                padding:1
                                            }}
                                            key={`btn_entrada`}
                                            variant='contained'
                                            onClick={() => { selecionarFornecedor(fornecedor.fornecedor) }}
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
