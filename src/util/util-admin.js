import delay from "src/utils/delay"
import {
    listarDadosAdmin,
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
} from "../service/RequestAdmin"
import Cookies from "js-cookie"

const dadosAdmin = async (setUser, idUsuario, setLoad = (data) => { }, limit = false, auto = false) => {
    if (!auto) { setLoad(true) }
    const response = await listarDadosAdmin(idUsuario, limit)
    window.localStorage.setItem("user", JSON.stringify(response))
    await delay(1200)
    if (!auto) { setLoad(false) }
    setUser(response)
}

const alterarStatus = async (idUsuario, status, setUser) => {
    const response = await alterarStatusConta(idUsuario, status)
    if (response.status == 200) {
        let user = JSON.parse(window.localStorage.getItem("user"))
        user.usuarios.forEach((usuario) => {
            if (usuario.idUsuario == idUsuario) {
                usuario.statusConta = status
            }
        })
        setUser(user)
        window.localStorage.setItem("user", JSON.stringify(user))
    }
}
const alterarChamado = async (idChamado, status, setUser) => {
    const response = await alterarStatusChamado(idChamado, status)
    if (response.status == 200) {
        let user = JSON.parse(window.localStorage.getItem("user"))
        user.chamados.forEach((chamado) => {
            if (chamado.idChamado == idChamado) {
                chamado.status = status
            }
        })
        setUser(user)
        window.localStorage.setItem("user", JSON.stringify(user))
    }
}

const alterarRecebimento = async (idRecebimento, status, setUser, descricao) => {
    const response = await alterarStatusRecebimento(idRecebimento, status, descricao)
    if (response.status == 200) {
        let user = JSON.parse(window.localStorage.getItem("user"))
        user.recebimentos.forEach((recebimento) => {
            if (recebimento.idRecebimento == idRecebimento) {
                recebimento.status = status
            }
        })
        user.financeiro = response.financeiro
        setUser(user)
        window.localStorage.setItem("user", JSON.stringify(user))
    }
}


const loadRanking = (setHanking) => {
    try {
        let ranking = JSON.parse(window.localStorage.getItem("ranking"))
        if (!ranking) {
            window.localStorage.setItem("ranking", JSON.stringify([]))
        } else {
            setHanking(ranking)
        }
    } catch (error) {
        window.localStorage.setItem("ranking", JSON.stringify([]))
    }
}
const changeRanking = async (setHanking, router) => {

    const response = await buscarRanking()
    switch (response.status) {
        case 200:
            setHanking(response.ranking)
            window.localStorage.setItem("ranking", JSON.stringify(response.ranking))
            break;
        case 601:
            Cookies.set("auth_token", "")
            router.push("/auth/login")
    }



}
const loadMapeamento = (setMap) => {
    try {
        let mapeamento = JSON.parse(window.localStorage.getItem("mapeamento"))
        if (!mapeamento) {
            window.localStorage.setItem("mapeamento", JSON.stringify([]))
        } else {
            setMap(mapeamento)
        }
    } catch (error) {
        window.localStorage.setItem("mapeamento", JSON.stringify([]))
    }
}

const changeBot = async (setUser, router) => {
    const response = await buscarBot()
    switch (response.status) {
        case 200:
            let user = JSON.parse(window.localStorage.getItem("user"))
            user.bot = response.bot
            setUser(user)
            window.localStorage.setItem("user", JSON.stringify(user))
        case 601:
            Cookies.set("auth_token", "")
            router.push("/auth/login")

    }
}

const changeMapeamento = async (setMap, router) => {

    const response = await buscarMapeamento()
    switch (response.status) {
        case 200:
            setMap(response.mapeamento)
            window.localStorage.setItem("mapeamento", JSON.stringify(response.mapeamento))
            break;
        case 601:
            Cookies.set("auth_token", "")
            router.push("/auth/login")

    }
}

const pagarEstornarSaque = async (idSaque, status, valor, idUsuario, setUser, mode = "admin", usuario = "") => {
    const response = await alterarStatusSaque(idSaque, idUsuario, status, valor, mode, usuario)
    if (response.status == 200) {
        let user = JSON.parse(window.localStorage.getItem("user"))
        user.saques.forEach((saque) => {
            if (saque.idSaque == idSaque) {
                saque.status = status
            }
        })
        user.financeiro = response.financeiro
        setUser(user)
        window.localStorage.setItem("user", JSON.stringify(user))
    }
}

const adicionarRota = async (rota, facil1, medio1, dificil1, facil2, medio2, dificil2, facil3, medio3, dificil3) => {
    const data = [rota, facil1, medio1, dificil1, facil2, medio2, dificil2, facil3, medio3, dificil3]
    let status = 200
    data.forEach((param) => {
        if (param === "") {
            return status = 600
        }
    })
    if (status == 200) {
        const response = await AdicionarRota(data)
        status = response.status
    }
    return status
}

const programacaoPlataforma = async (object, setUser, setMode) => {
    const { programada, motivo, duracao, horario, data } = object
    let user = JSON.parse(window.localStorage.getItem("user"))
    setMode("load")
    const response = await programacaoManutencao(programada, motivo, duracao, data, horario)
    await delay(1000)
    if (response.status == 200) {
        setMode("sucess")
        user.manutencaoProgramada = object
        window.localStorage.setItem("user", JSON.stringify(user))
    } else {
        setMode("error")
    }
    await delay(2000)
    setUser(user)
    await delay(500)
    setMode("alterar")
}


