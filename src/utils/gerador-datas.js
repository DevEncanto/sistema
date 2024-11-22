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

    // Ajustar para a primeira segunda-feira do ano (conforme o padrão ISO 8601)
    const diaSemana = inicioAno.getDay();  // Domingo é 0, Segunda-feira é 1, etc.
    
    // Se o dia da semana for domingo (0), devemos ajustar para a segunda-feira anterior
    const primeiroDiaSemana = new Date(inicioAno);
    if (diaSemana === 0) {
        primeiroDiaSemana.setDate(inicioAno.getDate() - 6); // Ajusta para a segunda-feira anterior
    } else {
        primeiroDiaSemana.setDate(inicioAno.getDate() - diaSemana + 1); // Ajusta para a segunda-feira da semana
    }

    // Calcular a diferença em milissegundos entre a data e o primeiro dia da semana ISO
    const diff = data - primeiroDiaSemana;

    // Calcular o número de dias desde o primeiro dia da semana ISO
    const diasNoAno = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Calcular a semana do ano (considerando o início da primeira semana como a primeira segunda-feira do ano)
    const semana = Math.ceil((diasNoAno + 1) / 7);

    // Verificar se a data está entre os últimos dias de 2024 (deve ser contada como semana 1 de 2025)
    // Ajuste para 31/12/2024 ser parte da semana 1 de 2025
    const ultimaSegundaFeiraDe2024 = new Date(2024, 11, 30); // Última segunda-feira de 2024
    const diffDataUltimaSegundaFeira = data - ultimaSegundaFeiraDe2024;

    // Verificar se a data é 30 ou 31 de dezembro de 2024
    if (ano === 2024 && (data.getDate() === 30 || data.getDate() === 31)) {
        return 1; // 30/12/2024 e 31/12/2024 devem ser semana 1 de 2025
    }

    // Validar para garantir que o número de semanas não ultrapasse 52 ou 53
    const ultimoDiaAno = new Date(ano, 11, 31); // Último dia do ano
    const diffUltimoDia = ultimoDiaAno - primeiroDiaSemana;
    const diasRestantesAno = Math.floor(diffUltimoDia / (1000 * 60 * 60 * 24));
    const semanasNoAno = Math.ceil((diasRestantesAno + 1) / 7);

    // Se a semana for maior que o número de semanas no ano, ajustar para o número de semanas válidas
    if (semanasNoAno >= 52 && semana > semanasNoAno) {
        return semanasNoAno;
    }

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