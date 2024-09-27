const iterateOverMeanings = (container, arr, $) => {
    if(!container) return;
    container.each((_,pMeaning)=> {
        const jp = $(pMeaning).find('span.text').text().trim()
        const id = `${_}-${jp}`
        const furi = [];
        const meanings = [];
        const meaningsWrapperChildren = $(pMeaning).find('div.meanings-wrapper').children('div')
        const furiSpan = $(pMeaning).find('span.furigana').first('span').children('span')
        furiSpan.each((_, iFuri)=> {
            const furiTex = $(iFuri).text();
            furi.push(furiTex)
        })
        
        meaningsWrapperChildren.each((_, mChild)=> {
            const meaningWrapper = $(mChild);
            if(meaningWrapper.hasClass('meaning-wrapper')) {
                const previous = meaningWrapper.prev();
                const prevIsTag = previous.hasClass('meaning-tags');
                const meaingType = prevIsTag ? previous.text() : null;
                const definition = meaningWrapper.children('div.meaning-definition').first('div');
                const meaningsArray = [];
            
                definition.children('span').each((__,meanMean)=> {
                    const meaning = $(meanMean);
                    if(meaning.hasClass('meaning-definition-section_divider')) return;
                    if(meaning.children('span').hasClass('sense-tag tag-see_also')) return;
                    meaningsArray.push(meaning.text());
                });
                if(!meaningsArray.length || meaingType === 'Wikipedia definition') return;
                const sanitizedText = meaningsArray.join(' ').trim();
                meanings.push([meaingType, sanitizedText]);
            }
        })
    
        arr.push({
            id: id,
            jp,
            furi,
            meanings
        })
    })
}

module.exports = iterateOverMeanings;