const {checkArtistBirthyear} = require("../helpers/artistBirthyearEndpointHelper")

test("return false when birthyear check has invalid inputs", () => {
    //when input is empty
    expect(checkArtistBirthyear("")).toBe(false)
    
    //when input is null
    expect(checkArtistBirthyear(null)).toBe(false)

    //when input is undefined
    expect(checkArtistBirthyear(undefined)).toBe(false)

    //when input is a number
    expect(checkArtistBirthyear(1)).toBe(false)

    //when input is a number in a string
    expect(checkArtistBirthyear("1")).toBe(false)

    //when input is false
    expect(checkArtistBirthyear(false)).toBe(false)

    //when input is empty
    expect(checkArtistBirthyear("Ae8&")).toBe(false)
} )

test("return true when birthyear check has valid inputs", () => {
    //when input is a string with 4 numbers
    expect(checkArtistBirthyear("2001")).toBe(true)
})