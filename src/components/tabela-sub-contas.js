import { Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button, Stack } from '@mui/material';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
import { SeverityPill } from './severity-pill';
import { Seletor } from './Seletor';


export const TabelaSubContas = (props) => {

    let { filtro, setFiltro, setUser, user, maxHeight, items = [], sub, setSub, limite = 0 } = props;
    const style = { textAlign: "center" }
    // const [ips, setIps] = useState(items)
    const filtroLowCase = filtro.toLowerCase()

    const atualizarVisibilidade = (id, visibilidade) => {
        let usuario = JSON.parse(window.localStorage.getItem("user"))
        const updatedItems = items.map(item => {
            if (item.idSubUsuario === id) {
                return {
                    idSubUsuario: item.idSubUsuario,
                    ip: item.ip,
                    desafios: item.desafios,
                    visibilidade: visibilidade
                }
            }
            return item;
        });
        items = updatedItems
        usuario.subUsuarios = updatedItems
        window.localStorage.setItem("user", JSON.stringify(usuario))
        setUser(usuario)
    }
    const handleChange = async (filtro) => {
        setFiltro(filtro)
    }
    const handleUse = (id, visibilidade) => {
        atualizarVisibilidade(id, visibilidade)
        setSub(id)
    }

    const ipsFiltrados = filtro == "TODOS" ? items : items.filter((ip) => { return ip.visibilidade == filtroLowCase })

    return (
        <Paper sx={{ width: '100%' }}>
            <Stack
                direction={`row`}
            >
                <SeverityPill color={"primary"}>Status do IP: </SeverityPill>
                <Seletor
                    label="Status"
                    itens={["TODOS", "VISIVEL", "OCULTO"]}
                    value={filtro}
                    handleChange={handleChange}
                    isSeverityPill={true}
                />
            </Stack>
            <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            <TableCell sx={{ fontSize: { xp: "10px", sm: "10.5pt" }, ...style }}>
                                ID
                            </TableCell>
                            <TableCell sx={{ fontSize: { xp: "10px", sm: "10.5pt" }, ...style }}>
                                IP
                            </TableCell>
                            <TableCell sx={{ fontSize: { xp: "10px", sm: "10.5pt" }, ...style }}>
                                Desafios
                            </TableCell>
                            <TableCell sx={{ fontSize: { xp: "10px", sm: "10.5pt" }, ...style }}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {ipsFiltrados?.map((subconta, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`saque${index}`}
                                >
                                    <TableCell sx={{ fontSize: { xp: "10px", sm: "10.5pt" }, ...style }}>
                                        {subconta.idSubUsuario}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: { xp: "12px", sm: "10.5pt" }, ...style }}>
                                        {subconta.ip == "" ? "0.0.0.0" : subconta.ip}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: { xp: "12px", sm: "10.5pt" }, ...style }}>
                                        {`${subconta.desafios}/${limite}`}
                                    </TableCell>
                                    <TableCell sx={style}>
                                        <Stack
                                            sx={{ justifyContent: "center" }}
                                            direction={`row`}
                                            spacing={1}
                                        >
                                            {subconta.idSubUsuario == sub
                                                ? <Button

                                                    sx={{
                                                        background: subconta.idSubUsuario == sub ? "green" : "cereja.100",
                                                        "&:hover": {
                                                            background: subconta.idSubUsuario == sub ? "#035e03" : "cereja.200"
                                                        },
                                                    }}
                                                >
                                                    <SeverityPill
                                                        isBackground={false}
                                                        sx={{ cursor: "pointer", fontSize: "8pt" }}
                                                        color='white'>
                                                        em uso
                                                    </SeverityPill>
                                                </Button>
                                                :
                                                <Stack
                                                    direction={`row`}
                                                    spacing={1}
                                                    sx={{ justifyContent: "center" }}
                                                >
                                                    <Button
                                                        onClick={() => { handleUse(subconta.idSubUsuario, "visivel") }}
                                                    >
                                                        <SeverityPill
                                                            isBackground={false}
                                                            sx={{ cursor: "pointer", fontSize: "8pt" }}
                                                            color='white'>
                                                            usar
                                                        </SeverityPill>
                                                    </Button>
                                                    {subconta.visibilidade == "visivel"
                                                        ? <Button
                                                            onClick={() => { atualizarVisibilidade(subconta.idSubUsuario, "oculto") }}

                                                            sx={{
                                                                maxWidth: "80px",
                                                                background: "#18873a",
                                                                "&:hover": {
                                                                    background: "#0b4d1f"
                                                                },
                                                            }}
                                                        >
                                                            <SeverityPill
                                                                isBackground={false}
                                                                sx={{ cursor: "pointer", fontSize: "8pt" }}
                                                                color='white'>
                                                                Visível
                                                            </SeverityPill>
                                                        </Button>
                                                        : <Button
                                                            sx={{
                                                                maxWidth: "80px",
                                                                background: "#d10a1e",
                                                                "&:hover": {
                                                                    background: "#a30716"
                                                                },
                                                            }}
                                                            onClick={() => { atualizarVisibilidade(subconta.idSubUsuario, "visivel") }}
                                                        >
                                                            <SeverityPill
                                                                isBackground={false}
                                                                sx={{ cursor: "pointer", fontSize: "8pt" }}
                                                                color='white'>
                                                                Oculto
                                                            </SeverityPill>
                                                        </Button>
                                                    }
                                                </Stack>
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
