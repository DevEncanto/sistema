import { api } from "./api"

const cadastrarFornecedor = async (fornecedor) => {
    const { data } = await api.post("/novo_fornecedor", fornecedor)

    return {
        type: data.status == 200 ? "success" : "warning",
        alert: data.message
    }
}

export {
    cadastrarFornecedor
}