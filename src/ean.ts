/* ========================================================================== *
 * INTERNAL TYPES                                                             *
 * ========================================================================== */

/** A digit in a EAN8/EAN13 string */
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
/** Keys for code-set in patterns (`L` odd, `G` even) */
type Pattern = 'L' | 'G'

/* ========================================================================== *
 * CONSTANTS AND INITIALIZERS                                                 *
 * ========================================================================== */

/** The characters used in the font for the `L` cod-eset (odd parity) */
const CODESET_L = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ] as const
/** The characters used in the font for the `G` code-set (even parity) */
const CODESET_G = [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ] as const
/** The characters used in the font for the `R` code-set */
const CODESET_R = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ] as const

/** The codeset for the `L` and `G` patterns (`R` is used directly) */
const CODESETS = {
  L: CODESET_L,
  G: CODESET_G,
}

/**
 * Pattern used to encode the first half (digits 2...7) of an EAN13, depending
 * on the EAN13's own first digit.
 */
const PATTERNS_EAN13: Record<Digit, [ Pattern, Pattern, Pattern, Pattern, Pattern, Pattern ]> = [
  [ 'L', 'L', 'L', 'L', 'L', 'L' ],
  [ 'L', 'L', 'G', 'L', 'G', 'G' ],
  [ 'L', 'L', 'G', 'G', 'L', 'G' ],
  [ 'L', 'L', 'G', 'G', 'G', 'L' ],
  [ 'L', 'G', 'L', 'L', 'G', 'G' ],
  [ 'L', 'G', 'G', 'L', 'L', 'G' ],
  [ 'L', 'G', 'G', 'G', 'L', 'L' ],
  [ 'L', 'G', 'L', 'G', 'L', 'G' ],
  [ 'L', 'G', 'L', 'G', 'G', 'L' ],
  [ 'L', 'G', 'G', 'L', 'G', 'L' ],
]

/**
 * Pattern used to encode the 5-characters addition to an EAN13 depending on
 * the addition's own checksum (modulo 10).
 */
const PATTERNS_ADDON5: Record<Digit, [ Pattern, Pattern, Pattern, Pattern, Pattern ]> = [
  [ 'G', 'G', 'L', 'L', 'L' ],
  [ 'G', 'L', 'G', 'L', 'L' ],
  [ 'G', 'L', 'L', 'G', 'L' ],
  [ 'G', 'L', 'L', 'L', 'G' ],
  [ 'L', 'G', 'G', 'L', 'L' ],
  [ 'L', 'L', 'G', 'G', 'L' ],
  [ 'L', 'L', 'L', 'G', 'G' ],
  [ 'L', 'G', 'L', 'G', 'L' ],
  [ 'L', 'G', 'L', 'L', 'G' ],
  [ 'L', 'L', 'G', 'L', 'G' ],
]

/**
 * Pattern used to encode the 2-digits addition to an EAN13 depending on its
 * digits checksum modulo 4.
 */
const PATTERNS_ADDON2: Record<number, [ Pattern, Pattern]> = [
  [ 'L', 'L' ],
  [ 'L', 'G' ],
  [ 'G', 'L' ],
  [ 'G', 'G' ],
]

/** The separator character in our font (middle of the barcode) */
const SEPARATOR = '*'
/** The barcode start character in our font */
const START = ':'
/** The barcode end character in our font */
const END = '+'
/** The character indicating the start of the addon part */
const ADDON_START = '['
/** The character separating each character in the addon part */
const ADDON_SEPARATOR = '\\'

/* ========================================================================== *
 * ENCODING                                                                   *
 * ========================================================================== */

/** Encode an EAN13 (trusting the array is 13-digits long) */
function encodeEan13(digits: Digit[]): string[] {
  const pattern = PATTERNS_EAN13[digits[0]!]

  return [
    digits[0]!.toString(), // this is to encode the first digit as text
    CODESETS[pattern[0]][digits[1]!],
    CODESETS[pattern[1]][digits[2]!],
    CODESETS[pattern[2]][digits[3]!],
    CODESETS[pattern[3]][digits[4]!],
    CODESETS[pattern[4]][digits[5]!],
    CODESETS[pattern[5]][digits[6]!],
    SEPARATOR,
    CODESET_R[digits[7]!],
    CODESET_R[digits[8]!],
    CODESET_R[digits[9]!],
    CODESET_R[digits[10]!],
    CODESET_R[digits[11]!],
    CODESET_R[digits[12]!],
    END,
  ]
}

