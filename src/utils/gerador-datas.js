export const calcularDatas = (dataInicial, dias) => {
    // Converte a data inicial do formato DD/MM/YYYY para um objeto Date
    const startDate = parseDate(dataInicial);

    // Verifica se startDate é uma instância válida de Date
    if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
        throw new Error('A data inicial deve estar no formato DD/MM/YYYY.');
    }       
    console.log(typeof dias)
    console.log(isNaN(dias))
    // Verifica se days é um número válido
    // if (typeof days !== 'number' || isNaN(dias)) {
    //     throw new Error('O prazo deve ser um número válido.');
    // }

    // Cria uma nova data para evitar modificar a data original
    const dueDate = new Date(startDate);

    // Adiciona o prazo em dias à data inicial
    dueDate.setDate(dueDate.getDate() + dias);

    // Retorna a data de vencimento no formato DD/MM/YYYY
    return formatDate(dueDate);
}

const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // Meses são zero-indexados em JavaScript
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são zero-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}