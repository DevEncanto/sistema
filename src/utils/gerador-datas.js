export const calcularDatas = (dataInicial, dias, dias_reducao = 0) => {
    // Converte a data inicial do formato DD/MM/YYYY para um objeto Date
    const startDate = parseDate(dataInicial);

    // Verifica se startDate é uma instância válida de Date
    if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
        throw new Error('A data inicial deve estar no formato DD/MM/YYYY.');
    }

    // Verifica se days é um número válido
    // if (typeof days !== 'number' || isNaN(dias)) {
    //     throw new Error('O prazo deve ser um número válido.');
    // }

    // Cria uma nova data para evitar modificar a data original
    const dueDate = new Date(startDate);

    // Adiciona o prazo em dias à data inicial
    dueDate.setDate(dueDate.getDate() + dias - dias_reducao);

    // Retorna a data de vencimento no formato DD/MM/YYYY
    return formatDate(dueDate);
}

export const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // Meses são zero-indexados em JavaScript
}

export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são zero-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function obterSemana(dataString) {
    // Extrair o dia, mês e ano da string no formato DD/MM/YYYY
    const [dia, mes, ano] = dataString.split('/').map(Number);

    // Criar um objeto Date utilizando o ano, mês (ajustado para 0-indexed) e dia
    const data = new Date(ano, mes - 1, dia);

    // Criar uma data para o primeiro dia do ano
    const inicioAno = new Date(ano, 0, 1);

    // Calcular a diferença em milissegundos entre a data e o primeiro dia do ano
    const diff = data - inicioAno;

    // Calcular o número de dias desde o primeiro dia do ano
    const diasNoAno = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Calcular a semana do ano (considerando que a semana começa no dia 1 de janeiro)
    const semana = Math.ceil((diasNoAno + 1) / 7);

    return semana;
}

export function converterDataCalendario(dataString) {
    // Extrair o dia, mês e ano da string no formato DD/MM/YYYY
    const [dia, mes, ano] = dataString.split('/').map(Number);

    // Criar um objeto Date utilizando o ano, mês (ajustado para 0-indexed) e dia
    const data = new Date(Date.UTC(ano, mes - 1, dia, 3, 0, 0, 0));

    // Retornar a string no formato ISO 8601 com o horário UTC
    return data.toISOString();
}

export const diasSemanaAnterior = (dataStr) => {
    // Converte a string da data para um objeto Date
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    const data = new Date(ano, mes - 1, dia);

    // Retrocede a data até encontrar a quarta-feira mais próxima antes da data fornecida
    let quartaAnterior = new Date(data);
    
    // Se a data fornecida for uma quarta-feira, devemos retroceder mais uma semana
    if (quartaAnterior.getDay() === 3) { // 3 representa quarta-feira
        quartaAnterior.setDate(quartaAnterior.getDate() - 7);
    }
    
    // Retrocede até encontrar a quarta-feira
    while (quartaAnterior.getDay() !== 3) { // 3 representa quarta-feira
        quartaAnterior.setDate(quartaAnterior.getDate() - 1);
    }
    
    // Formata a data no padrão DD/MM/YYYY
    const diaFormatado = String(quartaAnterior.getDate()).padStart(2, '0');
    const mesFormatado = String(quartaAnterior.getMonth() + 1).padStart(2, '0');
    const anoFormatado = quartaAnterior.getFullYear();
    
    return `${diaFormatado}/${mesFormatado}/${anoFormatado}`;
}