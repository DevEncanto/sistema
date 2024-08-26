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

import { celulasInsumos } from '../data';
import { useContext, useEffect } from 'react';
import { EstoqueContext } from '../../../contexts/components_context/estoque_context';
import { DataContext } from '../../../contexts/data_context/data_context';



export const TabelaInsumos = (props) => {

    const { gerenciarControle, funcoes } = useContext(EstoqueContext)
    const { controle, saveLocalStorage } = useContext(DataContext)
    const { maxHeight = 350 } = props
    const sx = { textAlign: "center" }

    useEffect(() => {
        saveLocalStorage()
    }, [])


    const selecionarInsumo = (insumo, id_insumo) => {


        console.log(insumo, id_)
        let eInsumo = { target: { value: insumo } }
        let eIndex = { target: { value: id_insumo } }
        funcoes.gerenciarDadosEstoque("entrada_insumo", "insumo", eInsumo)
        funcoes.gerenciarDadosEstoque("entrada_insumo", "id_insumo", eIndex)
        gerenciarControle("cadastroEntradaInsumo", "tabsEntrada", false)
    }


    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
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
                        {controle.insumos.map((insumo, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`insumo${index}`}
                                >
                                    <TableCell sx={sx}>
                                        {insumo.id_insumo}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {insumo.nome}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        <Button
                                            sx={{
                                                fontSize: "13px"
                                            }}
                                            key={`btn_entrada`}
                                            variant='contained'
                                            onClick={() => { selecionarInsumo(insumo.nome, insumo.id_insumo) }}
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
