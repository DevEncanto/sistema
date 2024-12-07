import { LotesEtiquetasRepository } from "../repositorys/lotes.etiquetas.repository"
import delay from "../utils/delay"
import { converterAno, converterDateParaString, extrairAno } from "../utils/formatar-datas-createdAt"
import { calcularDatas, formatDate } from "../utils/gerador-datas"
import { AxiosClientAPI } from "./api/axios.client.api"

export class LotesEtiquetasService {
    constructor(corteCoracaoContext, dataContext) {
        this.corteCoracaoContext = corteCoracaoContext
        this.dataContext = dataContext
    }

    static build(corteCoracaoContext, dataContext) {
        return new LotesEtiquetasService(corteCoracaoContext, dataContext)
    }

    createUpdateData() {
        const { dCorteCoracao, funcoes, cCorteCoracao } = this.corteCoracaoContext

        const validarDados = funcoes.validarDados(dCorteCoracao.lote_etiqueta)

        if (!validarDados) {
            funcoes.exibirAlerta("Preencha todos os campos!", "warning", "tab8", 1800);
            return false
        }

        const { ano_colheita, ano_corte, data_corte, semana_colheita, semana_corte, etiqueta_inicial, etiqueta_final } = dCorteCoracao.lote_etiqueta

        if (etiqueta_inicial > etiqueta_final || etiqueta_final < 0 || etiqueta_inicial < 0) {
            funcoes.exibirAlerta("Intervalo de etiquetas inválido!", "error", "tab8");
            return false
        }

        const dados = {
            criacao: converterDateParaString(data_corte),
            semana_colheita: parseInt(semana_colheita),
            semana_corte: parseInt(semana_corte),
            etiqueta_inicial: parseInt(etiqueta_inicial),
            etiqueta_final: parseInt(etiqueta_final),
            ano_colheita: parseInt(ano_colheita),
            ano_corte: parseInt(ano_corte),
            id_usuario: this.dataContext.dData.usuario.id_usuario
        }
        return dados
    }

    async create() {
        const { funcoes } = this.corteCoracaoContext
        const axiosAPI = new AxiosClientAPI()
        const aRepository = new LotesEtiquetasRepository(axiosAPI.api)

        try {
            const dados = this.createUpdateData()

            if (!dados) { return }
            const { data: { message, status, data } } = await aRepository.create(dados)
            funcoes.gControleCorteCoracao(true, "load", false)
            const type = status === 200 ? "success" : "error"
            const retorno = status === 200 ? "tab4" : "tab8"
            await funcoes.exibirAlerta(message, type, retorno);
            funcoes.gControleCorteCoracao(false, "load", false)
            if (status === 200) {
                const old_data = this.dataContext.dData.lotes_etiquetas
                const new_data = [...old_data, data]
                this.dataContext.funcoes.dControleDataSimple("lotes_etiquetas", new_data, false)
                funcoes.gControleCorteCoracao("tab5", "return", false)
                funcoes.resetFormulario("lote_etiqueta")
            }
            return
        } catch (error) {
            console.log(error)
            return funcoes.exibirAlerta("Uma falha foi detectada!", "error", "tab8");
        }
    }

    async update() {
        const { funcoes } = this.corteCoracaoContext
        const axiosAPI = new AxiosClientAPI()
        const aRepository = new LotesEtiquetasRepository(axiosAPI.api)

        try {
            const dados = this.createUpdateData()

            if (!dados) { return }
            dados.id_lote_etiqueta = this.corteCoracaoContext.cCorteCoracao.id_lote
            funcoes.gControleCorteCoracao(true, "load", false)
            const { data: { message, status, data } } = await aRepository.update(dados)
            const type = status === 200 ? "success" : "error"
            const retorno = status === 200 ? "tab4" : "tab8"
            if (status === 200) {
                const array = this.dataContext.dData.lotes_etiquetas.map(obj =>
                    obj.id_lote_etiqueta === parseInt(data.id_lote_etiqueta) ? data : obj
                )
                this.dataContext.funcoes.dControleDataSimple("lotes_etiquetas", array, false)
            }

            funcoes.gControleCorteCoracao("tab5", "return", false)
            funcoes.resetFormulario("lote_etiqueta")
            funcoes.gControleCorteCoracao(false, "load", false)
            await funcoes.exibirAlerta(message, type, retorno);

            return
        } catch (error) {
            console.log(error)
            return funcoes.exibirAlerta("Uma falha foi detectada!", "error");
        }
    }

    async delete() {

    }
    async findOne() {

    }

    async finAll() {

    }
}