function getMoveCategory(currentRow) {
    const categoryName = currentRow
        .text()
        .trim()
        .replace('Moves from ', '')
        .replace('Moves From ', '')
        .replace('From ', '')
    const categoryId = categoryName
        .replace('(', '')
        .replace(')', '')
        .toLocaleLowerCase()
        .split(' ')
        .join('_')
    return [categoryId, categoryName]
}

module.exports = getMoveCategory;