export const formatarData = (data) => {
    let string = data.slice(0, 10)
    return `${string.slice(8, 10)}/${string.slice(5, 7)}/${string.slice(0, 4)}`
}


export const converterDateParaString = (dateString) => {
    // Cria um objeto Date a partir da string fornecida
    const date = new Date(dateString);

    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
        throw new Error('Data inválida');
    }

    // Extrai o dia, mês e ano
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Meses são zero-indexados
    const year = date.getUTCFullYear();

    // Retorna a data formatada
    return `${day}/${month}/${year}`;
}

export const converterAno = (dateString) => {
    // Cria um objeto Date a partir da string fornecida
    const date = new Date(dateString);

    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
        throw new Error('Data inválida');
    }

    // Extrai o dia, mês e ano
    // Meses são zero-indexados
    const year = date.getUTCFullYear();

    // Retorna a data formatada
    return year
}

export function extrairAno(data) {
    // Separando a data no formato dd/mm/yyyy

    console.log(data)

    const partes = data.split('/');

    // Retornando o ano
    return partes[2];
}