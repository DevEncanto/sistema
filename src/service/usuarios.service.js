import { UsuariosRepository } from "../repositorys/usuarios.repository"
import delay from "../utils/delay"
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

        const { controle: { usuario, senha }, gerenciarControle, statusLogin } = this.context
        const { iniciarControle, saveLocalStorage } = this.dataContext

        const axiosAPI = AxiosClientAPI.build()
        const aRepository = UsuariosRepository.build(axiosAPI)

        if (usuario || senha === "") {
            await statusLogin("Preencha todos os campos!", "error")
            return
        }

        try {
            gerenciarControle(true, "load", false)
            const { message, data, status } = await aRepository.login(usuario, senha)
            await delay(1000)
            gerenciarControle(false, "load", false)
            await statusLogin(message, status == 200 ? "sucess" : "error")

            if (status) {
                iniciarControle(data)
                saveLocalStorage(data)
                axiosAPI.setBearerToken(data.token)
                axiosAPI.setCookieAuthToken(data.token)
                axiosAPI.setPushRoute("/home")
            }
            gerenciarControle(false, "load", false)
        }catch(error){
            gerenciarControle(false, "load", false)
            await statusLogin("Falha ao realizar o login!", "error")
        }
    }
}