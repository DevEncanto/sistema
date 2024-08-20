import { adicionarIP, buscarDesafio } from '../service/RequestDesafios';
import delay from 'src/utils/delay';
import { atualizarDadosUsuario } from './util-atualizar-dados';
import Cookies from 'js-cookie';

const solicitarDesafios = async (dificuldade, idSubUsuaio, idUsuario, nome, setDados, setReq, router, avatar, setMessage, setUser, pular) => {
    try {
        if (idSubUsuaio == "") {
            setMessage("Selecione ou adicione um endereço IP no gerenciador para continuar!")
            await delay(3500)
            setMessage("")
            return
        }
        setDados({})
        setReq(true)
        const response = await buscarDesafio(dificuldade, idUsuario, nome, avatar, idSubUsuaio, pular)
        switch (response.status) {
            case 702:
                window.localStorage.setItem("manutencaoPlat", JSON.stringify({
                    motivo: response.motivo,
                    tempo: response.tempo
                }))
                router.push("/manutencao")
                break;
            default:
                let usuario = JSON.parse(window.localStorage.getItem("user"))
                usuario.usuario.ip = response.ip
                localStorage.setItem("user", JSON.stringify(usuario))
                setUser(usuario)
                await delay(1200)
                setReq(false)
                setDados(response)
        }

    } catch (error) {
        // Cookies.set("auth_token", "")
        // router.push("/erro")
    }

}
const adicionarIp = async (idUsuario, nome, setLoad, setUser, router) => {
    setLoad(true)
    try {
        const response = await adicionarIP(idUsuario, nome)
        switch (response.status) {
            case 702:
                window.localStorage.setItem("manutencaoPlat", JSON.stringify({
                    motivo: response.motivo,
                    tempo: response.tempo
                }))
                router.push("/manutencao")
                break;
            case 200:
                await atualizarDadosUsuario(idUsuario, setUser, () => { }, null, true)
                await delay(1200)
                setLoad(false)
        }

    } catch (error) {
        if (router != undefined) {
            Cookies.set("auth_token", "")
            router.push("/erro")
        }
    }
}

export { solicitarDesafios, adicionarIp }