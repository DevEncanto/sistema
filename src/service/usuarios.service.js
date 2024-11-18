import { UsuariosRepository } from "../repositorys/usuarios.repository"
import delay from "../utils/delay"
import { logger } from "../utils/logger"
import { api } from "./api"
import { AxiosClientAPI } from "./api/axios.client.api"

export class UsuariosService {
    constructor(userContext, dataContext) {
        this.userContext = userContext
        this.dataContext = dataContext
    }

    static build(userContext, dataContext) {
        return new UsuariosService(userContext, dataContext)
    }

    async login() {

        const { controle, gerenciarControle, statusLogin, router } = this.userContext
        const { funcoes } = this.dataContext
        const axiosAPI = new AxiosClientAPI()
        const aRepository = UsuariosRepository.build(axiosAPI.api)

        if (controle.usuario === "" || controle.senha === "") {
            await statusLogin("Preencha todos os campos!", "error")
            return
        }

        try {
            gerenciarControle(true, "load", false)
            const response = await aRepository.login(controle.usuario, controle.senha)
            const { data, status } = response
            await delay(1000)
            gerenciarControle(false, "load", false)
            await statusLogin(data.message, data.status == 200 ? "green" : "error")
            if (data.status == 200) {
                axiosAPI.setBearerToken(data.token)
                const res = await axiosAPI.setCookieAuthToken(data.token, data.creationTimestamp, data.expirationTimestamp)
                funcoes.dControleDataSimple("lotes_etiquetas", data.dataInitial.lotes_etiquetas, false)
                if (res) {
                    funcoes.dControleDataSimple("usuario", { id_usuario: data.id_usuario }, false)
                    funcoes.dControleDataSimple("lotes_etiquetas", data.dataInitial.lotes_etiquetas, false)
                    router.push("/home")
                    return
                }
                await statusLogin("Uma falha no sistema foi detectada!", "error")
                axiosAPI.setBearerToken("")
            }
            gerenciarControle(false, "load", false)
        } catch (error) {
            logger(error)
            gerenciarControle(false, "load", false)
            await statusLogin("Uma falha no sistema foi detectada!", "error")
        }
    }
}