export const formatarIDChamado = (id) => {
    let idFormatado = "[#"
    if (id.length < 7) {
        for (let i = 1; i <= 7 - id.length; i++) {
            idFormatado += "0"
        }
        idFormatado += `${id}]`
        return idFormatado
    } else {
        return `[#${id}]`
    }
}
