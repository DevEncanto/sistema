import { Stack, Typography } from "@mui/material"

export const RequestDesafios = (props) => {
    const { req } = props
    return (
        req
            ?
            <Stack direction="row"
                alignItems="center">
                <img
                    className='imagem-auth'
                    alt=""
                    src="/assets/loading.svg"
                    width={60}
                    height={60}
                />
                <Typography variant='h5' marginLeft={2}>
                    Solicitando o desafio...
                </Typography>
            </Stack>
            : <></>
    )
}