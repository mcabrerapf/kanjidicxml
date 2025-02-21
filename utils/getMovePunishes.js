const moveKeys = ['hit', 'c_hit', 'crouch_hit', 'crouch_c_hit', 'block'];

function getPunish(value) {
    const isPlus = value > 0;
    const isMinus = value < 0;
    const staggers = value === 'S';
    const launches = value === 'D';
    let isPunishable = false;
    let guarantees = false;

    if (value < -16) {
        isPunishable = 'launch-punish';
    } else if (value < -14) {
        isPunishable = 'string-punish';
    } else if (value < -11) {
        isPunishable = 'jab-punish';
    } else if (value < -9) {
        isPunishable = 'throw-punish';
    }

    if (value >= 17) {
        guarantees = 'launch-punish';
    } else if (value >= 15) {
        guarantees = 'string-punish';
    } else if (value >= 12) {
        guarantees = 'jab-punish';
    } else if (value >= 10) {
        guarantees = 'throw-punish';
    }

    return {
        isPlus,
        isMinus,
        launches,
        staggers,
        isPunishable,
        guarantees,
    }
}
function getMovePunishes(rowData, movesProperties) {
    let punishes = {}

    moveKeys.forEach(key => {
        const keyData = rowData[key];

        const {
            isPlus,
            isMinus,
            launches,
            staggers,
            isPunishable,
            guarantees,
        } = getPunish(keyData);
         punishes = {
            ...punishes,
            [`is_plus_on_${key}`]: isPlus,
            [`is_minus_on_${key}`]: isMinus,
            [`launches_on_${key}`]: launches,
            [`staggers_on_${key}`]: staggers,
            [`is_punishable_on_${key}`]: isPunishable,
            [`guarantees_on_${key}`]: guarantees,
        }
    });

    Object.keys(punishes).forEach(punishKey => {
        if (!movesProperties[punishKey]) movesProperties[punishKey] = 0;
        if (!!punishes[punishKey]) movesProperties[punishKey] += 1;
    })
    return punishes;
}

module.exports = getMovePunishes;