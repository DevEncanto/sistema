import { useContext } from "react"
import { EstoqueContext } from "../../../contexts/components_context/estoque_context"
import { Stack, Typography } from "@mui/material"
import { ButtonCancelar } from "../botoes/botao_cancelar"
import { ButtonSalvar } from "../botoes/botao_salvar"
import { ButtonDefault } from "../botoes/botao"
import { width } from "@mui/system"
import formatSaldo from "../../../utils/formatarSaldos"

const { ModalEstoque } = require("./modal")

export const ModalRemocaoItem = () => {

    const { controleEstoque, dados, funcoes } = useContext(EstoqueContext)

    const cancelarRemocao = () => {
        funcoes.gerenciarControle("itensEntrada", "tabsEntrada", false);
    }

    const insumo = dados.entrada_insumo.insumos[controleEstoque.itemRemocao - 1]
    const removerItem = () => {
        let insumos = dados.entrada_insumo.insumos, total = 0

        if (insumos.length == 1) {
            funcoes.gerenciarDadosEstoque("entrada_insumo", "insumos", [], false)
            funcoes.gerenciarControle("cadastroEntradaInsumoI", "tabsEntrada", false);
            return
        }

        insumos.splice(controleEstoque.itemRemocao - 1, 1)

        insumos.forEach((insumo, index) => {
            insumo.index = index + 1
            total += parseFloat(insumo.valor_total)
        })

        funcoes.gerenciarDadosEstoque("entrada_insumo", "insumos", insumos, false)
        funcoes.gerenciarDadosEstoque("entrada_insumo", "total_geral", total, false)
        funcoes.gerenciarControle("itensEntrada", "tabsEntrada", false);
    }

    const props = {
        direction: "row",
        spacing: 0.8,
    }

return (
    <ModalEstoque
        title="Remoção de Insumo"
        destino="itensEntrada"
        width="450px"
        height="400px"
        icon={true}
    >
        <Stack
            sx={{ padding: "5px 50px" }}
        >
            <Typography
                sx={{ textAlign: "center", marginBottom: "20px" }}
            >
                Deseja mesmo remover o seguinte item?
            </Typography>
            <Stack {...props}>
                <Typography sx={{width: "120px"}}>Insumo: </Typography>
                <Typography sx={{fontWeight: 600}}>{insumo.insumo}</Typography>
            </Stack>
            <Stack {...props}>
                <Typography sx={{width: "120px"}}>Estoque: </Typography>
                <Typography sx={{fontWeight: 600}}>{insumo.estoque}</Typography>
            </Stack>
            <Stack {...props}>
                <Typography sx={{width: "120px"}}>Fornecedor: </Typography>
                <Typography sx={{fontWeight: 600}}>{insumo.fornecedor}</Typography>
            </Stack>
            <Stack {...props}>
                <Typography sx={{width: "120px"}}>Quantidade: </Typography>
                <Typography sx={{fontWeight: 600}}>{formatSaldo(insumo.qtde_insumo)}</Typography>
            </Stack>
            <Stack {...props}>
                <Typography sx={{width: "120px"}}>Valor Unitário: </Typography>
                <Typography sx={{fontWeight: 600}}>{`R$ ${formatSaldo(insumo.valor_unitario)}`}</Typography>
            </Stack>
            <Stack {...props}>
                <Typography sx={{width: "120px"}}>Descontos: </Typography>
                <Typography sx={{fontWeight: 600}}>{`R$ ${formatSaldo(parseFloat(insumo.desconto))}`}</Typography>
            </Stack>
            <Stack {...props}>
                <Typography sx={{width: "120px"}}>Total: </Typography>
                <Typography sx={{fontWeight: 600}}>{`R$ ${formatSaldo(insumo.valor_total)}`}</Typography>
            </Stack>
        </Stack>
        <Stack
            direction="row"
            spacing={2}
            sx={{
                alignItems: "center",
                justifyContent: "center",
                padding: "30px"
            }}
        >
            <ButtonDefault onClick={cancelarRemocao} label="Cancelar" />
            <ButtonCancelar onClick={removerItem} label="Remover" />
        </Stack>
    </ModalEstoque>
)
}