export const CalcWidth = (size) => {
    let width = 0
    if (size < 4) width = 47
    if (size >= 4 && size <= 400) width = 45 + ((size - 2) * 9.1)
    return width
}