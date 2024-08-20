import { solicitarSaque } from '../service/RequestSaque'
import delay from "src/utils/delay"
import Cookies from 'js-cookie'

const saque = async (idUsuario, valor, setMode, setResponse, saldoClient, router, pix, banco, recebedor) => {
    const data = new Date()
    const hoje = data.toLocaleDateString("pt-BR")
    let user = JSON.parse(window.localStorage.getItem("user"))
    const saldoRestante = parseFloat(user?.usuario?.saldo) - parseFloat(valor)
    setMode("resposta")
    await delay(500)
    try {
        const response = await solicitarSaque(idUsuario, valor, saldoClient, pix, banco, recebedor)
        await delay(2500)
        switch (response.status) {
            case 402:
                setResponse("saque3");
                await delay(2500)
                break;
            case 403:
                setResponse("saque15"); break;
            case 200:
                setResponse("sucesso")
                user.usuario.saldo = saldoRestante == undefined || null ? 0 : saldoRestante
                user.saques.push({
                    idSaque: response.idSaque,
                    data: hoje,
                    valor: valor,
                    status: "PENDENTE",
                    banco: banco,
                    pix: pix,
                    recebedor: recebedor,
                    idUsuario: user.usuario.idUsuario
                })
                window.localStorage.setItem("user", JSON.stringify(user))
                break;
            case 1000:
                await delay(1000)
                setResponse("banimento")
                Cookies.set("auth_token", "")
                await delay(10000)
                router.push('/auth/login')
                break;
            case 702:
                window.localStorage.setItem("manutencaoPlat", JSON.stringify({
                    motivo: response.motivo,
                    tempo: response.tempo
                }))
                Cookies.set("auth_token", "")
                router.push("/manutencao")
                break
            default:
                setResponse("error")
        }
        await delay(4000)
        setMode("saque")
        setResponse("loading")
    } catch (error) {
        // Cookies.set("auth_token", "")
        // router.push("/erro")
    }
}

export {
    saque
}







