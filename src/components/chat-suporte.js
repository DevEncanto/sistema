import {
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow
} from '@mui/material';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
import { BalaoMessage } from './balao-chat';
import { BalaoMessageAdmin } from './balao-chat-user';

export const ChatMensagens = (props) => {
    const { items = [], typeChat, setChat } = props;
    const sx = { textAlign: "center" }

    const positionMessage = (typeMessage, typeChat) => {
        const combinacao = typeMessage + typeChat

        switch (combinacao) {
            case "useruser": return "right"
            case "useradmin": return "left"
            case "adminadmin": return "right"
            case "adminuser": return "left"
        }
    }
    return (
        <Paper sx={{ width: '100%', background: "none", boxShadow: "none" }}>
            <TableContainer
                sx={{ maxHeight: 550, ...sxCardScrollPersonalizada, background: "none" }}
            >
                <Table stickyHeader aria-label="sticky table"
                    sx={{ background: "none" }}>
                    <TableHead
                        sx={{ background: "none" }}
                    >
                        <TableRow
                            key={`header`}
                            sx={{ background: "none" }}
                        >
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            background: "#EFEAE2",
                            boxShadow: "none",
                            display: "block",
                            paddingBottom: "5px"
                        }}
                    >
                        {items.map((message, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        padding: "0 15px",
                                        marginBottom: "2px",
                                        alignItems: "center",
                                        justifyContent: positionMessage(message.type, typeChat)
                                    }}
                                >
                                    {typeChat == "user"
                                        ? <BalaoMessage message={message.mensagem} type={message.type} horario={message.createdAt} />
                                        : <BalaoMessageAdmin message={message.mensagem} type={message.type} horario={message.createdAt} />
                                    }
                                </div>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