const alterarStatusPlataforma = async (object, setUser, setMode) => {
    const { emManutencao, motivo, tempo } = object
    let user = JSON.parse(window.localStorage.getItem("user"))
    setMode("load")
    const response = await manutencaoPlataforma(emManutencao, motivo, tempo)
    await delay(1000)
    if (response.status == 200) {
        setMode("sucess")
        user.manutencao = object
        window.localStorage.setItem("user", JSON.stringify(user))
    } else {
        setMode("error")
    }
    await delay(2000)
    setUser(user)
    await delay(500)
    setMode("alterar")
}

const monitoramentoServidor = async (setServer, router) => {
    const response = await buscarDadosServidor()
    switch (response.status) {
        case 200:
            setServer(response)
            break;
        case 601:
            Cookies.set("auth_token", "")
            router.push("/auth/login")

    }
}

const verificarSaldo = async (inicio, fim, setMode, setMessage, reset, setUser) => {
    setMode("load")
    if (inicio == 0 || inicio == "" || fim == 0 || fim == "") {
        await delay(1000)
        setMode("error")
        setMessage("Campos Vazios!")
        await delay(2000)
        setMode("verificacao")
        setMessage("")
        return
    }
    if (inicio > fim) {
        await delay(1000)
        setMode("error")
        setMessage("Inicio maior quer o fim")
        await delay(2000)
        setMode("verificacao")
        setMessage("")
        return
    }
    const response = await verificacaoSaldos(inicio, fim)
    await delay(2000)
    let user = JSON.parse(window.localStorage.getItem("user"))
    user.bot = response.bot
    window.localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
    setMode("verificacao")
    reset()
}

const cadastrarContasSuaURL = async (email, senha, senhac, setMode, setUser, router, reset) => {
    setMode("load")

    if (senha == "" || senhac == "" || email == "") {
        await delay(1000)
        setMode("vazio")
        await delay(2000)
        setMode("cadastro")
        return
    }

    if (senha !== senhac) {
        await delay(1000)
        setMode("senha")
        await delay(2000)
        setMode("cadastro")
        return
    }
    const response = await inserirContasSuaURL(email, senha)
    await delay(1000)
    switch (response.status) {
        case 200:
            setMode("sucess")
            let user = JSON.parse(window.localStorage.getItem("user"))
            let id = user?.contasSuaURL?.length + 1
            user?.contasSuaURL?.push({
                idConta: id,
                email: email,
                saldo: 0
            })
            window.localStorage.setItem("user", JSON.stringify(user))
            setUser(user)
            break;
        case 400:
            setMode("error")
            break;
        case 601:
            Cookies.set("auth_token", "")
            router.push("/auth/login")

    }
    await delay(2000)
    setMode("cadastro")
    reset()
}

const cadastrarRecebimento = async (tipo, origem, valor, router, setMode, setUser) => {
    setMode("load")
    await delay(1000)
    if (valor <= 0) {
        setMode("vazio")
        await delay(1500)
        setMode("cadastro")
        return
    }

    const response = await novoRecebimento(tipo, origem, valor)


    switch (response.status) {
        case 200:
            let user = JSON.parse(window.localStorage.getItem("user"))
            user.recebimentos.push(response.recebimento)
            window.localStorage.setItem("user", JSON.stringify(user))
            setMode("sucess")
            setUser(user)
            break;
        case 400:
            setMode("error")
            break;
        case 601:
            Cookies.set("auth_token", "")
            router.push("/auth/login")

    }
    await delay(2200)
    setMode("cadastro")
}

const CadastrarAvatar = async (idUsuario, avatar, setMode, setAvatar) => {
    if (avatar != "") {
        const response = await cadastrarAvatar(idUsuario, avatar)
        setMode("load")
        await delay(1000)
        switch (response.status) {
            case 200:
                setMode("sucess")
                setAvatar("")
                break;
            case 400:
                setMode("error")
                break;
            case 601:
                Cookies.set("auth_token", "")
                router.push("/auth/login")

        }
        await delay(2200)
        setMode("cadastro")

    }
}

const SincronizarServidor = async (setSync, router) => {
    setSync("load")
    const response = await sincronizarServidor()
    await delay(1000)
    switch (response.status) {
        case 200:
            setSync("sucess")
            await delay(1500)
            break;
        case 600:
            setSync("alter")
            await delay(1500)
            break;
        case 600:
            setSync("error")
            await delay(1500)
            break;
        case 601:
            Cookies.set("auth_token", "")
            router.push("/auth/login")

            break;
    }
    setSync("sync")
}
const RestaurarBackup = async (setSync, router) => {
    setSync("load")
    const response = await restaurarBackup()
    await delay(1000)
    switch (response.status) {
        case 200:
            setSync("sucess")
            await delay(1500)
            break;
        case 400:
            setSync("error")
            await delay(1500)
            break;
        case 601:
            Cookies.set("auth_token", "")
            router.push("/auth/login")

            break;
    }
    setSync("sync")
}
export {
    dadosAdmin,
    alterarStatus,
    loadRanking,
    changeRanking,
    changeMapeamento,
    loadMapeamento,
    pagarEstornarSaque,
    adicionarRota,
    alterarStatusPlataforma,
    monitoramentoServidor,
    CadastrarAvatar,
    SincronizarServidor,
    RestaurarBackup,
    alterarChamado,
    cadastrarContasSuaURL,
    verificarSaldo,
    changeBot,
    programacaoPlataforma,
    cadastrarRecebimento,
    alterarRecebimento
}