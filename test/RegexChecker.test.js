import { getMatchResult } from "../src/components/RegexChecker"

describe("getMatchResult", () => {
  // Existing tests

  // New tests
  it("1. should match any character using dot (.)", () => {
    const regex = /t.st/gm
    const input = "This is a test string."
    const expectedResult = [
      [
        { text: "This is a ", isMatch: false },
        { text: "test", isMatch: true },
        { text: " string.", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("2. should match characters repeated zero or more times using asterisk (*)", () => {
    const regex = /ca*t/gm
    const input = "I have a cat and a caat and a caaat."
    const expectedResult = [
      [
        { text: "I have a ", isMatch: false },
        { text: "cat", isMatch: true },
        { text: " and a ", isMatch: false },
        { text: "caat", isMatch: true },
        { text: " and a ", isMatch: false },
        { text: "caaat", isMatch: true },
        { text: ".", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("3. should match characters repeated one or more times using plus (+)", () => {
    const regex = /ca+t/gm
    const input = "I have a cat and a caat and a caaat."
    const expectedResult = [
      [
        { text: "I have a ", isMatch: false },
        { text: "cat", isMatch: true },
        { text: " and a ", isMatch: false },
        { text: "caat", isMatch: true },
        { text: " and a ", isMatch: false },
        { text: "caaat", isMatch: true },
        { text: ".", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("4. should match characters repeated exactly n times using curly braces ({n})", () => {
    const regex = /ca{2}t/gm
    const input = "I have a cat and a caat and a caaat."
    const expectedResult = [
      [
        { text: "I have a cat and a ", isMatch: false },
        { text: "caat", isMatch: true },
        { text: " and a caaat.", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("5. should match characters repeated n or more times using curly braces ({n,})", () => {
    const regex = /ca{2,}t/gm
    const input = "I have a cat and a caat and a caaat."
    const expectedResult = [
      [
        { text: "I have a cat and a ", isMatch: false },
        { text: "caat", isMatch: true },
        { text: " and a ", isMatch: false },
        { text: "caaat", isMatch: true },
        { text: ".", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })
  it("6. should match either of the specified patterns using the pipe (|)", () => {
    const regex = /cat|dog/gm
    const input = "I have a cat and a dog."
    const expectedResult = [
      [
        { text: "I have a ", isMatch: false },
        { text: "cat", isMatch: true },
        { text: " and a ", isMatch: false },
        { text: "dog", isMatch: true },
        { text: ".", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("7. should match optional characters using the question mark (?)", () => {
    const regex = /colou?r/gm
    const input = "I prefer color, but some people write it as colour."
    const expectedResult = [
      [
        { text: "I prefer ", isMatch: false },
        { text: "color", isMatch: true },
        { text: ", but some people write it as ", isMatch: false },
        { text: "colour", isMatch: true },
        { text: ".", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("8. should match the start of a line using the caret (^)", () => {
    const regex = /^cat/gm
    const input = "dog\nrat\ncat"
    const expectedResult = [
      [{ text: "dog", isMatch: false }],
      [{ text: "rat", isMatch: false }],
      [{ text: "cat", isMatch: true }],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("9. should match the end of a line using the dollar sign ($)", () => {
    const regex = /dog$/gm
    const input = "cat\ndog\nrat"
    const expectedResult = [
      [{ text: "cat", isMatch: false }],
      [{ text: "dog", isMatch: true }],
      [{ text: "rat", isMatch: false }],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("10. should match any single character using the dot (.)", () => {
    const regex = /c.t/gm
    const input = "I have a cat, a cot, and a cut."
    const expectedResult = [
      [
        { text: "I have a ", isMatch: false },
        { text: "cat", isMatch: true },
        { text: ", a ", isMatch: false },
        { text: "cot", isMatch: true },
        { text: ", and a ", isMatch: false },
        { text: "cut", isMatch: true },
        { text: ".", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })
  it("11. should match a character in a character set using square brackets ([])", () => {
    const regex = /[aeiou]/gm
    const input = "Hello, world!"
    const expectedResult = [
      [
        { text: "H", isMatch: false },
        { text: "e", isMatch: true },
        { text: "llo, ", isMatch: false },
        { text: "o", isMatch: true },
        { text: "rld!", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("12. should match any character except those in a character set using the caret (^) in square brackets ([^])", () => {
    const regex = /[^aeiou]+/gm
    const input = "Hello, world!"
    const expectedResult = [
      [
        { text: "H", isMatch: true },
        { text: "e", isMatch: false },
        { text: "ll", isMatch: true },
        { text: "o", isMatch: false },
        { text: ", w", isMatch: true },
        { text: "o", isMatch: false },
        { text: "rld!", isMatch: true },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("13. should match a range of characters using a hyphen (-) in square brackets ([])", () => {
    const regex = /[a-z]+/gm
    const input = "123abc456"
    const expectedResult = [
      [
        { text: "123", isMatch: false },
        { text: "abc", isMatch: true },
        { text: "456", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("14. should match a character followed by a specific number of repetitions using curly braces ({n}) where n is a number", () => {
    const regex = /a{3}/gm
    const input = "aa aaa aaaa"
    const expectedResult = [
      [
        { text: "aa ", isMatch: false },
        { text: "aaa", isMatch: true },
        { text: " ", isMatch: false },
        { text: "aaa", isMatch: true },
        { text: "a", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })
  it("15. should match a character followed by a range of repetitions using curly braces ({n,m}) where n and m are numbers", () => {
    const regex = /a{2,3}/gm
    const input = "a aa aaa aaaa"
    const expectedResult = [
      [
        { text: "a ", isMatch: false },
        { text: "aa", isMatch: true },
        { text: " ", isMatch: false },
        { text: "aaa", isMatch: true },
        { text: " ", isMatch: false },
        { text: "aaa", isMatch: true },
        { text: "a", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("16. should match a character followed by zero or more repetitions using the asterisk (*)", () => {
    const regex = /ca*t/gm
    const input = "ct cat caat caaat"
    const expectedResult = [
      [
        { text: "", isMatch: false },
        { text: "ct", isMatch: true },
        { text: " ", isMatch: false },
        { text: "cat", isMatch: true },
        { text: " ", isMatch: false },
        { text: "caat", isMatch: true },
        { text: " ", isMatch: false },
        { text: "caaat", isMatch: true },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("17. should match a character followed by one or more repetitions using the plus sign (+)", () => {
    const regex = /ca+t/gm
    const input = "ct cat caat caaat"
    const expectedResult = [
      [
        { text: "ct ", isMatch: false },
        { text: "cat", isMatch: true },
        { text: " ", isMatch: false },
        { text: "caat", isMatch: true },
        { text: " ", isMatch: false },
        { text: "caaat", isMatch: true },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("18. should match either the whole word or nothing using word boundaries (\\b)", () => {
    const regex = /\bcat\b/gm
    const input = "cat concatenate"
    const expectedResult = [
      [
        { text: "", isMatch: false },
        { text: "cat", isMatch: true },
        { text: " concatenate", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })
  it("19. should match non-word boundaries (\\B)", () => {
    const regex = /ar\B/gm
    const input = "arbitrary array"
    const expectedResult = [
      [
        { text: "a", isMatch: false },
        { text: "r", isMatch: true },
        { text: "bitrary ", isMatch: false },
        { text: "ar", isMatch: false },
        { text: "ray", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })

  it("20. should match a character using escape sequences", () => {
    const regex = /\\d/gm
    const input = "This is a \\d test."
    const expectedResult = [
      [
        { text: "This is a ", isMatch: false },
        { text: "\\d", isMatch: true },
        { text: " test.", isMatch: false },
      ],
    ]

    const result = getMatchResult(input, regex)
    expect(result).toEqual(expectedResult)
  })
})
