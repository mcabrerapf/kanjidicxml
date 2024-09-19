const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('this is jisho route');
});

router.get('/:id', async (req, res) => {
    const url = `https://jisho.org/search/${req.params.id}`
    // `/api/jisho/search/${term}`
    await fetch(url)
        .then((res) => res.text())
        .then((html) => {
            res.send(html);
        })
        .catch((err) => console.log(err));
    
});

module.exports = router;