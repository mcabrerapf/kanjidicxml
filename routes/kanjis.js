const express = require('express');
const router = express.Router();

const getDicMatch = (kanji = '', dic = []) =>  {
    return dic
        .find( ({literal}) => literal === kanji) || {};
}

router.get('/', (req, res) => {
    res.send('this is kanji route');
});

router.get('/:id', (req, res) => {
    const match = getDicMatch(req.params.id, req.kanjiDictionary)
    console.log({match})
    res.send(match);
});

module.exports = router;