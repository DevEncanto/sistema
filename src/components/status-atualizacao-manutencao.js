import { Stack, Typography } from "@mui/material"

export const LoadingManutencao = () => {
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", marginTop: "120px"}}>
            <img
                className='imagem-auth'
                alt=""
                src="/assets/loading.svg"
                width={50}
                height={50}
            />
            <Typography variant='h5'>
                Atualizando...
            </Typography>
        </Stack>
    )
}
export const ErroManutencao = () => {
    return (
        <Stack
            direction="row"
            sx={{ justifyContent: "center", alignItems: "center", marginTop: "120px" }}
        >
            <img
                className='imagem-auth'
                alt=""
                src="/assets/error.svg"
                width={30}
                height={30}
            />
            <Typography
                variant='p'
                fontWeight={600}
                marginLeft={2}>
                Falha ao realizar a manutenção
            </Typography>
        </Stack>
    )
}

export const SucessoManutencao = () => {
    return (
        <Stack
            direction="row"
            sx={{ justifyContent: "center", alignItems: "center", marginTop: "120px" }}
        >
            <img
                className='imagem-auth'
                alt=""
                src="/assets/sucess.svg"
                width={30}
                height={30}
            />
            <Typography
                variant='p'
                fontWeight={600}
                marginLeft={2}>
                Status da plataforma alterado com sucesso!
            </Typography>
        </Stack>
    )
}