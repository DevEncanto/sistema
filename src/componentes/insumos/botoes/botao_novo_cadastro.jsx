import PlusIcon from "@heroicons/react/24/solid/PlusIcon"
import { Button } from "@mui/material"
import { useContext } from "react"
import { EstoqueContext } from "../../../contexts/components_context/estoque_context"

export const BotaoNovoCadastro = (props) => {
    const { cadastro, title } = props
    const { funcoes } = useContext(EstoqueContext)

    return (
        <Button
            sx={{
                fontSize: "12px",
                padding: .9
            }}
            key={`btn_entrada`}
            variant='contained'
            onClick={() => { funcoes.gerenciarControle(cadastro, "tabsEntrada", false) }}
            startIcon={<PlusIcon height={20} width={20} fontWeight={600} />}
        >
            {title}
        </Button>
    )
}