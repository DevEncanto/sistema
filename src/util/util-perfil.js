import { atualizarPerfil, validarToken } from "src/service/RequestPerfil"
import delay from "src/utils/delay"
import Cookies from "js-cookie"

export const atualizarDadosPerfil = async (idUsuario, avatar, nomeCompleto, setMode, pix, banco, recebedor, router) => {
    try {
        setMode("load")
        const response = await atualizarPerfil(idUsuario, avatar, nomeCompleto, pix, banco, recebedor)
        await delay(2000)

        switch (response.status) {
            case 200:
                setMode("sucess")
                let usuario = JSON.parse(window.localStorage.getItem("user"))
                usuario.usuario.avatar = avatar
                usuario.usuario.nomeCompleto = nomeCompleto
                localStorage.setItem("user", JSON.stringify(usuario))
                break;
            case 601:
                setMode("error")
                break
            case 702:
                window.localStorage.setItem("manutencaoPlat", JSON.stringify({
                    motivo: response.motivo,
                    tempo: response.tempo
                }))
                Cookies.set("auth_token", "")
                router.push("/manutencao")

        }
        await delay(2500)
        setMode("salvar")
    } catch (error) {
        if (router != undefined) {
            // Cookies.set("auth_token", "")
            // router.push("/erro")
        }
    }
}


export const validarIndicacao = async (idUsuario, token, setTitle, setIcon, setMessage, setMode, router) => {

    try {
        setMode("load")
        const response = await validarToken(idUsuario, token)
        await delay(2000)
        setMode("response")
        switch (response.status) {
            case 200:
                setTitle("Código Confirmado!")
                setMessage(response.message)
                setIcon("trofeu-icon")
                break;
            case 202:
                setTitle("Falha na confirmação")
                setMessage(response.message)
                setIcon("erro")
                await delay(3400)
                setTitle("Código de Indicação")
                setMessage("Olá caro usuário, tudo bem? Digite um código de indicação válido e ganhe um bônus de R$ 1,00")
                setIcon("trofeu-icon")
                setMode("validacao")
                break;
            case 201:
                setMode("response")
                setTitle("Falha na confirmação!")
                setMessage(response.message)
                setIcon("erro")
                await delay(3400)
                setTitle("Código de Indicação")
                setMessage("Olá caro usuário, tudo bem? Digite um código de indicação válido e ganhe um bônus de R$ 1,00")
                setIcon("trofeu-icon")
                setMode("validacao")
                break;
            case 702:
                window.localStorage.setItem("manutencaoPlat", JSON.stringify({
                    motivo: response.motivo,
                    tempo: response.tempo
                }))
                Cookies.set("auth_token", "")
                router.push("/manutencao")

        }
        setMode("validacao")
    } catch (error) {
        if (router != undefined) {
            Cookies.set("auth_token", "")
            router.push("/erro")
        }
    }
}