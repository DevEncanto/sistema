export const initFormularioEntrada = {
    fornecedor: "",
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
    banco: ""
}

export const camposObrigatoriosFornecedor = [
    "nome",
    "cpf_cnpj",
    "endereco",
    "bairro",
    "cidade",
    "cep",
    "estado",
    "fantasia"
]
