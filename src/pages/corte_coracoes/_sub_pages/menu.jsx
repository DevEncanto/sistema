import { useContext } from "react"
import { CorteCoracaoContext } from "../../../contexts/contexts/corte.coracao.context"
import { Button, Grid, Stack, Typography } from "@mui/material"

export const Menu = () => {

    const { cCorteCoracao, funcoes } = useContext(CorteCoracaoContext)
    const redirecionarSubPage = (subPage, isComponentTable, table) => {

        if (isComponentTable) {
            funcoes.gControleCorteCoracao(table, "tabela", false)
        }
        funcoes.gControleCorteCoracao(subPage, "tab", false)
        funcoes.gControleCorteCoracao("M1", "return", false)
    }

    const handler = () => {
        return (
            <Stack
                spacing={1}
                sx={{ width: "100%", height: "100%" }}
            >
                <Grid container rowSpacing={1} spacing={{ xs: 3, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{ padding: "50px 220px 0px 220px" }}
                >
                    {cCorteCoracao.menu.map((item, index) => (
                        <Grid key={index}
                            sx={{ marginBottom: "20px" }}
                            spacing={5}
                        >
                            <Button
                                sx={{
                                    cursor: 'pointer',
                                    height: 120,
                                    width: 120,
                                    borderRadius: '10%',
                                    backgroundColor: "primary",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: "10px"
                                }}
                                onClick={() => { redirecionarSubPage(item.subPage, item.tabelaComponent, item.tabela) }}
                            >
                                <Stack
                                    sx={{
                                        cursor: 'pointer',
                                        height: "100%",
                                        width: "100%",
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    spacing={1}
                                >
                                    {item.icon}
                                    <Typography
                                    variant="overline"
                                    fontSize={12}
                                        sx={{
                                            cursor: 'pointer',
                                            color: '#fff',
                                            lineHeight: 1.5
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Stack>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        )
    }

    return (
        <>
            {cCorteCoracao.tab === "M1" && handler()}
        </>
    )
}