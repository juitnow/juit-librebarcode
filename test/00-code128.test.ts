import { CHARACTERS, CODE_A, CODE_B, CODE_C, SHIFT, START_A, START_B, START_C, STOP, Encoder, code128, FNC1, FNC2, FNC4, FNC3 } from '../src/code128'

import type { CodeSet } from '../src/code128'

const REVERSE: Record<string, number> = {}
CHARACTERS.forEach((char, val) => REVERSE[char] = val)

function decode(string: string): number [] {
  expect(string.endsWith(STOP), 'String does not end with STOP').toBeTrue()

  const values: number[] = []
  for (const char of string.slice(0, -1)) values.push(REVERSE[char]!)
  return values
}

function permute(codeset: CodeSet, string: string): number[][] {
  const encoders: Encoder[] = []
  new Encoder(codeset, string, encoders)

  for (let length = 1; ; length ++) {
    for (const encoder of encoders) encoder.encode(length)

    let done = true
    for (const encoder of encoders) done = done && encoder.done

    if (done) break
  }

  return encoders.map((encoder) => decode(encoder.finish()))
}

describe('Code128 Encoding', () => {
  it('pass some basic tests', () => {
    // code "C" has the highest preference
    expect(decode(code128(''))).toEqual([ START_C, 2 ])
    // from wikipedia, https://en.wikipedia.org/wiki/Code_128
    expect(decode(code128('PJJ123C'))).toEqual([ START_A, 48, 42, 42, 17, 18, 19, 35, 54 ])

    // encoded with LibreBarcode's own
    expect(code128('G0P=m8_1qvdmMwl7h-Hw')).toEqual('ÌG0P=m8_1qvdmMwl7h-Hw4Î')
    expect(code128('BFTwg+N%mHk!7Wcd$lkD')).toEqual('ÌBFTwg+N%mHk!7Wcd$lkDpÎ')
    expect(code128('omy=hULklBa^zWu!Awfd')).toEqual('Ìomy=hULklBa^zWu!AwfdaÎ')
    expect(code128('4BPAO9BxTCI_eAH#vVnv')).toEqual('Ì4BPAO9BxTCI_eAH#vVnv>Î')
    expect(code128('qznX=qHXM-@9$he*Y=e_')).toEqual('ÌqznX=qHXM-@9$he*Y=e_$Î')

    expect(code128('81936910422665342067')).toEqual('Íq}e*J:aB4czÎ')
    expect(code128('87258392787703260635')).toEqual('Íw9s|nm#:&CnÎ')
    expect(code128('08030277510301132120')).toEqual('Í(#"mS#!-54iÎ')
    expect(code128('84904240709448897124')).toEqual('ÍtzJHf~Pyg8ÅÎ')
    expect(code128('09899528779111233812')).toEqual('Í)yÃ<m{+7F,mÎ')

    expect(code128('GXLJJWFXHFHIUSV')).toEqual('ËGXLJJWFXHFHIUSV<Î')
    expect(code128('KCSXEWSRCHRVJQL')).toEqual('ËKCSXEWSRCHRVJQL%Î')
    expect(code128('BRTMZKTNGZASNAF')).toEqual('ËBRTMZKTNGZASNAFAÎ')
    expect(code128('OTBIARSJKIWFWXQ')).toEqual('ËOTBIARSJKIWFWXQ"Î')
    expect(code128('REXOIFKJFTEUERC')).toEqual('ËREXOIFKJFTEUERC+Î')
  })

  it('should not switch in code set "A"', () => {
    expect(permute('A', 'ABC\u0000\u0001\u0002')).toMatchContents([
      [ START_A, 33, 34, 35, 64, 65, 66, 50 ],
    ])
  })

  it('should not switch in code set "B"', () => {
    expect(permute('B', 'ABCabc')).toMatchContents([
      [ START_B, 33, 34, 35, 65, 66, 67, 66 ],
    ])
  })

  it('should not switch in code set "C"', () => {
    expect(permute('C', '00336699')).toMatchContents([
      [ START_C, 0, 33, 66, 99, 44 ],
    ])
  })

  it('should switch and shift from code set "A"', () => {
    expect(permute('A', 'ABCaBC')).toMatchContents([
      [ START_A, 33, 34, 35, SHIFT, 65, 34, 35, 33 ], // SHIFT
      [ START_A, 33, 34, 35, CODE_B, 65, 34, 35, 41 ], // SWITCH
    ])
  })

  it('should switch to "C" from code set "A" if double digits are detected', () => {
    expect(permute('A', 'ABC77')).toMatchContents([
      [ START_A, 33, 34, 35, 23, 23, 1 ], // NO SWITCH
      [ START_A, 33, 34, 35, CODE_C, 77, 60 ], // SWITCH
    ])
  })

  it('should switch and shift from code set "B"', () => {
    expect(permute('B', 'ABC\u0000BC')).toMatchContents([
      [ START_B, 33, 34, 35, SHIFT, 64, 34, 35, 29 ], // SHIFT
      [ START_B, 33, 34, 35, CODE_A, 64, 34, 35, 41 ], // SWITCH
    ])
  })

  it('should switch to "C" from code set "B" if double digits are detected', () => {
    expect(permute('B', 'abc77')).toMatchContents([
      [ START_B, 65, 66, 67, 23, 23, 91 ], // NO SWITCH
      [ START_B, 65, 66, 67, CODE_C, 77, 47 ], // SWITCH
    ])
  })

  it('should switch to "A" from code set "C"', () => {
    expect(permute('C', '00336699\u00000')).toMatchContents([
      [ START_C, 0, 33, 66, 99, CODE_A, 64, 16, 15 ], // SWITCH TO "A"
    ])
  })

  it('should switch to "B" from code set "C"', () => {
    expect(permute('C', '00336699a0')).toMatchContents([
      [ START_C, 0, 33, 66, 99, CODE_B, 65, 16, 16 ], // SWITCH TO "A"
    ])
  })

  it('should switch to "A" and "B" from code set "C"', () => {
    expect(permute('C', '00336699A0')).toMatchContents([
      [ START_C, 0, 33, 66, 99, CODE_A, 33, 16, 35 ], // SWITCH TO "A"
      [ START_C, 0, 33, 66, 99, CODE_B, 33, 16, 30 ], // SWITCH TO "B"
    ])
  })

  it('should produce the shortest barcode starting from "A"', () => {
    expect(permute('A', '\u0000003366')).toMatchContents([
      [ START_A, 64, CODE_C, 0, 33, 66, 3 ],
      [ START_A, 64, 16, CODE_C, 3, 36, CODE_A, 22, 6 ],
      [ START_A, 64, 16, CODE_C, 3, 36, CODE_B, 22, 0 ],
      [ START_A, 64, 16, 16, CODE_C, 33, 66, 71 ],
      [ START_A, 64, 16, 16, 19, CODE_C, 36, CODE_A, 22, 63 ],
      [ START_A, 64, 16, 16, 19, CODE_C, 36, CODE_B, 22, 56 ],
      [ START_A, 64, 16, 16, 19, 19, CODE_C, 66, 32 ],
      [ START_A, 64, 16, 16, 19, 19, 22, 22, 86 ],
    ])
    expect(decode(code128('\u0000003366'))).toEqual([ START_A, 64, CODE_C, 0, 33, 66, 3 ])
  })

  it('should produce the shortest barcode starting from "B"', () => {
    expect(permute('B', 'a003366')).toMatchContents([
      [ START_B, 65, CODE_C, 0, 33, 66, 5 ],
      [ START_B, 65, 16, CODE_C, 3, 36, 101, 22, 8 ],
      [ START_B, 65, 16, CODE_C, 3, 36, CODE_B, 22, 2 ],
      [ START_B, 65, 16, 16, CODE_C, 33, 66, 73 ],
      [ START_B, 65, 16, 16, 19, CODE_C, 36, 101, 22, 65 ],
      [ START_B, 65, 16, 16, 19, CODE_C, 36, CODE_B, 22, 58 ],
      [ START_B, 65, 16, 16, 19, 19, CODE_C, 66, 34 ],
      [ START_B, 65, 16, 16, 19, 19, 22, 22, 88 ],
    ])
    expect(decode(code128('a003366'))).toEqual([ START_B, 65, CODE_C, 0, 33, 66, 5 ])
  })

  it('should fail when characters can not be encoded', () => {
    expect(() => code128('\u0000\u00a0')).toThrowError('Unable to encode character "\\u00a0"') // "A"
    expect(() => code128('a\u00a0')).toThrowError('Unable to encode character "\\u00a0"') // "B"
    expect(() => code128('00\u00a0')).toThrowError('Unable to encode character "\\u00a0"') // "C"
  })

  describe('Encoding with a specific code-set', () => {
    it('should encode a string in the "A" code set', () => {
      expect(decode(code128('ABCDEF', 'A')))
          .toEqual([ START_A, 33, 34, 35, 36, 37, 38, 42 ])
      expect(decode(code128('\u0000\u0001' + FNC1 + FNC2 + FNC3 + FNC4, 'A')))
          .toEqual([ START_A, 64, 65, 102, 97, 96, 101, 17 ])
    })

    it('should encode a string in the "B" code set', () => {
      expect(decode(code128('ABCDEF', 'B')))
          .toEqual([ START_B, 33, 34, 35, 36, 37, 38, 43 ])
      expect(decode(code128('ab' + FNC1 + FNC2 + FNC3 + FNC4, 'B')))
          .toEqual([ START_B, 65, 66, 102, 97, 96, 100, 15 ])
    })

    it('should encode a string in the "C" code set', () => {
      expect(decode(code128('00336699', 'C')))
          .toEqual([ START_C, 0, 33, 66, 99, 44 ])
      expect(decode(code128('0033' + FNC1 + '6699', 'C')))
          .toEqual([ START_C, 0, 33, 102, 66, 99, 0 ])
    })

    it('should fail when a character is not present in a specific code set', () => {
      expect(() => code128('a', 'A'))
          .toThrowError('Unable to encode character "\\u0061" in code set "A"')
      expect(() => code128('\u0000', 'B'))
          .toThrowError('Unable to encode character "\\u0000" in code set "B"')
      expect(() => code128('0', 'C')) // a single digit is not valid in "C"
          .toThrowError('Unable to encode character "\\u0030" in code set "C"')
    })
  })
})
