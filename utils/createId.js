function createId(moveData, index) {
    return [
        moveData.name,
        moveData.attack_level,
        moveData.damage,
        moveData.startup,
        moveData.active,
        moveData.total,
        moveData.block,
        moveData.hit,
        moveData.c_hit,
        moveData.crouch_hit,
        moveData.crouch_c_hit,
        moveData.crouch_recovery,
        moveData.dodge_direction,
        moveData.sober,
        index,
    ]
        .filter(Boolean)
        .join('')
        .replace(' ', '-')
        .toLocaleLowerCase();
}

module.exports = createId;