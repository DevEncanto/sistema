const { solicitarToken, solicitarAlteracaoSenha } = require("src/service/RequestAuth")
import Cookies from "js-cookie"
import delay from "src/utils/delay"

const solicitarTokenEmail = async (email, router, setMessage, setColor, setSendEmail) => {
    try {
        if (email) {
            const response = await solicitarToken(email)
            const { status } = response
            switch (status) {
                case 200:
                    setColor("green")
                    setMessage(response.message)
                    await delay(3000)
                    setSendEmail(true)
                    break
                case 401:

                    break
                case 601:
                    Cookies.set("auth_token", "")
                    router.push('/auth/login')
                    break
                case 702:
                    Cookies.set("auth_token", "")
                    router.push('/auth/login')
                    break
            }
        } else {
            setColor("red")
            setMessage("Informe um e-mail válido para solicitar o token!")
            await delay(3500)
            setMessage("")
        }
    } catch (error) {
        if (router != undefined) {
            Cookies.set("auth_token", "")
            router.push("/error")
        }
    }
}
const trocarSenha = async (senha, confirmar, token, setLabel, setColor, router) => {
    token = token.trim()

    try {
        if (!senha || !confirmar || !token) {
            setColor("red")
            setLabel("Preencha todos os campos!")
            await delay(3500)
            setLabel("")
            return
        }
        if (senha.length < 10) {
            setColor("red")
            setLabel("A senha deve conter no mínimo 10 caracteres")
            await delay(3500)
            setLabel("")
            return
        }
        if (senha != confirmar) {
            setColor("red")
            setLabel("As senhas não correspondem!")
            await delay(3500)
            setLabel("")
            return
        }
        const response = await solicitarAlteracaoSenha(senha, token)

        const { status, message } = response

        switch (status) {
            case 200:
                setColor("green")
                setLabel(message)
                await delay(3500)
                setLabel("")
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
                setColor("red")
                setLabel(message)
                await delay(3500)
                setLabel("")
        }
    } catch (error) {
        // Cookies.set("auth_token", "")
        // router.push("/erro")
    }

}
export { solicitarTokenEmail, trocarSenha }