/* eslint-disable no-sparse-arrays */
/* eslint-disable @stylistic/no-multi-spaces */

/* ========================================================================== *
 * INTERNAL TYPES                                                             *
 * ========================================================================== */

/** The three code-sets of Code128 */
export type CodeSet = 'A' | 'B' | 'C'
/** Any possible value in our sequence */
export type Code = typeof DATA[number][0]

/* ========================================================================== *
 * CONSTANTS AND INITIALIZERS                                                 *
 * ========================================================================== */

/** The unicode character representing Code128's `FNC1` */
export const FNC1 = '\uf001'
/** The unicode character representing Code128's `FNC2` */
export const FNC2 = '\uf002'
/** The unicode character representing Code128's `FNC3` */
export const FNC3 = '\uf003'
/** The unicode character representing Code128's `FNC4` */
export const FNC4 = '\uf004'

const DATA = [
  //       CODESET A   CODESET B   CODESET C   FONT CHARACTER
  [ 0,   ' ',        ' ',        '00',       '\u00c2' ], // "Â"
  [ 1,   '!',        '!',        '01',       '!'      ],
  [ 2,   '"',        '"',        '02',       '"'      ],
  [ 3,   '#',        '#',        '03',       '#'      ],
  [ 4,   '$',        '$',        '04',       '$'      ],
  [ 5,   '%',        '%',        '05',       '%'      ],
  [ 6,   '&',        '&',        '06',       '&'      ],
  [ 7,   '\u0027',   '\u0027',   '07',       '\u0027' ], // single quote "'"
  [ 8,   '(',        '(',        '08',       '('      ],
  [ 9,   ')',        ')',        '09',       ')'      ],
  [ 10,  '*',        '*',        '10',       '*'      ],
  [ 11,  '+',        '+',        '11',       '+'      ],
  [ 12,  ',',        ',',        '12',       ','      ],
  [ 13,  '-',        '-',        '13',       '-'      ],
  [ 14,  '.',        '.',        '14',       '.'      ],
  [ 15,  '/',        '/',        '15',       '/'      ],
  [ 16,  '0',        '0',        '16',       '0'      ],
  [ 17,  '1',        '1',        '17',       '1'      ],
  [ 18,  '2',        '2',        '18',       '2'      ],
  [ 19,  '3',        '3',        '19',       '3'      ],
  [ 20,  '4',        '4',        '20',       '4'      ],
  [ 21,  '5',        '5',        '21',       '5'      ],
  [ 22,  '6',        '6',        '22',       '6'      ],
  [ 23,  '7',        '7',        '23',       '7'      ],
  [ 24,  '8',        '8',        '24',       '8'      ],
  [ 25,  '9',        '9',        '25',       '9'      ],
  [ 26,  ':',        ':',        '26',       ':'      ],
  [ 27,  ';',        ';',        '27',       ';'      ],
  [ 28,  '<',        '<',        '28',       '<'      ],
  [ 29,  '=',        '=',        '29',       '='      ],
  [ 30,  '>',        '>',        '30',       '>'      ],
  [ 31,  '?',        '?',        '31',       '?'      ],
  [ 32,  '@',        '@',        '32',       '@'      ],
  [ 33,  'A',        'A',        '33',       'A'      ],
  [ 34,  'B',        'B',        '34',       'B'      ],
  [ 35,  'C',        'C',        '35',       'C'      ],
  [ 36,  'D',        'D',        '36',       'D'      ],
  [ 37,  'E',        'E',        '37',       'E'      ],
  [ 38,  'F',        'F',        '38',       'F'      ],
  [ 39,  'G',        'G',        '39',       'G'      ],
  [ 40,  'H',        'H',        '40',       'H'      ],
  [ 41,  'I',        'I',        '41',       'I'      ],
  [ 42,  'J',        'J',        '42',       'J'      ],
  [ 43,  'K',        'K',        '43',       'K'      ],
  [ 44,  'L',        'L',        '44',       'L'      ],
  [ 45,  'M',        'M',        '45',       'M'      ],
  [ 46,  'N',        'N',        '46',       'N'      ],
  [ 47,  'O',        'O',        '47',       'O'      ],
  [ 48,  'P',        'P',        '48',       'P'      ],
  [ 49,  'Q',        'Q',        '49',       'Q'      ],
  [ 50,  'R',        'R',        '50',       'R'      ],
  [ 51,  'S',        'S',        '51',       'S'      ],
  [ 52,  'T',        'T',        '52',       'T'      ],
  [ 53,  'U',        'U',        '53',       'U'      ],
  [ 54,  'V',        'V',        '54',       'V'      ],
  [ 55,  'W',        'W',        '55',       'W'      ],
  [ 56,  'X',        'X',        '56',       'X'      ],
  [ 57,  'Y',        'Y',        '57',       'Y'      ],
  [ 58,  'Z',        'Z',        '58',       'Z'      ],
  [ 59,  '[',        '[',        '59',       '['      ],
  [ 60,  '\u005c',   '\u005c',   '60',       '\u005c' ], // backslash "\"
  [ 61,  ']',        ']',        '61',       ']'      ],
  [ 62,  '^',        '^',        '62',       '^'      ],
  [ 63,  '_',        '_',        '63',       '_'      ],
  [ 64,  '\u0000',   '`',        '64',       '`'      ], // NUL
  [ 65,  '\u0001',   'a',        '65',       'a'      ], // SOH
  [ 66,  '\u0002',   'b',        '66',       'b'      ], // STX
  [ 67,  '\u0003',   'c',        '67',       'c'      ], // ETX
  [ 68,  '\u0004',   'd',        '68',       'd'      ], // EOT
  [ 69,  '\u0005',   'e',        '69',       'e'      ], // ENQ
  [ 70,  '\u0006',   'f',        '70',       'f'      ], // ACK
  [ 71,  '\u0007',   'g',        '71',       'g'      ], // BEL
  [ 72,  '\u0008',   'h',        '72',       'h'      ], // BS
  [ 73,  '\u0009',   'i',        '73',       'i'      ], // HT
  [ 74,  '\u000a',   'j',        '74',       'j'      ], // LF
  [ 75,  '\u000b',   'k',        '75',       'k'      ], // VT
  [ 76,  '\u000c',   'l',        '76',       'l'      ], // FF
  [ 77,  '\u000d',   'm',        '77',       'm'      ], // CR
  [ 78,  '\u000e',   'n',        '78',       'n'      ], // SO
  [ 79,  '\u000f',   'o',        '79',       'o'      ], // SI
  [ 80,  '\u0010',   'p',        '80',       'p'      ], // DLE
  [ 81,  '\u0011',   'q',        '81',       'q'      ], // DC1
  [ 82,  '\u0012',   'r',        '82',       'r'      ], // DC2
  [ 83,  '\u0013',   's',        '83',       's'      ], // DC3
  [ 84,  '\u0014',   't',        '84',       't'      ], // DC4
  [ 85,  '\u0015',   'u',        '85',       'u'      ], // NAK
  [ 86,  '\u0016',   'v',        '86',       'v'      ], // SYN
  [ 87,  '\u0017',   'w',        '87',       'w'      ], // ETB
  [ 88,  '\u0018',   'x',        '88',       'x'      ], // CAN
  [ 89,  '\u0019',   'y',        '89',       'y'      ], // EM
  [ 90,  '\u001a',   'z',        '90',       'z'      ], // SUB
  [ 91,  '\u001b',   '{',        '91',       '{'      ], // ESC
  [ 92,  '\u001c',   '|',        '92',       '|'      ], // FS
  [ 93,  '\u001d',   '}',        '93',       '}'      ], // GS
  [ 94,  '\u001e',   '~',        '94',       '~'      ], // RS
  [ 95,  '\u001f',   '\u007f',   '95',       '\u00c3' ], // US // DEL // Ã
  [ 96,  FNC3,        FNC3,      '96',       '\u00c4' ], // FNC 3     // Ä
  [ 97,  FNC2,        FNC2,      '97',       '\u00c5' ], // FNC 2     // Å
  [ 98,  /* SH B */, /* SH A */, '98',       '\u00c6' ],              // Æ
  [ 99,  /* CD C */, /* CD C */, '99',       '\u00c7' ],              // Ç
  [ 100, /* CD B */, FNC4,       /* CD B */, '\u00c8' ], // FNC 4     // È
  [ 101, FNC4,       /* CD A */, /* CD A */, '\u00c9' ], // FNC 4     // É
  [ 102, FNC1,       FNC1,       FNC1,       '\u00ca' ], // FNC 1     // Ê
  [ 103, /* ST A */, /* ST A */, /* ST A */, '\u00cb' ],              // Ë
  [ 104, /* ST B */, /* ST B */, /* ST B */, '\u00cc' ],              // Ì
  [ 105, /* ST C */, /* ST C */, /* ST C */, '\u00cd' ],              // Í
] as const

