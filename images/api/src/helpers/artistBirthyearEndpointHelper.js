/**
 * check birthyear of the artist
 * 
 * @param: artist birthyear 
 * @returns: false if no match, true if right type
 */

function checkArtistBirthyear(birthyear){ 
    if(birthyear == null ||
        typeof(birthyear) !== "string" ||
        birthyear.length <=1 ||
        birthyear.length > 4 ||
        !/^[0-9]+$/.test(birthyear)
        ) {
        return false
    }
    return true
}

module.exports = {
    checkArtistBirthyear
}