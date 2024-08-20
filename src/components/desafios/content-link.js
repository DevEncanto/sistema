import { Stack, Link, Typography, Button } from "@mui/material"
import formatSaldo from "src/utils/formatarSaldos"

export const ContentLink = (props) => {

    const { dados } = props

    return (
        !!(dados?.URL) ?
            <Link
                href={dados.URL}
                target='_blank'
                rel="noopener"
            >
                <Button
                    variant="contained"
                    color="primary"
                >
                    <Stack direction="column">
                        <Typography variant='p'>
                            Enfrentar Desafio
                        </Typography>
                        <Typography variant='p'>
                            R$ {formatSaldo(dados.valor, 3)}
                        </Typography>
                    </Stack>
                </Button>
            </Link>
            : <></>

    )
}