import { api } from "./api"

const inserirUsuario = async (nome, email, senha, codigo) => {
    const { data } = await api.post("/inserir-usuario", {
        usuario: nome,
        email: email,
        senha: senha,
        codigo: codigo
    })
    return data 
}

const loginUsuario = async (usuario, senha) => {
    const { data } = await api.post("/login_usuario", {
        acesso: usuario,
        senha: senha
    })
    return data
}

const buscarUsuario = async (idUsuario) => {
    const { data } = await api.post("/dados-usuario", {
        idUsuario: idUsuario
    })
    return data
}
const solicitarToken = async (email) => {
    const { data } = await api.post("/solicitar-token", {
        email: email
    })
    return data
}
const solicitarAlteracaoSenha = async (senha, token) => {
    const { data } = await api.post("/trocar-senha", {
        senha: senha,
        token: token
    })
    return data
}
export {
    inserirUsuario,
    loginUsuario,
    buscarUsuario,
    solicitarToken,
    solicitarAlteracaoSenha
}