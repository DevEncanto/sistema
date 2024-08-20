import { Stack, TextField, Button } from "@mui/material"

export const BarraPesquisa = (props) => {

    const {
        conta,
        setConta = () => { },
        setGerenciador = () => { } } = props

    return (
        <Stack direction={{ xp: "column", sm: "row" }} spacing={1}>
            <Stack direction={`row`} sx={{ width: "40%", alignItems: "center" }}>
                <TextField
                    fullWidth
                    label="Pesquisar Contas"
                    name="exc-avatar"
                    onChange={e => { setConta(e.target.value) }}
                    type="text"
                    value={conta}
                    autoComplete='off'
                />
            </Stack>
            <Stack
                direction={`row`}
                sx={{ width: "%", alignItems: "center", justifyContent: "center" }}
                spacing={1}
            >

                <Button
                    variant='contained'
                    onClick={() => { setConta("") }}
                >
                    Limpar Pesquisa
                </Button>
                <Button
                    variant='contained'
                    onClick={() => { setGerenciador("cadastroContas") }}
                >
                    Cadastrar Conta
                </Button>
                <Button
                    variant='contained'
                    onClick={() => { setGerenciador("verificarSaldo") }}
                >
                    Verificar Saldo
                </Button>
            </Stack>

        </Stack>
    )
}