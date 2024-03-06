const fastXmlParser = require('fast-xml-parser');
// const readXmlFile = require('./readXmlFile');
const readGzFile = require('./readGzFile');


const parseDic = async () => {
    // var data = await readXmlFile('../../data/kanjidic.xml')
    var decompressedData = await readGzFile('../../data/kanjidic.gz')
    var parser = new fastXmlParser.XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_a_',
    });
    return parser.parse(decompressedData)?.kanjidic2?.character || [];
    
};

module.exports = parseDic;