export const initControle = {
    tab: "resumo",
    tabsEntrada: "tabela",
    tabsSaida: "tabela",
    insumo: "",
    type: "",
    alert: "",
    navigate: true
}

export const initFormularioEntrada = {
    fornecedor: "",
    id_fornecedor: 0,
    id_insumo: 0,
    insumo: "",
    data_emissao: "",
    data_recebimento: "",
    status_financeiro: "Em Aberto",
    forma_pagamento: "Pix",
    qtde_insumo: "",
    prazo: "",
    valor_unitario: "",
    descontos: "",
    valor_total: "",
    parcelamento: "",
    nf_boleto: "",
    parcelamentos: [

    ]
}

export const initDados = {
    insumo: {
        nome: "",
        categoria: "",
        id_categoria: 0,
        composicao: "",
        unidade: "",
        minimo: ""
    },
    fornecedor: {
        nome: "",
        cpf_cnpj: "",
        inscricao: "",
        endereco: "",
        bairro: "",
        cidade: "",
        cep: "",
        estado: "",
        email: "",
        pix: "",
        agencia: "",
        conta: "",
        banco: "",
        fantasia: ""
    },
    entrada_insumo: {
        fornecedor: "",
        insumos: [],
        id_fornecedor: 0,
        data_emissao: "",
        total_geral: 0,
        data_recebimento: "",
        status_financeiro: "Em Aberto",
        forma_pagamento: "Pix",
        prazo: "",
        parcelamento: "",
        nf_boleto: "",
        id_estoque: "",
        estoque: "",
        parcelamentos: [

        ]
    },
    insumo_entrada: {
        id_insumo: 0,
        insumo: "",
        qtde_insumo: "",
        valor_unitario: "",
        descontos: "",
        valor_total: "",
    },
    categoria: {
        nome: "",
        descricao: ""
    },
    estoque: {
        nome: "",
        id_lote: "",
        lote: "",
        tipo_estoque: "",
        descricao: ""
    },
    lote: {
        nome: "",
        descricao: ""
    }
}

export const initFormularioInsumo = {
    nome: "",
    categoria: "",
    id_categoria: 0,
    composicao: "",
    unidade: "",
    minimo: ""
}

export const initFormularioFornecedor = {
    nome: "",
    cpf_cnpj: "",
    inscricao: "",
    endereco: "",
    bairro: "",
    cidade: "",
    cep: "",
    estado: "",
    email: "",
    pix: "",
    agencia: "",
    conta: "",
    banco: "",
    fantasia: ""
}
