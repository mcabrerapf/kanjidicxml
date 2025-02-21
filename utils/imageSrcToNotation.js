const imageSrcToNotation = (imgSrc) => {
    if (!imgSrc) return '';
    if (imgSrc.includes('images/cursor-one.png')) {
        return '[1]';
    } else if (imgSrc.includes('images/cursor-b-one.png')) {
        return '[1_]';
    } else if (imgSrc.includes('images/cursor-two.png')) {
        return '[2]';
    } else if (imgSrc.includes('images/cursor-b-two.png')) {
        return '[2_]';
    } else if (imgSrc.includes('images/cursor-three.png')) {
        return '[3]';
    } else if (imgSrc.includes('images/cursor-b-three.png')) {
        return '[3_]';
    } else if (imgSrc.includes('images/cursor-four.png')) {
        return '[4]';
    } else if (imgSrc.includes('images/cursor-b-four.png')) {
        return '[4_]';
    } else if (imgSrc.includes('images/cursor-five.png')) {
        return '[5]';
    } else if (imgSrc.includes('images/cursor-b-five.png')) {
        return '[5_]';
    } else if (imgSrc.includes('images/cursor-six.png')) {
        return '[6]';
    } else if (imgSrc.includes('images/cursor-b-six.png')) {
        return '[6_]';
    } else if (imgSrc.includes('images/cursor-seven.png')) {
        return '[7]';
    } else if (imgSrc.includes('images/cursor-b-seven.png')) {
        return '[7_]';
    } else if (imgSrc.includes('images/cursor-eight.png')) {
        return '[8]';
    } else if (imgSrc.includes('images/cursor-b-eight.png')) {
        return '[8_]';
    } else if (imgSrc.includes('images/cursor-nine.png')) {
        return '[9]';
    } else if (imgSrc.includes('images/cursor-b-nine.png')) {
        return '[9_]';
    }
    return '';
}

module.exports = imageSrcToNotation;