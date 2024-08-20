import { Stack, TextField, Typography, Button } from "@mui/material"
import { useState } from "react"
import { SeverityPill } from "../severity-pill"
import { useContext } from "react"
import { UserContext } from "src/contexts/user-context"
import { useRouter } from "next/router"
import { validarIndicacao } from "src/util/util-perfil"

export const ContentCodigo = () => {
    const { user } = useContext(UserContext)
    const router = useRouter()

    const [codigo, setCodigo] = useState("")
    const [icon, setIcon] = useState("trofeu-icon")
    const [title, setTitle] = useState("Código de Indicação")
    const [mode, setMode] = useState("validacao")
    const [message, setMessage] = useState("Olá caro usuário, tudo bem? Digite um código de indicação válido e ganhe um bônus de R$ 1,00")

    const handleValidar = async () => {
        if (codigo !== "")
            await validarIndicacao(user?.usuario?.idUsuario, codigo, setTitle, setIcon, setMessage, setMode, router)
    }

    return (

        <Stack
            sx={{ alignItems: "center", minWidth: { xp: "100%", sm: "50%" } }}
        >
            <Stack
                sx={{
                    alignItems: "center",
                    boxShadow: "0px 5px 16px 0px rgba(0,0,0,0.4)",
                    width: { sm: "80%", xp: "90%" },
                    borderRadius: "15px",
                    minHeight: "230px",
                    justifyContent: "center"
                }}
            >
                <Stack
                    sx={{
                        maxHeight: "30%",
                        width: "100%",
                        padding: "10px",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={4}
                >
                    <img src={`/assets/${icon}.png`}
                        width={60}
                        height={60}
                    />
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "15pt" }}
                    >
                        {title}
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        maxHeight: "70%",
                        width: "100%", padding: "7px"
                    }}
                    spacing={1}
                >
                    <Typography
                        variant="p"
                        sx={{ fontSize: "14pt", textAlign: "center" }}
                    >
                        {message}
                    </Typography>
                </Stack>
                {mode == "validacao"
                    ? <Stack
                        direction={{ sm: "row" }}
                        spacing={2}
                    >
                        <TextField
                            fullWidth
                            label="Código"
                            name="codigo"
                            onChange={(e) => { setCodigo(e.target.value) }}
                            value={codigo}
                        />
                        <Button
                            sx={{ marginTop: "15px" }}
                            onClick={handleValidar}
                        >
                            <SeverityPill
                                sx={{ cursor: "pointer" }}
                                isBackground={false}
                                color={"white"}
                            >
                                Validar
                            </SeverityPill>
                        </Button>
                    </Stack>
                    : <></>
                }
                {mode == "load" ? <img src="/assets/loading.svg" width={40} height={40} /> : <></>}
                <Stack
                    sx={{
                        maxHeight: "30%",
                        marginBottom: "10px",
                        width: "100%",
                        padding: "10px 20px ",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={2}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "12pt" }}
                    >
                        Cherry Social
                    </Typography>
                    <img src="/assets/logo_cherry.png"
                        width={30}
                        height={30}
                    />
                </Stack>
            </Stack>
        </Stack >
    )
}