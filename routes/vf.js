const express = require('express');
const router = express.Router();
const constants = require('../constants/vf5-revo')
const getCharacterData = require('../utils/getCharacterData');
const {
    COMBOS_SORT_OPTIONS,
    MOVELIST_SORT_OPTIONS,
    CHAR_URL_MATCH,
    CHAR_NAME_MATCH
} = constants;

const getAllCharacters = function () {
    const promises = [];
    const characters = Object.keys(CHAR_NAME_MATCH)
        .map(key => ({
            id: key,
            name: CHAR_NAME_MATCH[key].name,
            short_name: CHAR_NAME_MATCH[key].short_name
        }));
    for (let i = 0; i < characters.length; i++) {
        const { id } = characters[i];
        const urlBit = CHAR_URL_MATCH[id];
        const url = `https://virtua-fighter.com/revo/en/character/skill/${urlBit}.html`
        promises.push(
            fetch(url)
                .then((res) => res.text())
                .then((textResponse) => {
                    const characterData = getCharacterData(
                        textResponse,
                        id,
                    );
                    return characterData;
                })
                .catch((err) => res.sendStatus(err))
        );
    }

    return Promise.all(promises);
};

router.get('/', (req, res) => {
    res.send('this is vf5 revo route');
});

router.get('/proxy', (req, res) => {
    res.send('da2-g7xaqgm4jjegblwft4u5zvfs2e');
});

router.get('/char/all', async (req, res) => {
    await getAllCharacters()
        .then(allCharactersArray => {
            const allCharacters = {};
            // const attackLevelsObj = {};
            
            allCharactersArray.forEach(character => {
                allCharacters[character.id] = character;
                // character.attack_levels.forEach(attackLvl => {
                //     const currentNumOfMoves = attackLevelsObj[attackLvl.id]?.number_of_moves || 0;
                //     const newNumOfMoves =  currentNumOfMoves + attackLvl.number_of_moves 
                //     attackLevelsObj[attackLvl.id] = {
                //         ...attackLvl,
                //         number_of_moves: newNumOfMoves
                //     };
                // })
            });
            res.send({
                movelist_sort_options: MOVELIST_SORT_OPTIONS,
                combos_sort_options: COMBOS_SORT_OPTIONS,
                characters: allCharacters
            })
        })
        .catch((err) => res.sendStatus(err));

});

router.get('/char/:id', async (req, res) => {
    const charachterMatch = CHAR_URL_MATCH[req.params.id];
    if (!charachterMatch) return res.send(`NO charchter named ${req.params.id}`);
    const url = `https://virtua-fighter.com/revo/en/character/skill/${charachterMatch}.html`

    await fetch(url)
        .then((res) => res.text())
        .then((textResponse) => {
            const characterData = getCharacterData(
                textResponse, req.params.id
            );
            res.send({ characterData });
        })
        .catch((err) => res.sendStatus(err));
});
// router.get('/char/:id', async(req, res) => {
//     const url = `https://virtuafighter.com/commands/list?ver=5revo1&chara=${req.params.id}&view=flat`

//     await fetch(url)
//         .then((res) => res.text())
//         .then((stuff) => {
//             const $ = cheerio.load(stuff);
//             const moveData = {};
//             const allMoves = [];

//             $('#cmdPanes')
//                 .children('li')
//                 .each((_, moveListByType)=>{
//                     let commandType = '';
//                     let commandTypeKey = '';
//                     $(moveListByType)
//                         .children()
//                         .each((_, moveListByTypeChild)=> {
//                             const pmoveListByTypeChild = $(moveListByTypeChild);
//                             const moveListByTypeChildClassName = pmoveListByTypeChild.attr('class');
//                             if(moveListByTypeChildClassName === 'commandlistCatHeader') {
//                                 commandType = pmoveListByTypeChild.text().trim();
//                                 commandTypeKey = commandType.split(' ').join('-');
//                                 moveData[commandTypeKey] = [];
//                             } else if(moveListByTypeChildClassName === 'commandlistItems') {
//                                 pmoveListByTypeChild
//                                 .children('li')
//                                 .each((_, move) =>{
//                                     const currentMoveData = {};
//                                     $(move)
//                                         .children('div')
//                                         .each((_, move)=> {
//                                             const pmove = $(move);
//                                             if(pmove.hasClass('main')) {
//                                                 pmove
//                                                     .children('div')
//                                                     .each((_, moveMainItem) => {
//                                                         const pmoveMainItem = $(moveMainItem);
//                                                         if(pmoveMainItem.hasClass('name')){
//                                                             currentMoveData.name = pmoveMainItem.text().trim();
//                                                         } 
//                                                         else if(pmoveMainItem.hasClass('command')){
//                                                             currentMoveData.notes =  pmoveMainItem.text().trim();
//                                                             const moveChildren = pmoveMainItem.contents().toArray();


//                                                             const moveCommand = moveChildren
//                                                                 .map((moveChild) => {
//                                                                     if(moveChild.type ==='text') return moveChild.data.trim();
//                                                                     else if (moveChild.type ==='tag' && moveChild.tagName === 'img') {
//                                                                         return $(moveChild).attr('alt')
//                                                                     }
//                                                                     return null;
//                                                                 })
//                                                                 .filter(Boolean);

//                                                                 currentMoveData.command = parseMoveCommand(moveCommand);

//                                                         }
//                                                     })
//                                             } else {
//                                                 const [,...classNames] = pmove.attr('class').split(' ');
//                                                 const propName= classNames.join('_');
//                                                 currentMoveData[propName] = pmove.text();
//                                             }
//                                         });
//                                     currentMoveData.commandType = commandType;
//                                     moveData[commandTypeKey].push(currentMoveData);
//                                     allMoves.push(currentMoveData);
//                                 });
//                             }
//                         })
//                 })

//                 moveData.allMoves = allMoves;
//                 res.send(moveData);
//         })
//         .catch((err) => res.sendStatus(err));
// });

module.exports = router;