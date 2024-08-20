import { api } from "./api"

const buscarDesafio = async (dificuldade, idUsuario, usuario, avatar, idSubUsuario, pular) => {
    const { data } = await api.post("/desafios", {
        idUsuario: idUsuario,
        dificuldade: dificuldade,
        usuario: usuario,
        avatar: avatar,
        idSubUsuario: idSubUsuario,
        ipAdress: "192.168.0.200",
        pular: pular
    })
    return data
}
const buscarDadosDesafios = async (idUsuario) => {
    const { data } = await api.post("/dados-desafios", {
        idUsuario: idUsuario,
        ip: "192.168.0.200"
    })
    return data
}

const adicionarIP = async (idUsuario, usuario) => {
    const { data } = await api.post("/inserir-subusuario", {
        idUsuario: idUsuario,
        nome: usuario,
    })
    return data
}


export { buscarDesafio, adicionarIP, buscarDadosDesafios }