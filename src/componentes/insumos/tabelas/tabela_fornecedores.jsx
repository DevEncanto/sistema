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

import { celulasFornecedores } from '../data';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/user_context/user_context';
import { DataContext } from '../../../contexts/data_context/data_context';
import { EstoqueContext } from '../../../contexts/components_context/estoque_context';



export const TabelaFornecedores = (props) => {

    const { gerenciarControle, funcoes } = useContext(EstoqueContext)
    const { controle, saveLocalStorage } = useContext(DataContext)
    const { maxHeight = 350 } = props
    const sx = { textAlign: "center" }

    const selecionarFornecedor = (fornecedor, id_fornecedor) => {
        let eFornecedor = { target: { value: fornecedor } }
        let eIndex = { target: { value: id_fornecedor } }
        funcoes.gerenciarDadosEstoque("entrada_insumo", "fornecedor", eFornecedor)
        funcoes.gerenciarDadosEstoque("entrada_insumo", "id_fornecedor", eIndex)
        funcoes.gerenciarControle("cadastroEntradaInsumo", "tabsEntrada", false)
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            {celulasFornecedores.map((celula, index) => {
                                return (
                                    <TableCell sx={sx} key={index}>
                                        {celula}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {controle.fornecedores.map((fornecedor, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`insumo${index}`}
                                >
                                    <TableCell sx={sx}>
                                        {fornecedor.id_fornecedor}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        {fornecedor.fantasia}

                                    </TableCell>
                                    <TableCell sx={sx}>

                                        <Button
                                            sx={{
                                                fontSize: "12px",
                                                padding: 1
                                            }}
                                            key={`btn_entrada`}
                                            variant='contained'
                                            onClick={() => { selecionarFornecedor(fornecedor.fantasia, fornecedor.id_fornecedor) }}
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
