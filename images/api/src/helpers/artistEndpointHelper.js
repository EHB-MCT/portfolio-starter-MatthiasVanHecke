 /**
 * check name of the artist
 * 
 * @param: artist name 
 * @returns: false if no match, true if right type
 */

 function checkArtistName(name){ 
    if (
        name == null ||
        name.length <= 1 ||
        typeof(name) !== "string" ||
        name.length >= 20 ||
        !/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name)
    ) {
        return false;
    }
    return true;
}



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
    checkArtistName,
    checkArtistBirthyear
}