const fs = require('fs');
const path = require('path');

const readXmlFile = (filePath) => {
    return new Promise((resolve, reject) => {
        const xmlFilePath = path.join(__dirname, 'data', filePath);
    
        fs.readFile(xmlFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading XML file:', err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = readXmlFile;