const { ATTACK_LEVEL_MATCH } = require("../constants/vf5-revo");
const replaceAttackLevelValues = require("./replaceAttackLevelValues");

function getAttackLevel(value) {
    // for checking weird attack levels and updating them
    const withReplacedValues = replaceAttackLevelValues(value);
    const attackLevelName = withReplacedValues
        .replace('Special', 'Ex')
        .replace('Middle', 'Mid')
    const attackLevelId = attackLevelName
        .replace(/[^a-zA-Z\s]/g, "")
        .toLocaleLowerCase()
        .split(' ')
        .join('_')
    const attackLevelShortName = ATTACK_LEVEL_MATCH[attackLevelId].short_name;
    const attackLevelOrder = ATTACK_LEVEL_MATCH[attackLevelId].order;
    return [attackLevelId, attackLevelName, attackLevelShortName, attackLevelOrder]
}

module.exports = getAttackLevel;