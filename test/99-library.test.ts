import * as lib from '../src/index'

describe('Library', () => {
  it('should export the Code128 FCN codes', () => {
    expect(lib.FNC1).toEqual('\uf001')
    expect(lib.FNC2).toEqual('\uf002')
    expect(lib.FNC3).toEqual('\uf003')
    expect(lib.FNC4).toEqual('\uf004')
  })

  it('should encode a string for the Code128 font', () => {
    expect(lib.code128('PJJ123C')).toEqual('ÌPJJ123CWÎ')
  })

  it('should encode a string for the EAN font', () => {
    expect(lib.ean('9780201379624')).toEqual('9HSKCKB*dhjgce+')
  })

  it('should calculate the correct checksum for an EAN-13', () => {
    expect(lib.checksum('541136108357')).toEqual(4)
  })
})
