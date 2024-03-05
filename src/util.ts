export const isDigit = (c: string) => {
    return /^\d$/g.test(c)
}

export const isAlpha = (c: string) => {
    return /^[\w]$/g.test(c)
}

export const isAlphaNumeric = (c: string) => {
    return isAlpha(c) || isDigit(c)
}