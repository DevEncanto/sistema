import { Stack, TextField, Button, Typography } from "@mui/material"

export const CadastroContasSuaURL = (props) => {
    const {
        setEmail,
        email,
        setSenha,
        senha,
        setSenhac,
        senhac,
        mode,
        handleCadastro,
        setGerenciador = () => {}
    } = props

    return (
        <Stack direction={`row`} spacing={1}>
            <Stack spacing={1} direction={`row`} sx={{ width: "80%", alignItems: "center" }}>
                <TextField
                    fullWidth
                    label="E-mail"
                    name="exc-avatar"
                    onChange={e => { setEmail(e.target.value) }}
                    type="text"
                    value={email}
                    autoComplete='off'
                />
                <TextField
                    fullWidth
                    label="Senha"
                    name="exc-avatar"
                    onChange={e => { setSenha(e.target.value) }}
                    type="password"
                    value={senha}
                    autoComplete='off'
                />
                <TextField
                    fullWidth
                    label="Confirmar Senha"
                    name="exc-avatar"
                    onChange={e => { setSenhac(e.target.value) }}
                    type="password"
                    value={senhac}
                    autoComplete='off'
                />
            </Stack>
            <Stack direction={`row`} sx={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                {mode == "cadastro" ?
                    <Button
                        variant='contained'
                        onClick={handleCadastro}
                    >
                        Cadastrar
                    </Button>
                    : <></>
                }
                {mode == "load"
                    ? <img src="/assets/loading.svg" width={50} height={50} />
                    : <></>
                }
                {mode == "senha"
                    ? <Typography
                        sx={{ fontWeight: 600, color: "red" }}>
                        Senhas Diferentes
                    </Typography>
                    : <></>
                }
                {mode == "vazio"
                    ? <Typography
                        sx={{ fontWeight: 600, color: "red" }}>
                        Campos Vazios
                    </Typography>
                    : <></>
                }
                {mode == "sucess"
                    ? <img src="/assets/sucess.svg" width={45} height={45} />
                    : <></>
                }
                {mode == "error"
                    ? <img src="/assets/error.svg" width={45} height={45} />
                    : <></>
                }
            </Stack>
            {mode != "senha"
                ?
                <Stack direction={`row`} sx={{ width: "10%", alignItems: "center", justifyContent: "center" }}>
                    <Button
                        variant='contained'
                        onClick={() => { setGerenciador("barra") }}>
                        Fechar
                    </Button>
                </Stack>
                : <></>
            }
        </Stack>
    )
}