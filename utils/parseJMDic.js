const fastXmlParser = require('fast-xml-parser');
const readGzFile = require('./readGzFile');

const parseJMdict = async () => {
    try {
        const decompressedData = await readGzFile('../../data/JMdict.gz');
        const parser = new fastXmlParser.XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '@_a_',
        });
        const parsedData = parser.parse(decompressedData);
        return parsedData?.JMdict?.entry || [];
    } catch (error) {
        console.log(error)
        return [];
    }
}

module.exports = parseJMdict;