/** Sequences encodable with code-set `A` and related values */
export const CODESET_A = DATA.reduce((data, [ val, csa, _csb, _csc, _chr ]) => {
  if (csa !== undefined) data[csa] = val
  return data
}, {} as Record<string, Code>)

/** Sequences encodable with code-set `B` and related values */
export const CODESET_B = DATA.reduce((data, [ val, _csa, csb, _csc, _chr ]) => {
  if (csb !== undefined) data[csb] = val
  return data
}, {} as Record<string, Code>)

/** Sequences encodable with code-set `C` and related values */
export const CODESET_C = DATA.reduce((data, [ val, _csa, _csb, csc, _chr ]) => {
  if (csc !== undefined) data[csc] = val
  return data
}, {} as Record<string, Code>)

/** Encodable characters with the various code-sets */
export const CODESETS = {
  A: CODESET_A,
  B: CODESET_B,
  C: CODESET_C,
} as const

/** Array of all characters present in our Code128 font */
export const CHARACTERS: Record<Code, string> & Array<string> = [] as any
DATA.forEach(([ val, _csa, _csb, _csc, chr ]) => CHARACTERS[val] = chr)

/** Shift to code-set `B` (one character) while in code-set `A`, or vice-versa */
export const SHIFT = 98

/** Switch to code-set `C` (following characters) while in code-set `A` or `B` */
export const CODE_C = 99
/** Switch to code-set `B` (following characters) while in code-set `A` or `C` */
export const CODE_B = 100
/** Switch to code-set `A` (following characters) while in code-set `B` or `C` */
export const CODE_A = 101

