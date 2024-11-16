import { LotesEtiquetasRepository } from "../repositorys/lotes.etiquetas.repository"
import delay from "../utils/delay"
import { converterAno, converterDateParaString, extrairAno } from "../utils/formatar-datas-createdAt"
import { calcularDatas, formatDate } from "../utils/gerador-datas"
import { logger } from "../utils/logger"
import { AxiosClientAPI } from "./api/axios.client.api"

export class LotesEtiquetasService {
    constructor(corteCoracaoContext, dataContext) {
        this.corteCoracaoContext = corteCoracaoContext
        this.dataContext = dataContext
    }

    static build(corteCoracaoContext, dataContext) {
        return new LotesEtiquetasService(corteCoracaoContext, dataContext)
    }

    async create() {

        const { dCorteCoracao, funcoes } = this.corteCoracaoContext
        const axiosAPI = new AxiosClientAPI()
        const aRepository = new LotesEtiquetasRepository(axiosAPI.api)
        const validarDados = funcoes.validarDados(dCorteCoracao.lote_etiqueta)
        if (!validarDados) {
            return funcoes.exibirAlerta("Preencha todos os campos!", "warning");
        }
        try {
            const { data_corte, data_prevista, semana_colheita, semana_corte, etiqueta_inicial, etiqueta_final } = dCorteCoracao.lote_etiqueta
            const dados = {
                criacao: converterDateParaString(data_corte),
                semana_colheita,
                semana_corte,
                etiqueta_inicial,
                etiqueta_final,
                ano_colheita: converterAno(data_prevista),
                ano_corte: converterAno(data_corte),
                id_usuario: this.dataContext.dData.usuario.id_usuario
            }

            const { data: { message, status, data } } = await aRepository.create(dados)
            console.log(data)
            return funcoes.exibirAlerta(message, status === 200 ? "success" : "error");
        } catch (error) {
            console.log(error)
            return funcoes.exibirAlerta("Uma falha foi detectada!", "error");
        }
    }

    async update() {

    }

    async delete() {

    }
    async findOne() {

    }

    async finAll() {

    }
}