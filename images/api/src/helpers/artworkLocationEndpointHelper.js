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
    checkArtworkLocation
}