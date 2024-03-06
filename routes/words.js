const express = require('express');
const router = express.Router();

const getDicMatch = (word = '', dic = []) =>  {
    return dic
        .find((dicWord) => {
            const hasRmatch = Array.isArray(dicWord?.r_ele) ? 
                !!dicWord?.r_ele.find(rEle=> rEle?.reb === word) 
                : dicWord?.r_ele?.reb  === word
            const hasKmatch = Array.isArray(dicWord?.k_ele) ? 
                !!dicWord?.k_ele.find(rEle=> rEle?.keb === word) 
                : dicWord?.k_ele?.keb  === word

            return !!hasKmatch || hasRmatch;
        }) || {};
}

router.get('/', (req, res) => {
    res.send('this is words route');
});

router.get('/:id', (req, res) => {
    const match = getDicMatch(req.params.id, req.dictionary)
    console.log({match})
    res.send(match);
});

module.exports = router;