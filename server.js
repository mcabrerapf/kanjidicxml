const express = require('express');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const fastXmlParser = require('fast-xml-parser');
const kanjisRoute = require('./routes/kanjis');
const wordsRoute = require('./routes/words');

const port = process.env.PORT || 3000;

const parseDic = async () => {
    return new Promise((resolve, reject) => {
        const xmlFilePath = path.join(__dirname, 'data', 'kanjidic.xml');
        fs.readFile(xmlFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading XML file:', err);
                reject(err);
            } else {
                const parser = new fastXmlParser.XMLParser({
                    ignoreAttributes: false,
                    attributeNamePrefix: '@_a_',
                });
                const parsedData = parser.parse(data);
                resolve(parsedData?.kanjidic2?.character || []);
            }
        });
    });
};

const parseJMdict = async ()=> {
    return new Promise((resolve, reject) => {
        const xmlFilePath = path.join(__dirname, 'data', 'JMdict.gz');
        let decompressedData = '';
    
        const readStream = fs.createReadStream(xmlFilePath);
    
        const decompressionStream = zlib.createGunzip();
        readStream.pipe(decompressionStream);
    
        decompressionStream.on('data', (chunk) => {
            decompressedData += chunk.toString(); //
        });
    
        decompressionStream.on('error', (error) => {
            console.error('Error reading compressed file:', error);
        });
    
        // Handle end of file
        decompressionStream.on('end', () => {
            try {
                const parser = new fastXmlParser.XMLParser({
                    ignoreAttributes: false,
                    attributeNamePrefix: '@_a_',
                });
                const parsedData = parser.parse(decompressedData);
                resolve(parsedData?.JMdict?.entry || []);
            } catch (error) {
                console.log(error)
            }
        });
    });
}

const initApp = async () => {
    // const jmDict = await parseJMdict()
    //     .then((res)=> {
    //         return res
    //     })
    //     .catch((error) => {
    //         console.error('Error parsing JMdic:', error);
    //         return [];
    //     });
    
    const kanjiDic = await parseDic()
        .then((dictionary) => {
            return dictionary
        })
        .catch((error) => {
            console.error('Error parsing dictionary:', error);
            return []
        });

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
        req.dictionary = [];
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
