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
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import NoSymbolIcon from '@heroicons/react/24/solid/NoSymbolIcon'
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'
import { SeverityPill } from 'src/components/severity-pill';
import { alterarStatus } from 'src/util/util-admin';
import { useMemo } from 'react';

export const TabelaUsuarios = (props) => {
    const { items = [], selected = [], setUser, cadAvatar, setCadAvatar, setIdUsuario, usuario = "" } = props;
    const sx = { textAlign: "center" }

    const statusConta = {
        SUSPENSA: 'warning',
        ATIVA: 'success',
        BANIDA: 'error',
        "DESAT.MANUT": 'primary'
    }

    const handleDados = async (idUsuario, status) => {
        await alterarStatus(idUsuario, status, setUser)
    }

    const handleAvatar = (idUsuario) => {
        setCadAvatar(true)
        setIdUsuario(idUsuario)
    }

    const usuariosFiltrados = useMemo(() => {
        const buscaUsuario = usuario.toLowerCase()
        const filter = items.filter((item) =>
            item.nome.toLowerCase().includes(buscaUsuario))

        return buscaUsuario === "" ? items : filter
    }, [usuario, items])

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 350, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            <TableCell sx={sx}>
                                ID Usuário
                            </TableCell>
                            <TableCell sx={sx}>
                                Usuário
                            </TableCell>
                            <TableCell sx={sx}>
                                E-mail
                            </TableCell>
                            <TableCell sx={sx}>
                                Tipo Usuário
                            </TableCell>
                            <TableCell sx={sx}>
                                Status da Conta
                            </TableCell>
                            <TableCell sx={sx}>
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {usuariosFiltrados.map((customer) => {
                            const isSelected = selected.includes(customer.id);

                            return (
                                <TableRow
                                    hover
                                    key={customer.idUsuario}
                                    selected={isSelected}
                                >
                                    <TableCell sx={sx}>
                                        {customer.idUsuario}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        {customer.nome}

                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {customer.email}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {customer.tipoUsuario}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        <SeverityPill color={statusConta[customer.statusConta]}>
                                            {customer.statusConta}
                                        </SeverityPill>
                                    </TableCell>
                                    <TableCell sx={{ alignItems: "center" }}>
                                        <Stack
                                            direction={`row`}
                                            spacing={2}
                                            sx={{ alignItems: "center", justifyContent: "center" }}
                                        >
                                            {customer.tipoUsuario == "USER"
                                                ?
                                                <>
                                                    {customer.statusConta == "ATIVA"
                                                        ? <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => { handleDados(customer.idUsuario, "BANIDA") }}
                                                            startIcon={<NoSymbolIcon height={24} width={24} fontWeight={600} />}
                                                        >
                                                            BANIR
                                                        </Button>
                                                        :
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            onClick={() => { handleDados(customer.idUsuario, "ATIVA") }}
                                                            startIcon={<CheckCircleIcon height={24} width={24} fontWeight={600} />}
                                                        >
                                                            ATIVAR
                                                        </Button>
                                                    }
                                                </> :
                                                <></>
                                            }
                                            {!cadAvatar
                                                ?
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() => { handleAvatar(customer.idUsuario) }}
                                                        startIcon={<PlusIcon height={24} width={24} fontWeight={600} />}
                                                    >
                                                        AVATAR
                                                    </Button>
                                                </> :
                                                <></>

                                            }
                                        </Stack>
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
