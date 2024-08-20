import { buscarUsuario } from "src/service/RequestAuth"
import delay from "src/utils/delay"
import Cookies from "js-cookie"
import { buscarDadosDesafios } from "src/service/RequestDesafios"

const atualizarDadosUsuario = async (idUsuario, setUser, setLoad = () => { }, router = undefined, destruct = false) => {
    setLoad(true)
    try {
        let response = await buscarUsuario(idUsuario)
        await delay(1200)
        let usuario = JSON.parse(window.localStorage.getItem("user"))
        switch (response.status) {
            case 200:
                setLoad(false)
                if (!destruct) {
                    for (let i = 0; i < response.subUsuarios.length; i++) {
                        response.subUsuarios[i].visibilidade = usuario.subUsuarios[i].visibilidade
                    }
                    window.localStorage.setItem("user", JSON.stringify(response))
                    setUser(response)
                } else {

                    usuario.subUsuarios = [
                        ...usuario.subUsuarios,
                        response.subUsuarios[response.subUsuarios.length - 1]
                    ]
                    window.localStorage.setItem("user", JSON.stringify(usuario))
                    setUser(usuario)
                }
                break
            case 702:
                window.localStorage.setItem("manutencaoPlat", JSON.stringify({
                    motivo: response.motivo,
                    tempo: response.tempo
                }))
                Cookies.set("auth_token", "")
                router.push("/manutencao")
            default:

                Cookies.set("auth_token", "")
                router.push("/auth/login")

        }
    } catch (error) {
        if (router != undefined) {
            // Cookies.set("auth_token", "")
            // router.push("/erro")
        }
    }
}

const atualizarDadosDesafios = async (idUsuario, setUser = {}, setLoad = () => { }, router = undefined) => {
    setLoad(true)
    try {
        const response = await buscarDadosDesafios(idUsuario)

        switch (response.status) {
            case 702:
                window.localStorage.setItem("manutencaoPlat", JSON.stringify({
                    motivo: response.motivo,
                    tempo: response.tempo
                }))
                Cookies.set("auth_token", "")
                router.push("/manutencao")
                break
            default:
                const subcontas = response.subcontas.subcontas
                let usuario = JSON.parse(window.localStorage.getItem("user"))
                let subUsuarios = usuario.subUsuarios
                if (subcontas.length > 0) {
                    subcontas.forEach((subconta) => {
                        subUsuarios.forEach((subUsuario, index) => {
                            if (subconta.idSubUsuario == subUsuario.idSubUsuario) {
                                subUsuarios[index].ip = subconta.ip
                                subUsuarios[index].desafios = subconta.desafios
                            }
                        })
                    })
                }
                usuario.subUsuarios = subUsuarios
                setUser(usuario)
                window.localStorage.setItem("user", JSON.stringify(usuario))
        }
    } catch (error) {
        if (router != undefined) {
            Cookies.set("auth_token", "")
            router.push("/erro")
        }
    }
}

export { atualizarDadosUsuario, atualizarDadosDesafios }