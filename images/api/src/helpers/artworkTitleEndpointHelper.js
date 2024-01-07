 /**
 * check title of the artwork
 * 
 * @param: artwork title 
 * @returns: false if no match, true if right type
 */

 function checkArtworkTitle(title) {
    if (
        title == null ||
        title.length <= 1 ||
        typeof(title) !== "string" ||
        title.length > 30 ||
        !/^[a-zA-Z0-9 ]+$/.test(title)
    ){
        return false;
    } 
    return true;
}

 module.exports = {
    checkArtworkTitle
}