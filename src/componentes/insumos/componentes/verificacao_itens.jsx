import { Stack, Typography } from "@mui/material"
import { TabelaEstoque } from "../tabelas/tabelas_estoque"
import { useContext, useEffect } from "react"
import { EstoqueContext } from "../../../contexts/components_context/estoque_context"
import { ButtonCancelar } from "../botoes/botao_cancelar"
import { Button, ButtonDefault } from "../botoes/botao"
import formatSaldo from "../../../utils/formatarSaldos"

export const VerificacaoItensEntrada = () => {

    const { dados: { entrada_insumo: { insumos } }, funcoes, dados } = useContext(EstoqueContext)

    const cancelarEntradaItens = () => {
        funcoes.gerenciarControle("cadastroEntradaInsumoI", "tabsEntrada", false);
        funcoes.resetFormularios("entrada_insumo")
        funcoes.resetFormularios("insumo_entrada")
    }

    const retornarCadastro = () => {
        funcoes.gerenciarControle("cadastroEntradaInsumoI", "tabsEntrada", false);
        funcoes.resetFormularios("insumo_entrada")
    }
    const finalizarVerificacao = () => {
        funcoes.gerenciarControle("cadastroEntradaInsumoII", "tabsEntrada", false);
    }


    useEffect(() => {
        funcoes.gerenciarControle(false, "emEdicao", false);
    }, [])


    return (
        <Stack>
            <TabelaEstoque tabela="itens" dados={insumos} minHeigth={400} />
            <Stack
                direction={"row"}
                spacing={.6}
            >
                <Typography sx={{ fontWeight: 600 }}>{`Total: `}</Typography>
                <Typography >{`R$ ${formatSaldo(dados.entrada_insumo.total_geral)}`}</Typography>
            </Stack>
            <Stack>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "30px"
                    }}
                >
                    <ButtonCancelar onClick={cancelarEntradaItens} />
                    <ButtonDefault onClick={retornarCadastro} label="Voltar" />
                    <ButtonDefault onClick={finalizarVerificacao} label="Continuar" />
                </Stack>
            </Stack>
        </Stack>
    )
}