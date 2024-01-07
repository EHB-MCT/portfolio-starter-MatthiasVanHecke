const { checkArtworkImage } = require("../../helpers/artworkEndpointHelper");

test("return false when artwork image check has invalid inputs", () => {
    //when input is empty
    expect(checkArtworkImage("")).toBe(false);

    //when input is null
    expect(checkArtworkImage(null)).toBe(false);

    //when input is undefined
    expect(checkArtworkImage(undefined)).toBe(false);

    //when input is a number
    expect(checkArtworkImage(1)).toBe(false);

    //when input is false
    expect(checkArtworkImage(false)).toBe(false);

    //when input is too long
    expect(checkArtworkImage("mlkqjsdfmlkjqsdofaoidjvaoijvoazejfmlkjfoaidjavopjkdmaoeifjjdksavjpidjsvao")).toBe(false);

    //when input has an invalid image format
    expect(checkArtworkImage("image.pdf")).toBe(false);
});

test("return true when artwork image check has valid input", () => {
    //when input has a valid image format
    expect(checkArtworkImage("image.jpg")).toBe(true);
    expect(checkArtworkImage("image.png")).toBe(true);
    expect(checkArtworkImage("image.jpeg")).toBe(true);
    expect(checkArtworkImage("image.gif")).toBe(true);
});