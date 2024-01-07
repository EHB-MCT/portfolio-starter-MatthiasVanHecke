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

/**
 * check image format of the artwork
 * 
 * @param: artwork image 
 * @returns: false if no match, true if right type
 */

function checkArtworkImage(image) {
    if (
        image == null ||
        typeof image !== "string" ||
        image.length <= 1 ||
        image.length >= 30 ||
        !/\.(jpg|jpeg|png|gif)$/i.test(image)
    ) {
        return false;
    }
    return true;
}

 /**
 * check location of the artwork
 * 
 * @param: artwork location 
 * @returns: false if no match, true if right type
 */

 function checkArtworkLocation(location) {
    if (
        location == null
        ||typeof location !== "string"
        ||location.length <= 1
        ||location.length >= 20
        ||!/^[a-z0-9]+$/.test(location)
    ) {
        return false
    }
    return true
}

module.exports = {
    checkArtworkTitle,
    checkArtworkImage,
    checkArtworkLocation
}