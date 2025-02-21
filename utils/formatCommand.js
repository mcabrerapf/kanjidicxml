function formatCommand(command) {
    const chars = ['P', 'K', 'G', '+']
    const newString = [];
    command
        .split('')
        .forEach((char, i, arr) => {
            if (!chars.includes(char)) {
                newString.push(char)
            } else {
                const pVal = arr[i - 1]
                const nVal = arr[i + 1]
                const isPrevEmptyOrButton = !pVal || pVal === ' ' || pVal === '.'|| pVal === ',' || chars.includes(pVal);
                const isNextEmptyOrButton = !nVal || nVal === ' ' || nVal === '.' || nVal === ',' || chars.includes(nVal);
                if (isPrevEmptyOrButton && isNextEmptyOrButton) newString.push('[')

                newString.push(char)
                if (isNextEmptyOrButton) newString.push(']')
            }
        })
    const finalArray = []
    let currentArr = [];
    newString.forEach((char) => {
        if (char === '[') {
            if (currentArr.length) finalArray.push(currentArr.join(''))
            currentArr = [];
            currentArr.push(char)
            return
        }
        if (char === ']') {
            currentArr.push(char)
            if (currentArr.length) finalArray.push(currentArr.join(''))
            currentArr = [];
            return
        }
        currentArr.push(char)
    })
    if(currentArr.length) finalArray.push(currentArr.join(''))
    return !!finalArray.length ? finalArray : [command];
}
module.exports = formatCommand;