/** Start with code-set `A` */
export const START_A = 103
/** Start with code-set `B` */
export const START_B = 104
/** Start with code-set `C` */
export const START_C = 105

/** The stop character */
export const STOP = '\u00ce' // Î

/* ========================================================================== *
 * ENCODER CLASS                                                              *
 * ========================================================================== */

/** Match the beginning of the string with a sequence */
function match(string: string, codeset: CodeSet): [ Code | null, string ] {
  for (const [ sequence, value ] of Object.entries(CODESETS[codeset])) {
    if (string.startsWith(sequence)) return [ value, string.substring(sequence.length) ]
  }
  return [ null, string ]
}

/** Represent the first character of a string as a nice \uXXXX */
function unicode(string: string): string {
  const hex = string.charCodeAt(0).toString(16).padStart(4, '0')
  return `\\u${hex}`
}

/** Our encoder class */
export class Encoder {
  /** The _current_ code-set of this encoder */
  private _codeset: CodeSet
  /** The array of values encoded so far */
  private _values: Code[]
  /** The remainder of the string to encode */
  private _string: string
  /** An array of encoders to add forks of this encoder to */
  private _encoders: Encoder[]

  constructor(codeset: CodeSet, string: string, encoders: Encoder[], values?: Code[]) {
    this._codeset = codeset
    this._string = string
    this._encoders = encoders

    if (values) {
      this._values = values
    } else {
      switch (codeset) {
        case 'A': this._values = [ START_A ]; break
        case 'B': this._values = [ START_B ]; break
        case 'C': this._values = [ START_C ]; break
      }
    }

    this._encoders.push(this)
  }

  /** Whether this encoder is done or not */
  public get done(): boolean {
    return this._string.length === 0
  }

