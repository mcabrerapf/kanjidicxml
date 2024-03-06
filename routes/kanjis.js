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
    const id = req.params.id;
    const match = getDicMatch(id, req.kanjiDictionary)
    console.log({id, match})
    res.send(match);
});

module.exports = router;