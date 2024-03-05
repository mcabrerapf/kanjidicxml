const express = require('express');
const fs = require('fs');
const path = require('path');
const fastXmlParser = require('fast-xml-parser');
const kanjisRoute = require('./routes/kanjis');

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

const initApp = () => {
    parseDic()
        .then((dictionary) => {
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
                req.dictionary = dictionary;
                next();
            });
            app.use('/kanjis', kanjisRoute);
            app.get('/', (req, res) => {
                res.send('<h1>Server Running</h1>');
            });
            app.listen(port, () => {
                console.log(`Node.js HTTP server is running on port ${port}`);
            });
        })
        .catch((error) => {
            console.error('Error parsing dictionary:', error);
        });
}

initApp();
