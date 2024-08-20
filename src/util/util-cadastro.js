import Cookies from "js-cookie"
import { inserirUsuario } from "src/service/RequestAuth"
import delay from "src/utils/delay"


export const cadastrarUsuario = async (email, senha, nome, confirmar, codigo, router, setAlert, setMessage, setLoad) => {
    try {
        if (!email || !nome || !senha || !confirmar) {
            setAlert("error")
            setMessage("Preencha todos os campos!")
            await delay(1700)
            setMessage("")
            return
        }
        if (senha != confirmar) {
            setAlert("error")
            setMessage("As senhas não correspondem!")
            await delay(1700)
            setMessage("")
            return
        }
        if (nome.length > 20) {
            setAlert("error")
            setMessage("O nome do usuário deve conter no máximo 20 caracteres!")
            await delay()
            setMessage("")
            return
        }
        if (senha.length >= 10) {
            setLoad(true)
            const response = await inserirUsuario(nome, email, senha, codigo)
            setAlert(response.view)
            await delay(1000)
            setLoad(false)
            setMessage(response.message)
            await delay(1000)
            if (response.status == 200) {
                setTimeout(() => {
                    router.push("/auth/login")
                }, 2000)
            }
            setMessage("")
        } else {
            setAlert("error")
            setMessage("Senha muito curta! Mínimo de 10 caracteres!")
            await delay()
            setMessage("")
        }
    } catch (error) {
        // Cookies.set("auth_token", "")
        // router.push("/erro")
    }
}