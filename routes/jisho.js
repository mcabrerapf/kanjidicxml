const express = require('express');
const cheerio = require('cheerio');
const router = express.Router();

const iterateOverMeanings = (container, arr, $) => {
    if(!container) return;
    container.each((_,pMeaning)=> {
        const jp = $(pMeaning).find('span.text').text().trim()
        const furi = [];
        const meanings = [];
        const meaningsWrapperChildren = $(pMeaning).find('div.meanings-wrapper').children('div')
        const furiSpan = $(pMeaning).find('span.furigana').first('span').children('span')
        furiSpan.each((_, iFuri)=> {
            const furiTex = $(iFuri).text();
            furi.push(furiTex)
        })
        meaningsWrapperChildren.each((_, mChild)=> {
            const meaningWrapper = $(mChild);
            if(meaningWrapper.hasClass('meaning-wrapper')) {
                const previous = meaningWrapper.prev();
                const prevIsTag = previous.hasClass('meaning-tags');
                const meaingType = prevIsTag ? previous.text():null;
                const definition = meaningWrapper.children('div').first('div');
                const  meaningText = definition.children('span').first('span').next().text();
                if(meaningText && meaingType !== 'Wikipedia definition') meanings.push([meaingType,meaningText])
            }
       
        })
        const id = `${jp}-${furi.join('-')}-${_}`
        arr.push({
            id: id,
            jp,
            furi,
            meanings
        })
    })
}

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