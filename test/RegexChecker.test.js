import { getMatchResult } from "../src/components/RegexChecker"

describe("getMatchResult", () => {
  it("should return an empty array if the input is empty", () => {
    const result = getMatchResult("", /test/)
    expect(result).toEqual([])
  })

  it("should return an array of matched and unmatched segments", () => {
    const regex = /test/gm
    const input = "This is a test string.\nLet's test it again."
    const expectedResult = [
      [
        { text: "This is a ", isMatch: false },
        { text: "test", isMatch: true },
        { text: " string.", isMatch: false },
      ],
      [
        { text: "Let's ", isMatch: false },
        { text: "test", isMatch: true },
        { text: " it again.", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("should return an array of only unmatched segments if no match is found", () => {
    const regex = /notfound/gm
    const input = "This is a test string."
    const expectedResult = [
      [
        { text: "This is a test string.", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("should handle regex with special characters", () => {
    const regex = /\d+/gm
    const input = "There are 42 cats and 7 dogs."
    const expectedResult = [
      [
        { text: "There are ", isMatch: false },
        { text: "42", isMatch: true },
        { text: " cats and ", isMatch: false },
        { text: "7", isMatch: true },
        { text: " dogs.", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })
})
