const formatCommand = require("./formatCommand");
const imageSrcToNotation = require("./imageSrcToNotation");

function getCommand(rowDataChildren, cheerio) {
    const command = [];
    rowDataChildren.map(child => {
        if (child.type === 'text') {
            command.push(...formatCommand(child.data.trim().replace(/\s+/g, ' ')))
        } else if (child.type === 'tag' && child.tagName === 'img') {
            command.push(imageSrcToNotation(cheerio(child).attr('src')))
        }
    });
    return command;
}

module.exports = getCommand;