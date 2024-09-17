const not_Num = val => {
    return isNaN(val) ? 0 : val
}

const arrayVerification = data => Array.isArray(data)

const numberFormat = format => new Intl.NumberFormat().format(format)

module.exports = {
    not_Num,
    arrayVerification,
    numberFormat
}