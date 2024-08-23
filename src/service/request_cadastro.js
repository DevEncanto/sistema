import { api } from "./api"

const cadastrarFornecedor = async (fornecedor) => {
    const { data } = await api.post("/novo_fornecedor", fornecedor)

    return data
}

export {
    cadastrarFornecedor
}