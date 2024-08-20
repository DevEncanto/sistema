import { Button, Stack, Card, CardHeader, CardContent, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { adicionarRota } from "src/util/util-admin"
import delay from "src/utils/delay"

export const CadastroRotas = (props) => {
    const { setMode, count = 0, setUser } = props

    const [facil1, setFacil1] = useState("")
    const [medio1, setMedio1] = useState("")
    const [dificil1, setDificil1] = useState("")
    const [facil2, setFacil2] = useState("")
    const [medio2, setMedio2] = useState("")
    const [dificil2, setDificil2] = useState("")
    const [facil3, setFacil3] = useState("")
    const [medio3, setMedio3] = useState("")
    const [dificil3, setDificil3] = useState("")
    const [message, setMessage] = useState("")
    const [cor, setCor] = useState("")

    const handleCadastrarRota = async () => {
        const response = await adicionarRota(count + 1, facil1, medio1, dificil1, facil2, medio2, dificil2, facil3, medio3, dificil3)
        switch (response) {
            case 600:
                setCor("red")
                setMessage("Preencha todos os campos!")
                await delay(3000)
                setMessage("")
                break;
            case 200:
                let userLocal = JSON.parse(window.localStorage.getItem("user"))
                userLocal.rotas.push({
                    nRota: count + 1,
                    faci1: facil1,
                    medio1: medio1,
                    dificil1: dificil1,
                    faci2: facil2,
                    medio2: medio2,
                    dificil2: dificil2,
                    faci3: facil3,
                    medio3: medio3,
                    dificil3: dificil3
                })
                window.localStorage.setItem("user", JSON.stringify(userLocal))
                setUser(userLocal)
                setCor("green")
                setMessage("Rota cadastrada com sucesso!")
                await delay(3000)
                setMessage("")
                await delay(1500)
                setMode("tabela")
                break;
            case 401:
                setCor("orange")
                setMessage("Rota já cadastrada!")
                await delay(3000)
                setMessage("")
                break;
        }
    }

    return (
        <Stack direction={`column`}>
            <Card sx={{ maxHeight: 800 }}>
                <Stack>
                    <CardHeader
                        subheader={
                            <Typography sx={{ color: cor, fontWeight: 600 }}>
                                {message}
                            </Typography>
                        }

                        title="Cadastre a rota desejada"
                    />
                </Stack>

                <CardContent>
                    <Stack direction={`column`} spacing={2}>
                        <TextField
                            fullWidth
                            label="Nº da Rota"
                            name="password"
                            onChange={e => { () => { } }}
                            type="text"
                            value={count + 1}
                            autoComplete='off'
                        />
                        <Stack direction={`row`} spacing={2}>

                            <Stack
                                spacing={1}
                                direction={`column`}
                                sx={{
                                    maxWidth: 400,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "33%"
                                }}
                            >


                                <TextField
                                    fullWidth
                                    label="Fácil 1"
                                    name="password"
                                    onChange={e => { setFacil1(e.target.value) }}
                                    type="text"
                                    value={facil1}
                                    autoComplete='off'
                                />
                                <TextField
                                    fullWidth
                                    label="Médio 1"
                                    name="password"
                                    onChange={e => { setMedio1(e.target.value) }}
                                    type="text"
                                    value={medio1}
                                    autoComplete='off'
                                />
                                <TextField
                                    fullWidth
                                    label="Difícil 1"
                                    name="password"
                                    onChange={e => { setDificil1(e.target.value) }}
                                    type="text"
                                    value={dificil1}
                                    autoComplete='off'
                                />
                            </Stack>
                            <Stack
                                spacing={1}
                                direction={`column`}
                                sx={{
                                    maxWidth: 400,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "33%"
                                }}
                            >

                                <TextField
                                    fullWidth
                                    label="Fácil 2"
                                    name="password"
                                    onChange={e => { setFacil2(e.target.value) }}
                                    type="text"
                                    value={facil2}
                                    autoComplete='off'
                                />
                                <TextField
                                    fullWidth
                                    label="Médio 2"
                                    name="password"
                                    onChange={e => { setMedio2(e.target.value) }}
                                    type="text"
                                    value={medio2}
                                    autoComplete='off'
                                />
                                <TextField
                                    fullWidth
                                    label="Difícil 2"
                                    name="password"
                                    onChange={e => { setDificil2(e.target.value) }}
                                    type="text"
                                    value={dificil2}
                                    autoComplete='off'
                                />
                            </Stack>
                            <Stack
                                spacing={1}
                                direction={`column`}
                                sx={{
                                    maxWidth: 400,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "33%"
                                }}
                            >
                                <TextField
                                    fullWidth
                                    label="Fácil 3"
                                    name="password"
                                    onChange={e => { setFacil3(e.target.value) }}
                                    type="text"
                                    value={facil3}
                                    autoComplete='off'
                                />
                                <TextField
                                    fullWidth
                                    label="Médio 3"
                                    name="password"
                                    onChange={e => { setMedio3(e.target.value) }}
                                    type="text"
                                    value={medio3}
                                    autoComplete='off'
                                />
                                <TextField
                                    fullWidth
                                    label="Difícil 3"
                                    name="password"
                                    onChange={e => { setDificil3(e.target.value) }}
                                    type="text"
                                    value={dificil3}
                                    autoComplete='off'
                                />
                            </Stack>
                        </Stack>
                        <Button
                            sx={{ marginTop: "50px" }}
                            variant="contained"
                            onClick={handleCadastrarRota}
                        >
                            Cadastrar
                        </Button>
                    </Stack>
                </CardContent>

            </Card>
        </Stack>
    )
}