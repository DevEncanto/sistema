const formatSaldo = (saldo, casas = 2) => {
    if (isNaN(saldo)) {
        saldo = 0
    }

    return parseFloat(saldo).toFixed(casas) // casas decimais
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
export default formatSaldo