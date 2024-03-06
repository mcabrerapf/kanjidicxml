const fastXmlParser = require('fast-xml-parser');
const readXmlFile = require('./readXmlFile');


const parseDic = async () => {
    var data = await readXmlFile('../../data/kanjidic.xml')
    var parser = new fastXmlParser.XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_a_',
    });
    return parser.parse(data)?.kanjidic2?.character || [];
    
};

module.exports = parseDic;