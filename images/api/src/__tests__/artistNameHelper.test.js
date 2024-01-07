const {checkArtistName} = require("../helpers/artistNameEndpointHelper")

test("return false when name check has invalid inputs", () => {
    //when input is empty
    expect(checkArtistName("")).toBe(false)
    
    //when input is null
    expect(checkArtistName(null)).toBe(false)

    //when input is undefined
    expect(checkArtistName(undefined)).toBe(false)

    //when input is a short
    expect(checkArtistName("i")).toBe(false)

    //when input is a number
    expect(checkArtistName(1)).toBe(false)

    //when input is false
    expect(checkArtistName(false)).toBe(false)

    //when input is to long
    expect(checkArtistName("mlkqjsdfmlkjqsdofaoidjvaoijvoazejfmlkjfoaidjavopjkdmaoeifjjdksavjpidjsvao")).toBe(false)
} )

test("return true when name check has valid inputs", () => {
    //when input is a string with lowercase
    expect(checkArtistName("matthias")).toBe(true)
    expect(checkArtistName("jean marie")).toBe(true)

    //when input is a string with uppercase
    expect(checkArtistName("Matthias")).toBe(true)
    expect(checkArtistName("Jean Marie")).toBe(true)
})