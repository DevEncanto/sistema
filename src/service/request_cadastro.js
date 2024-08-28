import { api } from "./api"

const cadastrarFornecedor = async (fornecedor) => {
    const { data } = await api.post("/novo_fornecedor", fornecedor)

    return data
}

const cadastrarInsumo = async (insumo) => {
    const { data } = await api.post("/novo_insumo", insumo)

    return data
}



const cadastrarCategoriaInsumo = async (categoria) => {
    const { data } = await api.post("/nova_categoria_insumo", categoria)

    return data
}

export {
    cadastrarFornecedor,
    cadastrarCategoriaInsumo,
    cadastrarInsumo
}