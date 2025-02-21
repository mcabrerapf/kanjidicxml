const { MOVE_PROP_REPLACE } = require("../constants/vf5-revo");

function getMoveProp(currentCell) {
    const cellText = currentCell
        .text()
        .trim();
    const cellId = cellText.toLocaleLowerCase()
        .split(' ')
        .join('_')
        .replace('-', '_');
    return MOVE_PROP_REPLACE[cellId]
}

module.exports = getMoveProp;