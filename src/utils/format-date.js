export function NumeroFormatado(number, digits){
    return number.toString().padStart(digits, '0')
}

export function FormatDatetimeNow(){
    const now = new Date(new Date().toUTCString())
    
    const year = NumeroFormatado(now.getUTCFullYear(), 2)
    const month = NumeroFormatado(now.getUTCMonth(), 2)
    const date = NumeroFormatado(now.getUTCDate(), 2)
    const hours = NumeroFormatado(now.getUTCHours(), 2)
    const minutes = NumeroFormatado(now.getUTCMinutes(), 2)
    const seconds = NumeroFormatado(now.getUTCSeconds(), 2)
    const milliseconds = NumeroFormatado(now.getUTCMilliseconds(), 5)

    const nowString = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milliseconds}` 

    return nowString
}