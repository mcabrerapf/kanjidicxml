const express = require('express');
const kanjisRoute = require('./routes/kanjis');
const wordsRoute = require('./routes/words');
const parseDic = require('./utils/parseDic');
const parseJMDic = require('./utils/parseJMDic');

const port = process.env.PORT || 3000;

const initApp = async () => {
    const kanjiDic = await parseDic();
    const jmDic = await parseJMDic();

    const app = express();
    app.use((req, res, next) => {
        // Allow requests from any origin
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Allow specific HTTP methods
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        // Allow specific HTTP headers
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // Allow credentials (if needed)
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        req.dictionary = jmDic;
        req.kanjiDictionary = kanjiDic
        next();
    });
    app.use('/words', wordsRoute);
    app.use('/kanjis', kanjisRoute);
    app.get('/', (req, res) => {
        res.send('ONLINE');
    });
    app.listen(port, () => {
        console.log(`Node.js HTTP server is running on port ${port}`);
    });
}

initApp();
