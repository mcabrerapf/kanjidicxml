// const fastXmlParser = require('fast-xml-parser');
var parser = require('xml2json');
const readGzFile = require('./readGzFile');

const parseJMdict = async () => {
    try {
        const decompressedData = await readGzFile('../../data/JMdict.gz'); 
        var json = parser.toJson(decompressedData);
        const parsedData = JSON.parse(json)

        return parsedData?.JMdict?.entry || [];
    } catch (error) {
        console.log(error)
        return [];
    }
}

module.exports = parseJMdict;