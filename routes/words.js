const express = require('express');
const router = express.Router();

const getDicMatch = (word = '', dic = []) =>  {
    return dic
        .find((dicWord) => {
            const rElements = dicWord?.r_ele || [];
            const kElements = dicWord?.k_ele || [];

            const hasRmatch = Array.isArray(rElements) ? 
                !!rElements.find(rEle=> rEle?.reb === word) 
                : rElements?.reb  === word
            const hasKmatch = Array.isArray(kElements) ? 
                !!kElements.find(rEle=> rEle?.keb === word) 
                : rElements?.keb  === word

            return !!hasKmatch || hasRmatch;
        }) || {};
}

router.get('/', (req, res) => {
    res.send('this is words route');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const match = getDicMatch(id, req.dictionary)
    console.log({id, match})
    res.send(match);
});

module.exports = router;