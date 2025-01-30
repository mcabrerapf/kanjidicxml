const parseMoveCommand = (moveCommand = []) => {
    return moveCommand;
    // return moveCommand
    //     .map((currentMove, moveIndex) => {
    //         const previousMove = moveCommand[moveIndex - 1];
    //         const nextMove = moveCommand[moveIndex + 1];
    //         // console.log({previousMove, currentMove, nextMove });
    //         if (previousMove === '[+]' || nextMove === '[+]') return null;
    //         if (previousMove === 'or' || nextMove === 'or') return null;
    //         if (currentMove === '[+]') return `${previousMove}+${nextMove}`;
    //         if (currentMove === 'or') return `${previousMove} or ${nextMove}`;
    //         return currentMove;

    //     })
    //     .filter(Boolean)
}

module.exports = parseMoveCommand;