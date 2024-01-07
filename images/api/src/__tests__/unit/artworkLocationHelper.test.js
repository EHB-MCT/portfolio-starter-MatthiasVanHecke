const { checkArtworkLocation } = require("../../helpers/artworkEndpointHelper.js");

test("return false when artwork location check has invalid inputs", () => {
    //when input is empty
    expect(checkArtworkLocation("")).toBe(false);

    //when input is null
    expect(checkArtworkLocation(null)).toBe(false);

    //when input is undefined
    expect(checkArtworkLocation(undefined)).toBe(false);

    //when input is a short
    expect(checkArtworkLocation("i")).toBe(false);

    //when input is a number
    expect(checkArtworkLocation(1)).toBe(false);

    //when input is false
    expect(checkArtworkLocation(false)).toBe(false);

    //when input is too long
    expect(checkArtworkLocation("mlkqjsdfmlkjqsdofaoidjvaoijvoazejfmlkjfoaidjavopjkdmaoeifjjdksavjpidjsvao")).toBe(false);

    //when input has capital letters
    expect(checkArtworkLocation("m8dlkjlJlfmqslK02")).toBe(false);

    //check invalid location geohash (no protocol)
    const invalidGeohash = "invalid-location";
    expect(checkArtworkLocation(invalidGeohash)).toBe(false);
});

test("return false when artwork location check has valid input", () => {
    //when input has no capital letters
    expect(checkArtworkLocation("m8dlkjljlfmqslk02")).toBe(true);
});
