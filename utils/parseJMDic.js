// const fastXmlParser = require('fast-xml-parser');
var parser = require('xml2json');
const readGzFile = require('./readGzFile');

const parseJMdict = async () => {
    try {
        var decompressedData = await readGzFile('../../data/JMdict.gz'); 
        var json = parser.toJson(decompressedData);
        return JSON.parse(json)?.JMdict?.entry || []

    } catch (error) {
        console.log(error)
        return [];
    }
}

module.exports = parseJMdict;