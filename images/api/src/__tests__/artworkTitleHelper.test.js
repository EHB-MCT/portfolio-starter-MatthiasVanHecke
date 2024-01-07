const {checkArtworkTitle} = require("../helpers/artworkTitleEndpointHelper")

test("return false when artwork title check has invalid inputs", () => {
    //when input is empty
    expect(checkArtworkTitle("")).toBe(false)

    //when input is null
    expect(checkArtworkTitle(null)).toBe(false)

    //when input is undefined
    expect(checkArtworkTitle(undefined)).toBe(false)

    //when input is a short
    expect(checkArtworkTitle("i")).toBe(false)

    //when input is a number
    expect(checkArtworkTitle(1)).toBe(false)

    //when input is false
    expect(checkArtworkTitle(false)).toBe(false)

    //when input is to long
    expect(checkArtworkTitle("mlkqjsdfmlkjqsdofaoidjvaoijvoazejfmlkjfoaidjavopjkdmaoeifjjdksavjpidjsvao")).toBe(false)
})

test("return true when artwork title check has valid inputs", () => {
    //when input is a string with lowercase
    expect(checkArtworkTitle("klaprozen")).toBe(true)
    expect(checkArtworkTitle("de schreeuw")).toBe(true)

    //when input is a string with uppercase
    expect(checkArtworkTitle("Klaprozen")).toBe(true)
    expect(checkArtworkTitle("De Schreeuw")).toBe(true)
})