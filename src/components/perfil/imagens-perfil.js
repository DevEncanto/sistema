import {
    Avatar,
    Stack,
    Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Button
} from '@mui/material';

import { urls, sxCardScrollPersonalizada } from '../config-componentes/config-imagens-perfil';
import { SeverityPill } from '../severity-pill';

export const ImagensPerfil = (props) => {
    const { changeAvatar, mode, avatares = [] } = props

    return (
        <Stack
            direction={`column`}
            sx={{ maxHeight: 400, maxWidth: { xp: 600, sm: "50%" } }} >

            <Card sx={sxCardScrollPersonalizada}
            >

                <Box >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            <TableRow key={`titulo`}>
                                <TableCell>
                                    <SeverityPill color='primary'>
                                        Avatares
                                    </SeverityPill>
                                </TableCell>
                            </TableRow>
                            {
                                urls.map((url, index) => {
                                    return (
                                        <TableRow
                                            key={`Ava${index}`}
                                            sx={{ display: "flex", flexDirection: "row" }}>
                                            <TableCell >
                                                {url.img1 != ""
                                                    ?
                                                    <Button
                                                        sx={{ background: "none", "&:hover": { background: "none" } }}
                                                        onClick={() => { changeAvatar(url.img1, mode) }}>
                                                        <Avatar
                                                            src={`/assets/avatars/${url.img1}`}
                                                            sx={{ width: 56, height: 56 }}
                                                        />
                                                    </Button>
                                                    : <></>

                                                }

                                            </TableCell>
                                            <TableCell >
                                                {url.img2 != ""
                                                    ?
                                                    <Button
                                                        sx={{ background: "none", "&:hover": { background: "none" } }}
                                                        onClick={() => { changeAvatar(url.img2, mode) }}>
                                                        <Avatar
                                                            src={`/assets/avatars/${url.img2}`}
                                                            sx={{ width: 56, height: 56 }}
                                                        />
                                                    </Button>
                                                    : <></>

                                                }

                                            </TableCell>
                                            <TableCell >
                                                {url.img3 != ""
                                                    ?
                                                    <Button
                                                        onClick={() => { changeAvatar(url.img3, mode) }}
                                                        sx={{ background: "none", "&:hover": { background: "none" } }}
                                                    >
                                                        <Avatar
                                                            src={`/assets/avatars/${url.img3}`}
                                                            sx={{ width: 56, height: 56 }}
                                                        />
                                                    </Button>
                                                    : <></>

                                                }

                                            </TableCell>
                                            <TableCell >
                                                {url.img4 != ""
                                                    ?
                                                    <Button
                                                        sx={{ background: "none", "&:hover": { background: "none" } }}
                                                        onClick={() => { changeAvatar(url.img4, mode) }}>
                                                        <Avatar
                                                            src={`/assets/avatars/${url.img4}`}
                                                            sx={{ width: 56, height: 56 }}
                                                        />
                                                    </Button>
                                                    : <></>

                                                }

                                            </TableCell>
                                            <TableCell >
                                                {url.img5 != ""
                                                    ? <Button
                                                        sx={{ background: "none", "&:hover": { background: "none" } }}
                                                        onClick={() => { changeAvatar(url.img5, mode) }}>
                                                        <Avatar
                                                            src={`/assets/avatars/${url.img5}`}
                                                            sx={{ width: 56, height: 56 }}
                                                        />
                                                    </Button>
                                                    : <></>

                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                            {avatares.length > 0
                                ?
                                <>
                                    <TableRow key={`AvaSeparador`}>
                                        <TableCell>
                                            <SeverityPill color='primary'>
                                                Avatares Exclusivos
                                            </SeverityPill>
                                        </TableCell>
                                    </TableRow>
                                    {
                                        avatares.map((url, index) => {
                                            return (
                                                <TableRow
                                                    key={`AvaExc${index}`}
                                                    sx={{ display: "flex", flexDirection: "row" }}>
                                                    <TableCell >
                                                        {url.img1 != ""
                                                            ?
                                                            <Button
                                                                sx={{ background: "none", "&:hover": { background: "none" } }}
                                                                onClick={() => { changeAvatar(url.img1, mode) }}>
                                                                <Avatar
                                                                    src={`/assets/avatars/${url.img1}`}
                                                                    sx={{ width: 56, height: 56 }}
                                                                />
                                                            </Button>
                                                            : <></>

                                                        }

                                                    </TableCell>
                                                    <TableCell >
                                                        {url.img2 != ""
                                                            ?
                                                            <Button
                                                                sx={{ background: "none", "&:hover": { background: "none" } }}
                                                                onClick={() => { changeAvatar(url.img2, mode) }}>
                                                                <Avatar
                                                                    src={`/assets/avatars/${url.img2}`}
                                                                    sx={{ width: 56, height: 56 }}
                                                                />
                                                            </Button>
                                                            : <></>

                                                        }

                                                    </TableCell>
                                                    <TableCell >
                                                        {url.img3 != ""
                                                            ?
                                                            <Button
                                                                sx={{ background: "none", "&:hover": { background: "none" } }}
                                                                onClick={() => { changeAvatar(url.img3, mode) }}>
                                                                <Avatar
                                                                    src={`/assets/avatars/${url.img3}`}
                                                                    sx={{ width: 56, height: 56 }}
                                                                />
                                                            </Button>
                                                            : <></>

                                                        }

                                                    </TableCell>
                                                    <TableCell >
                                                        {url.img4 != ""
                                                            ?
                                                            <Button
                                                                sx={{ background: "none", "&:hover": { background: "none" } }}
                                                                onClick={() => { changeAvatar(url.img4, mode) }}>
                                                                <Avatar
                                                                    src={`/assets/avatars/${url.img4}`}
                                                                    sx={{ width: 56, height: 56 }}
                                                                />
                                                            </Button>
                                                            : <></>

                                                        }

                                                    </TableCell>
                                                    <TableCell >
                                                        {url.img5 != ""
                                                            ? <Button
                                                                sx={{ background: "none", "&:hover": { background: "none" } }}
                                                                onClick={() => { changeAvatar(url.img5, mode) }}>
                                                                <Avatar
                                                                    src={`/assets/avatars/${url.img5}`}
                                                                    sx={{ width: 56, height: 56 }}
                                                                />
                                                            </Button>
                                                            : <></>

                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </>
                                : <></>
                            }

                        </TableBody>
                    </Table>
                </Box>
            </Card>

        </Stack>
    )
};
