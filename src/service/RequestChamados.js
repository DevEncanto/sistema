import { api } from "./api"

export const abrirChamado = async (idUsuario, motivo) => {
    const { data } = await api.post("/abrir-chamado", {
        idUsuario: idUsuario,
        motivo: motivo
    })
    return data
}

export const enviarMensagens = async (idChamado, mensagem, type) => {
    const { data } = await api.post("/enviar-mensagem", {
        idChamado: idChamado,
        mensagem: mensagem,
        type: type
    })
    return data
}

export const buscarMensagens = async (idChamado) => {
    const { data } = await api.post("/buscar-mensagens", {
        idChamado: idChamado
    })
    return data
}