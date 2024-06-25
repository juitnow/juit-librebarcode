import { checksum } from '../src/ean'

describe('Checksums', () => {
  it('should calculate the checksum for some known values', () => {
    // from Justus' own tests
    expect(checksum('978080240943')).toEqual(0)
    expect(checksum('978189159524')).toEqual(0)
    expect(checksum('978089787625')).toEqual(4)
    expect(checksum('978030009189')).toEqual(2)
    expect(checksum('978588702145')).toEqual(4)
    // ardo spring onions, 250g
    expect(checksum('541136108357')).toEqual(4)
    // gs1 with variable quantity, 14-digits starting with "9"
    expect(checksum('9405074123533')).toEqual(8)
  })
})
