const express = require('express');
const cheerio = require('cheerio');
const router = express.Router();
const parseMoveCommand = require('../utils/parseMoveCommand');

router.get('/', (req, res) => {
    res.send('this is vf route');
});

router.get('/char/:id', async(req, res) => {
    const url = `https://virtuafighter.com/commands/list?ver=5revo1&chara=${req.params.id}&view=flat`

    await fetch(url)
        .then((res) => res.text())
        .then((stuff) => {
            const $ = cheerio.load(stuff);
            const moveData = {};
            const allMoves = [];
            
            $('#cmdPanes')
                .children('li')
                .each((_, moveListByType)=>{
                    let commandType = '';
                    let commandTypeKey = '';
                    $(moveListByType)
                        .children()
                        .each((_, moveListByTypeChild)=> {
                            const pmoveListByTypeChild = $(moveListByTypeChild);
                            const moveListByTypeChildClassName = pmoveListByTypeChild.attr('class');
                            if(moveListByTypeChildClassName === 'commandlistCatHeader') {
                                commandType = pmoveListByTypeChild.text().trim();
                                commandTypeKey = commandType.split(' ').join('-');
                                moveData[commandTypeKey] = [];
                            } else if(moveListByTypeChildClassName === 'commandlistItems') {
                                pmoveListByTypeChild
                                .children('li')
                                .each((_, move) =>{
                                    const currentMoveData = {};
                                    $(move)
                                        .children('div')
                                        .each((_, move)=> {
                                            const pmove = $(move);
                                            if(pmove.hasClass('main')) {
                                                pmove
                                                    .children('div')
                                                    .each((_, moveMainItem) => {
                                                        const pmoveMainItem = $(moveMainItem);
                                                        if(pmoveMainItem.hasClass('name')){
                                                            currentMoveData.name = pmoveMainItem.text().trim();
                                                        } 
                                                        else if(pmoveMainItem.hasClass('command')){
                                                            currentMoveData.notes =  pmoveMainItem.text().trim();
                                                            const moveChildren = pmoveMainItem.contents().toArray();
                                                            
                                                            
                                                            const moveCommand = moveChildren
                                                                .map((moveChild) => {
                                                                    if(moveChild.type ==='text') return moveChild.data.trim();
                                                                    else if (moveChild.type ==='tag' && moveChild.tagName === 'img') {
                                                                        return $(moveChild).attr('alt')
                                                                    }
                                                                    return null;
                                                                })
                                                                .filter(Boolean);
                                                                
                                                                currentMoveData.command = parseMoveCommand(moveCommand);
                                                            
                                                        }
                                                    })
                                            } else {
                                                const [,...classNames] = pmove.attr('class').split(' ');
                                                const propName= classNames.join('_');
                                                currentMoveData[propName] = pmove.text();
                                            }
                                        });
                                    currentMoveData.commandType = commandType;
                                    moveData[commandTypeKey].push(currentMoveData);
                                    allMoves.push(currentMoveData);
                                });
                            }
                        })
                })
        
                moveData.allMoves = allMoves;
                res.send(moveData);
        })
        .catch((err) => res.sendStatus(err));
});

module.exports = router;