const formatSaldo = (saldo, casas = 2) => {

    console.log(saldo)

    return parseFloat(saldo).toFixed(casas) // casas decimais
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
export default formatSaldo