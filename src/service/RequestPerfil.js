import { api } from "./api"

const atualizarPerfil = async (idUsuario, avatar, nomeCompleto, pix, banco, recebedor) => {
    const { data } = await api.post("/atualizar-perfil", {
        idUsuario: idUsuario,
        avatar: avatar,
        nomeCompleto: nomeCompleto,
        pix: pix,
        banco: banco,
        recebedor: recebedor
    })
    return data
}

const validarToken = async (idUsuario, token) => {
    const { data } = await api.post("/codigo-indicacao", {
        idUsuario: idUsuario,
        token: token
    })
    return data
}

export { atualizarPerfil, validarToken }