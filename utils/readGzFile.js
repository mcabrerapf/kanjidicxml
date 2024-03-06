const fs = require('fs');
const zlib = require('zlib');
const path = require('path');  

const readGzFile = (filePath) => {
    return new Promise((resolve, reject) => {
        const xmlFilePath = path.join(__dirname, 'data', filePath);
        let decompressedData = '';
    
        const readStream = fs.createReadStream(xmlFilePath);
    
        const decompressionStream = zlib.createGunzip();
        readStream.pipe(decompressionStream);
    
        decompressionStream.on('data', (chunk) => {
            decompressedData += chunk.toString(); //
        });
    
        decompressionStream.on('error', (error) => {
            console.error('Error reading compressed file:', error);
            reject(null);
        });
    
        // Handle end of file
        decompressionStream.on('end', () => {
            resolve(decompressedData);
        });
    });
}

module.exports = readGzFile;