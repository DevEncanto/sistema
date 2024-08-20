import { Button } from "@mui/material"
import { FabClick } from "./FabFunction"
import PlusIcon from "@heroicons/react/24/solid/PlusIcon"


export const celulasEstoque = [
    "ID INSUMO",
    "INSUMO",
    "CATEGORIA",
    "UNIDADE",
    "ENTRADAS",
    "SAÍDAS",
    "TOTAL",
]

export const camposObrigatorios = [
    "fornecedor",
    "insumo",
    "data_emissao",
    "data_recebimento",
    "qtde_insumo",
    "prazo",
    "valor_unitario",
    "valor_total",
    "parcelamento",
    "nf_boleto"
]


export const valoresStatusFinanceiro = [
    "Pago",
    "Em Aberto"
]

export const valoresFormasPagamento = [
    "Pix",
    "Débito Automático",
    "Cheque",
    "Espécie",
    "Boleto"
]

export const celulasEntradas = [
    "ID INSUMO",
    "INSUMO",
    "QTDE",
    "UNIDADE",
    "NF",
    "FORNECEDOR",
    "TOTAL",
]

export const celulasParcelas = [
    "ID PARCELA",
    "DATA VENCIMENTO",
    "VALOR",
    <FabClick />
]

export const celulasFornecedores = [
    "ID FORNECEDOR",
    "FORNECEDOR",
    <Button
        sx={{
            fontSize: "12px",
            padding: .9
        }}
        key={`btn_entrada`}
        variant='contained'
        onClick={() => { }}
        startIcon={<PlusIcon height={20} width={20} fontWeight={600} />}
    >
        Novo Fornecedor
    </Button>
]

export const celulasInsumos = [
    "ID INSUMO",
    "INSUMO",
    ""
]

export const fornecedores = [
    {
        id_fornecedor: 1,
        fornecedor: "Solo Produtivo P. A. LTDA"
    },
    {
        id_fornecedor: 2,
        fornecedor: "Oeste R. Agrícolas LTDA"
    },
    {
        id_fornecedor: 3,
        fornecedor: "Solo Produtivo P. A. LTDA"
    },
    {
        id_fornecedor: 4,
        fornecedor: "Oeste R. Agrícolas LTDA"
    },
    {
        id_fornecedor: 5,
        fornecedor: "Solo Produtivo P. A. LTDA"
    },
    {
        id_fornecedor: 6,
        fornecedor: "Oeste R. Agrícolas LTDA"
    },
    {
        id_fornecedor: 7,
        fornecedor: "Oeste R. Agrícolas LTDA"
    },
    {
        id_fornecedor: 8,
        fornecedor: "Oeste R. Agrícolas LTDA"
    }
]



export const botoesNavegacao = [
    {
        label: "Resumo",
        tab: "resumo",
    },
    {
        label: "Entradas",
        tab: "entradas"
    },
    {
        label: "Saídas",
        tab: "saidas"
    }
]

export const entradaInsumos = [
    {
        id_insumo: 1,
        insumo: "Cloreto de Potássio",
        qtde: 5000,
        unidade: "KG",
        nf: "46897",
        fornecedor: "Fertimaxi",
        total: 10000
    },
    {
        id_insumo: 1,
        insumo: "Cloreto de Potássio",
        qtde: 5000,
        unidade: "KG",
        nf: "46898",
        fornecedor: "Fertimaxi",
        total: 10000
    },
    {
        id_insumo: 1,
        insumo: "Cloreto de Potássio",
        qtde: 5000,
        unidade: "KG",
        nf: "46899",
        fornecedor: "Fertimaxi",
        total: 9000
    }
]


export const insumos = [
    {
        id_insumo: 1,
        insumo: "Cloreto de Potássio",
        categoria: "Fertilizante",
        unidade: "KG",
        entradas: 15000,
        saidas: 12000
    }
]
