var parser = require('xml2json');
const readGzFile = require('./readGzFile');

const parseJMdict = async () => {
    try {
        var decompressedData = await readGzFile('../../data/JMdict_e.gz')
            .then(res=> {
                return JSON.parse(parser.toJson(res))
            }) 
            .catch(err=> {
                console.log(err)
                return null;
            })

        return decompressedData?.JMdict?.entry || [];

    } catch (error) {
        console.log(error)
        return [];
    }
}

module.exports = parseJMdict;