/** Encode an EAN8 (trusting the array is 8-digits long) */
function encodeEan8(digits: Digit[]): string[] {
  return [
    START,
    CODESET_L[digits[0]!],
    CODESET_L[digits[1]!],
    CODESET_L[digits[2]!],
    CODESET_L[digits[3]!],
    SEPARATOR,
    CODESET_R[digits[4]!],
    CODESET_R[digits[5]!],
    CODESET_R[digits[6]!],
    CODESET_R[digits[7]!],
    END,
  ]
}

/** Encode the 5-digits additional component of an EAN */
function encodeAdd5(digits: Digit[]): string[] {
  const checksum = (
    ((digits[0]! + digits[2]! + digits[4]!) * 3) +
    ((digits[1]! + digits[3]!) * 9)
  ) % 10 as Digit
  const pattern = PATTERNS_ADDON5[checksum]

  return [
    ADDON_START,
    CODESETS[pattern[0]][digits[0]!], ADDON_SEPARATOR,
    CODESETS[pattern[1]][digits[1]!], ADDON_SEPARATOR,
    CODESETS[pattern[2]][digits[2]!], ADDON_SEPARATOR,
    CODESETS[pattern[3]][digits[3]!], ADDON_SEPARATOR,
    CODESETS[pattern[4]][digits[4]!],
  ]
}

/** Encode the 5-digits additional component of an EAN */
function encodeAdd2(digits: Digit[]): string[] {
  const checksum = ((digits[0]! * 10) + digits[1]!) % 4
  const pattern = PATTERNS_ADDON2[checksum]!

  return [
    ADDON_START,
    CODESETS[pattern[0]][digits[0]!],
    ADDON_SEPARATOR,
    CODESETS[pattern[1]][digits[1]!],
  ]
}

/** Convert a string to an array of digits */
function toDigits(string: string): Digit[] {
  const digits: Digit[] = []
  for (let i = 0; i < string.length; i ++) {
    const digit = string.charCodeAt(i) - 48
    if ((digit < 0) || (digit > 9)) {
      const hex = string.charCodeAt(0).toString(16).padStart(4, '0')
      throw new Error(`Invalid character to encode "\\u${hex}"`)
    } else {
      digits.push(digit as Digit)
    }
  }
  return digits
}

/** Encode an EAN8/EAN13 with potential 2-digits or 5-digits extensions */
export function ean(string: string): string {
  const digits = toDigits(string)

  switch (digits.length) {
    case 18: // EAN13 + 5
      return [
        ...encodeEan13(digits.slice(0, 13)),
        ...encodeAdd5(digits.slice(13)),
      ].join('')

    case 17: // UPC-A + 5
      return [
        ...encodeEan13([ 0, ...digits.slice(0, 12) ]),
        ...encodeAdd5(digits.slice(12)),
      ].join('')

    case 15: // EAN13 + 2
      return [
        ...encodeEan13(digits.slice(0, 13)),
        ...encodeAdd2(digits.slice(13)),
      ].join('')

    case 14: // UPC-A + 2
      return [
        ...encodeEan13([ 0, ...digits.slice(0, 12) ]),
        ...encodeAdd2(digits.slice(12)),
      ].join('')

    case 13: // EAN13
      return encodeEan13(digits).join('')

    case 12: // UPC-A
      return encodeEan13([ 0, ...digits ]).join('')

    case 8: // EAN8
      return encodeEan8(digits).join('')

    case 5: // 5-digits addition
      return encodeAdd5(digits).join('')

    case 2: // 2-digits addition
      return encodeAdd2(digits).join('')

    default:
      throw new Error(`Unable to encode string ${digits.length} characters long`)
  }
}


export function checksum(string: string): Digit {
  const digits = toDigits(string)

  // insert a zero if the number of digits is odd to properly calculate sums
  if (digits.length % 2) digits.unshift(0)

  // calculate the sum of the digits (multiply by 3 the even ones)
  let sum = 0
  for (let i = 0; i < digits.length; i ++) {
    sum += digits[i]! * ((i % 2) ? 3 : 1)
  }

  return (10 - (sum % 10)) % 10 as Digit
}
