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

module.exports = {
    checkArtworkImage
};