import { api } from "./api"

const validarToken = async () => {
    const { data } = await api.get("/validacao_token")
    return data
}

export {
    validarToken
}