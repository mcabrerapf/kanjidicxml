function extractFirstNumber(str) {
    const match = str.match(/\d+/);
    return match ? Number(match[0]) : null;
}
function getValue(rowDataText, command, columnName) {
    if (columnName === 'damage') {
        const firstNumber = extractFirstNumber(rowDataText);
        return firstNumber || 0;
    }
    if (columnName === 'notes') {
        return  rowDataText.trim()
    }
    const parsedValue = isNaN(rowDataText) ? rowDataText.trim() : Number(rowDataText);
    const valueToUse = command && command.length ? command : parsedValue;
    return valueToUse || '-';
}

module.exports = getValue;