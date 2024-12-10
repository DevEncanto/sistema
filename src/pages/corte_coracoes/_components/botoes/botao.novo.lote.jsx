import { useContext, useMemo } from "react"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { Button, Typography } from "@mui/material"
import PlusIcon from "@heroicons/react/24/solid/PlusIcon"

export const BotaoNovoLote = () => {

    const { funcoes, cCorteCoracao } = useContext(CorteCoracaoContext)

    const config = [
        {
            tab: "TAB1",
            destino: "CAD1",
            retorno: "TAB1",
            label: "Novo Lote",
            visible: true
        },
        {
            tab: "TAB2",
            destino: "CAD2",
            retorno: "TAB1",
            label: "Nova Média",
            visible: true
        },
        {
            tab: "TAB3",
            destino: "CAD3",
            retorno: "TAB3",
            label: "Nova Previsão",
            visible: true
        },
        {
            tab: "TAB5",
            destino: "CAD4",
            retorno: "TAB5",
            label: "Novo Status",
            visible: true
        }
    ]

    const btn = useMemo(() => {
        if (!cCorteCoracao?.tab) return null
        return config.find(item => item.tab === cCorteCoracao.tab) || { visible: false }
    }, [config, cCorteCoracao.tab])

    const handleClick = () => {
        funcoes.gControleCorteCoracao(btn.destino, "tab", false)
        funcoes.gControleCorteCoracao(btn.retorno, "return", false)
    }

    return (
        btn.visible ?
            <Button
                key={`btn_entrada`}
                variant='contained'
                onClick={handleClick}
                startIcon={<PlusIcon height={20} width={20} fontWeight={600} />}
            >
                <Typography variant="overline" fontSize={11}>
                    {btn.label}
                </Typography>
            </Button> :
            <></>
    )
}