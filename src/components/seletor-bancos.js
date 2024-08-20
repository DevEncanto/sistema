import { Paper, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Button, Stack, Avatar } from '@mui/material';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
import { SeverityPill } from 'src/components/severity-pill';
import { bancos } from 'src/utils/bancos';


export const SeletorBanco = (props) => {
    const {
        maxHeight = 250,
        setBanco = () => { },
        setEstado = () => { },
        setUrl = () => { }
    } = props;
    const style = { textAlign: "center" }

    const handleSelecionarBanco = (banco, avatar) => {
        setBanco(banco)
        setEstado("saque")
        setUrl(avatar)
    }

    return (
        <Paper sx={{ width: { sm: '50%', xp: "90%" }, marginTop: "30px" }}>
            <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ ...style }}>
                                Bancos
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {bancos.map((banco, index) => {

                            return (
                                <TableRow
                                    hover
                                    key={`bancotab${index + 1}`}

                                >
                                    <TableCell sx={style}
                                        onClick={() => { handleSelecionarBanco(banco.banco, banco.avatar) }}
                                    >
                                        <Stack
                                            spacing={2}
                                            sx={{ alignItems: "center", cursor: "pointer" }}
                                            direction={`row`}
                                        >
                                            <Avatar
                                                src={`/assets/avatars${banco.avatar}`}
                                                sx={{ width: 56, height: 56, cursor: "pointer" }}
                                            />
                                            <SeverityPill
                                                color={`neutral`}
                                                isBackground={false}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                {banco.banco}
                                            </SeverityPill>
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



