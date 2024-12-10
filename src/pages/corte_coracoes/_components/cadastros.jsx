import { CadastroStatusEtiqueta } from "../_sub_pages/cadastro.edicao.status.etiqueta"

const { useContext } = require("react")
const { CorteCoracaoContext } = require("../../../contexts/contexts/corte.coracao.context")
const { CadastroLoteEtiqueta } = require("../_sub_pages/cadastro.edicao.lote.etiqueta")

export const Cadastros = () => {

    const { cCorteCoracao: { tab } } = useContext(CorteCoracaoContext)

    return (
        <>
            {tab === "CAD1" && <CadastroLoteEtiqueta />}
            {tab === "CAD2" && <CadastroStatusEtiqueta />}
        </>
    )
}