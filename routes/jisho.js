const express = require('express');
const cheerio = require('cheerio');
const router = express.Router();
const iterateOverMeanings = require('../utils/iterateOverMeanings');
const parseMoveCommand = require('../utils/parseMoveCommand');

router.get('/', (req, res) => {
    res.send('this is jisho route');
});

router.get('/kanji/:id', async (req, res) => {
    const url = `https://jisho.org/search/${req.params.id}%20%23kanji`
    
    await fetch(url)
        .then((res) => res.text())
        .then((html) => {
            const $ = cheerio.load(html);
            const meanings = $('div.kanji-details__main-meanings').text().trim().split(', ')
            const kunYomi = $('div.kanji-details__main-readings').find('dl.kun_yomi').find('dd').text().trim().split('、 ');
            const onYomi = $('div.kanji-details__main-readings').find('dl.on_yomi').find('dd').text().trim('').split('、 ');
            const strokeCount = $('div.kanji-details__stroke_count').find('strong').text();

            res.send({
                kanji: req.params.id,
                meanings,
                kunYomi,
                onYomi,
                strokeCount
            })
        })
        .catch((err) => res.sendStatus(err));
    
});

router.get('/word/:id', async (req, res) => {
    const url = `https://jisho.org/search/${req.params.id}`
    // `/api/jisho/search/${term}`
    await fetch(url)
        .then((res) => res.text())
        .then((html) => {
            const $ = cheerio.load(html);
            const primaryMeaings = $('div.exact_block').children('div');
            const secondaryMeanings = $('div.concepts').children('div');
            const en = [];
            iterateOverMeanings(primaryMeaings, en, $);
            iterateOverMeanings(secondaryMeanings, en, $);
            res.send(en);
        })
        .catch((err) => console.log(err));
    
});

module.exports = router;