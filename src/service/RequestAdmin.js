import { api } from "./api"

const listarDadosAdmin = async (idUsuario, limit) => {
    const { data } = await api.post("admin/dados-admin", {
        id: idUsuario,
        limit: limit
    })
    return data
}

const validarAdmin = async () => {
    const { data } = await api.get("/admin/validate")
    return data
}

const alterarStatusConta = async (idUsuario, status) => {
    const { data } = await api.post("/admin/alterar-status", {
        idUsuario: idUsuario,
        status: status
    })
    return data
}

const alterarStatusChamado = async (idChamado, status) => {
    const { data } = await api.post("/admin/alterar-status-chamado", {
        idChamado: idChamado,
        status: status
    })
    return data
}
const alterarStatusRecebimento = async (idRecebimento, status, descricao) => {
    const { data } = await api.post("/admin/alterar-status-recebimento", {
        idRecebimento: idRecebimento,
        status: status,
        descricao: descricao
    })
    return data
}
const alterarStatusSaque = async (idSaque, idUsuario, status, valor, mode, usuario) => {
    const url = mode == "admin" ? "/admin/alterar-status-saque" : "/alterar-status-saque"
    const { data } = await api.post(url, {
        idUsuario: idUsuario,
        idSaque: idSaque,
        status: status,
        valor: valor,
        usuario: usuario,
        mode: mode
    })
    return data
}

const AdicionarRota = async (Data) => {
    const [rota, facil1, medio1, dificil1, facil2, medio2, dificil2, facil3, medio3, dificil3] = Data

    const { data } = await api.post("/admin/adicionar-rotas", {
        nRota: rota,
        facil1: facil1,
        medio1: medio1,
        dificil1: dificil1,
        facil2: facil2,
        medio2: medio2,
        dificil2: dificil2,
        facil3: facil3,
        medio3: medio3,
        dificil3: dificil3
    })

    return data
}

const programacaoManutencao = async (programada, motivo, duracao, Data, horario) => {
    const { data } = await api.post("/admin/programacao", {
        programada: programada,
        motivo: motivo,
        duracao: duracao,
        data: Data,
        horario: horario
    })
    return data
}
const novoRecebimento = async (tipo, origem, valor) => {
    const { data } = await api.post("/admin/adicionar-recebimento", {
        tipo: tipo,
        origem: origem,
        valor: valor
    })
    return data
}

const manutencaoPlataforma = async (emManutencao, motivo, tempo) => {
    const { data } = await api.post("/admin/manutencao", {
        emManutencao: emManutencao,
        motivo: motivo,
        tempo: tempo
    })
    return data
}

const buscarDadosServidor = async () => {
    try {
        const { data } = await api.get("/admin/servidor-monitoramento")
        return data
    } catch (error) {
        return []
    }
}
const buscarMapeamento = async () => {
    try {
        const { data } = await api.get("/admin/mapeamento")
        return data
    } catch (error) {
        return []
    }
}

const buscarBot = async () => {
    try {
        const { data } = await api.get("/admin/bot")
        return data
    } catch (error) {
        return []
    }
}


const buscarRanking = async () => {
    try {
        const { data } = await api.get("/admin/ranking")
        return data
    } catch (error) {
        return []
    }
}
const cadastrarAvatar = async (idUsuario, avatar) => {
    const { data } = await api.post("/admin/avatar", {
        idUsuario: idUsuario,
        avatar: avatar
    })
    return data
}

const inserirContasSuaURL = async (email, senha) => {
    const { data } = await api.post("/admin/contas-sua-url", {
        email: email,
        senha: senha
    })
    return data
}

const sincronizarServidor = async () => {
    const { data } = await api.get("/admin/sincronizar-servidor")
    return data
}

const verificacaoSaldos = async (inicio, fim) => {
    const { data } = await api.post("/admin/verificar-saldos", {
        inicio: inicio,
        fim: fim
    })
    return data
}

const restaurarBackup = async () => {
    const { data } = await api.get("/admin/backup")
    return data
}
export {
    listarDadosAdmin,
    validarAdmin,
    alterarStatusConta,
    alterarStatusSaque,
    AdicionarRota,
    manutencaoPlataforma,
    buscarDadosServidor,
    buscarMapeamento,
    buscarRanking,
    cadastrarAvatar,
    sincronizarServidor,
    restaurarBackup,
    alterarStatusChamado,
    inserirContasSuaURL,
    verificacaoSaldos,
    buscarBot,
    programacaoManutencao,
    novoRecebimento,
    alterarStatusRecebimento
}