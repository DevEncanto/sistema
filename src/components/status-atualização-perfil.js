import { Stack, Typography } from "@mui/material"

export const LoadingPerfil = () => {
    return (
        <Stack
            direction="row"
            spacing={1} 
            sx={{ alignItems: "center" }}>
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
export const ErroPerfil = () => {
    return (
        <>
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
                Falha ao atualizar o seu perfil!
            </Typography>
        </>
    )
}

export const SucessoPerfil = () => {
    return (
        <>
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
                Perfil atualizado com sucesso!
            </Typography>
        </>
    )
}