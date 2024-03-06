const fastXmlParser = require('fast-xml-parser');
const readXmlFile = require('./readXmlFile');


const parseDic = async () => {
    const data = await readXmlFile('../../data/kanjidic.xml')
    const parser = new fastXmlParser.XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_a_',
    });
    const parsedData = parser.parse(data);
     return parsedData?.kanjidic2?.character || [];
};

module.exports = parseDic;