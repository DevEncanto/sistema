import { logger } from "../utils/logger";

export class MockUsuariosRepository {

    static ERROR_CLIENT = "É necessário informar um cliente!"

    constructor(client) {
        this.client = client
    }

    static build(client) {
        return client ? new MockUsuariosRepository(client) : new Error(this.ERROR_CLIENT)
    }

    async login(usuario, senha) {
        const mockUsuarios = [{
            usuario: "gabriel_vogais",
            senha: "teste",
            idUsuario: 1
        }]
        const usuarioEncontrado = mockUsuarios.find(u => u.usuario === usuario && u.senha === senha);
        logger(usuarioEncontrado)
        if (usuarioEncontrado) {
            return {
                data: {
                    token: "tokenteste1",
                    idUsuario: usuarioEncontrado.idUsuario,
                    usuario: usuario,
                    status: 200,
                    message: "Login realizado com sucesso!"
                }
            }
        } else {
            return {
                data: {
                    status: 409,
                    message: "Falha ao realizar o login"
                }
            }
        }
    }

}