  /**
   * Do the next round of encoding, returning `true` if _this_ instance has
   * finished encoding.
   */
  public encode(length: number): boolean {
    // When we get to the empty string, we're done!
    if (this._string.length == 0) return true
    // When we have already encoded this character, pass!
    if (this._values.length >= length) return false

    // Match in the _current_ code set, if we have a value, just add it
    const [ value, remaining ] = match(this._string, this._codeset)
    if (value !== null) {
      this._values.push(value)
      this._string = remaining

      // Optimization: in code-set "A" or "B" we _might_ find a double-digit
      // sequence (or FNC1) which may be advantageous to encode in "C"
      if ((this._codeset === 'A') || (this._codeset === 'B')) {
        const [ valuec, remainingc ] = match(this._string, 'C')
        if (valuec !== null) {
          // "Fork" with the switched "C" code-set
          new Encoder('C', remainingc, this._encoders, [ ...this._values, CODE_C, valuec ])
        }
      }

      //
      return this.done
    }

    // In code-set "A" we want to try shifting to "B" or switching to "B" or "C"
    if (this._codeset === 'A') {
      // We already handled a switch to "C" above
      const [ valueb, remainingb ] = match(this._string, 'B')
      if (valueb !== null) {
        // "Fork" with the switched "B" code-set
        new Encoder('B', remainingb, this._encoders, [ ...this._values, CODE_B, valueb ])
        // This instance contains with only a shift to "B"
        this._values.push(SHIFT, valueb)
        this._string = remainingb
        return this.done

      // Couldn't encode in "B"? Then this is not encodable...
      } else {
        throw new Error(`Unable to encode character "${unicode(remaining)}"`)
      }

    // In code-set "B" we want to try shifting to "A" or switching to "A" or "C"
    } else if (this._codeset === 'B') {
      // We already handled a switch to "C" above
      const [ valuea, remaininga ] = match(this._string, 'A')
      if (valuea !== null) {
        // "Fork" with the switched "A" code-set
        new Encoder('A', remaininga, this._encoders, [ ...this._values, CODE_A, valuea ])
        // This instance contains with only a shift to "A"
        this._values.push(SHIFT, valuea)
        this._string = remaininga
        return this.done

      // Couldn't encode in "A"? Then this is not encodable...
      } else {
        throw new Error(`Unable to encode character "${unicode(remaining)}"`)
      }

    // Only other option is for us to be in code-set "C" and we can only switch
    } else {
      const [ valuea, remaininga ] = match(this._string, 'A')
      const [ valueb, remainingb ] = match(this._string, 'B')

      // If both code sets match, fork on "A" and continue on "B"
      if ((valuea !== null) && (valueb !== null)) {
        new Encoder('A', remaininga, this._encoders, [ ...this._values, CODE_A, valuea ])
        this._values.push(CODE_B, valueb)
        this._string = remainingb
        this._codeset = 'B'
        return this.done

      // If we match only on "A" we continue this after switching
      } else if ((valuea !== null) && (valueb === null)) {
        this._values.push(CODE_A, valuea)
        this._string = remaininga
        this._codeset = 'A'
        return this.done

      // If we match only on "B" we continue this after switching
      } else if ((valuea === null) && (valueb !== null)) {
        this._values.push(CODE_B, valueb)
        this._string = remainingb
        this._codeset = 'B'
        return this.done

      // If no code-sets match, we failed...
      } else {
        throw new Error(`Unable to encode character "${unicode(remaining)}"`)
      }
    }
  }

  /** Finish the encoding, and return the string for our barcode */
  public finish(): string {
    // The checksum, as the weighted sum of all values modulo 103
    let sum = 0
    for (let i = 0; i < this._values.length; i ++) {
      sum += this._values[i]! * (i || 1)
    }

    // Encode all our values, convert into characters, and add a "stop"
    return [ ...this._values, (sum % 103) as Code ]
        .map((value) => CHARACTERS[value])
        .join('') + STOP
  }
}

/* ========================================================================== *
 * ENCODE                                                                     *
 * ========================================================================== */

export function code128(string: string): string {
  // All our encoders, they'll "procreate" while encoding
  const encoders: Encoder[] = []

  // Initial encoders, starting at each code-set (we start with "C" as it
  // has the biggest chance of encoding as much data in a shorter barcode)
  new Encoder('C', string, encoders)
  new Encoder('B', string, encoders)
  new Encoder('A', string, encoders)

  // Repeat ad nauseam
  for (let length = 1; ; length ++) {
    // Process all encoders, and go up to the specified barcode length
    for (const encoder of encoders) encoder.encode(length)

    // After encoding ad this length, we check if any of our encoders is done
    for (const encoder of encoders) {
      if (encoder.done) return encoder.finish()
    }
  }
}
