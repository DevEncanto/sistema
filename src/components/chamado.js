import { Stack, Avatar, Typography } from "@mui/material"
import { ChatMensagens } from "./chat-suporte"
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon"
import PaperAirplaneIcon from "@heroicons/react/24/solid/PaperAirplaneIcon"
import { formatarIDChamado } from "src/utils/formatador-id-chamado"
import { useContext, useEffect, useState } from "react"
import { CarregarConversa, enviarMensagem } from "src/util/util-chamados"
import { useRouter } from "next/router"
import { UserContext } from "src/contexts/user-context"

export const ChatChamado = (props) => {
    const { user, setUser, setChat } = useContext(UserContext)
    const router = useRouter()
    const [msgRecebidas, setMsgRecebidas] = useState([])
    const [statusMensagens, setStatusMensagens] = useState("load")
    const [msg, setMsg] = useState("")
    const style = {
        width: "100%",
        border: "none",
        outline: 0,
        height: "70%",
        paddingLeft: "20px",
        fontSize: "12pt",
        borderRadius: "8px",
        boxShadow: "none",
        fontFamily: "inter"
    }
    const { setView, chamado, typeChat } = props
    const handleCarregarConversa = async () => {
        await CarregarConversa(chamado?.idChamado, setStatusMensagens, router, setMsgRecebidas)
    }
    useEffect(() => {
        handleCarregarConversa()
        const loop = setInterval(() => {
            handleCarregarConversa()
        }, 2000)
        return () => {
            clearInterval(loop)
        }
    }, [])


    const handleFecharChat = () => {
        setView("lista")
        setChat(false)
    }

    const handleEnviarMensagem = async () => {
        if (msg == "") {
            return
        }

        await enviarMensagem(chamado?.idChamado, msg, typeChat, setMsgRecebidas)
        setMsg("")
    }

    return (
        <Stack
            sx={{ height: "100%", width: "100%", background: "red", padding: "0px" }}
        >
            <Stack
                direction={`row`}
                spacing={5}
                sx={{ alignItems: "center", height: "10%", width: "100%", background: "#E5EBF4", paddingLeft: "20px" }}
            >
                <Stack
                    direction={`row`}
                    spacing={2}
                    sx={{ alignItems: "center", width: "22%" }}
                >
                    <Avatar
                        src={`/assets/avatars${typeChat == "admin" ? chamado?.avatar : "/perfil-suporte.png"}`}

                        sx={{ width: 42, height: 42 }}
                    />
                    <Typography
                        sx={{ fontSize: "15px" }}
                        variant="h5"
                    >
                        {typeChat == "admin" ? chamado?.nome : "Suporte Cherry Social"}
                    </Typography>
                </Stack>
                <Stack
                    sx={{ alignItems: "center", justifyContent: "center", width: "50%" }}
                >
                    <Typography
                        sx={{ fontSize: "15px" }}
                        variant="h5"
                    >
                        {`Chamado${formatarIDChamado(chamado?.idChamado?.toString())}: "${chamado?.motivo}"`}

                    </Typography>
                </Stack>
                <Stack
                    direction={`row`}
                    spacing={1}
                    onClick={handleFecharChat}
                    sx={{ justifyContent: "right", width: "25%", paddingRight: "30px", cursor: "pointer" }}
                >
                    <XMarkIcon
                        height={25}
                        width={25}
                    />
                </Stack>
            </Stack>
            <Stack
                sx={{ height: "80%", width: "100%", background: "#EFEAE2", padding: 0 }}
            >
                {statusMensagens === "load"
                    ?
                    <Stack
                        sx={{ alignItems: "center", marginTop: "50px" }}
                    >
                        <img src="/assets/loading.svg" width={50} height={50} />
                    </Stack>
                    : <></>
                }
                {statusMensagens == "chat"
                    ? <ChatMensagens items={msgRecebidas} typeChat={typeChat} setChat={setChat}/>
                    : <></>
                }
                {statusMensagens == "error"
                    ?
                    <Stack
                        sx={{ alignItems: "center", marginTop: "50px" }}
                    >
                        <img src="/assets/loading.svg" width={50} height={50} />
                    </Stack>
                    : <></>
                }
            </Stack>
            <Stack
                direction={`row`}
                spacing={2}
                sx={{ alignItems: "center", height: "10%", width: "100%", background: "#E5EBF4", padding: "0 20px" }}
            >
                {chamado.status == "FINALIZADO"
                    ? <Typography
                        variant="p"
                        sx={{ fontWeight: 600, textAlign: "center" }}
                    >Não é possível enviar mensagens nesse chamado, o mesmo já foi finalizado! Abra outro chamado caso precise!</Typography>
                    :
                    <>
                        <input
                            type="text"
                            style={style}
                            placeholder='Digite uma mesagem'
                            inputProps={{ maxLength: 145 }}
                            onChange={e => { setMsg(e.target.value) }}
                            value={msg}
                        />
                        <Stack
                            sx={{ cursor: "pointer" }}
                            onClick={handleEnviarMensagem}
                        >
                            <PaperAirplaneIcon
                                height={30}
                                width={30}

                            />
                        </Stack>
                    </>
                }
            </Stack>
        </Stack>
    )
}