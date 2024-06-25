import { ean } from '../src/ean'

describe('EAN / UPC', () => {
  it('should encode some EAN-13 codes', () => {
    expect(ean('0028016057960')).toEqual('0ACIABG*afhjga+')
    expect(ean('1499404259113')).toEqual('1EJTEKO*cfjbbd+')
    expect(ean('2708040894181')).toEqual('2HASKEK*ijebib+')
    expect(ean('3448741190450')).toEqual('3EESROB*bjaefa+')
    expect(ean('4109675709264')).toEqual('4BKJGRP*hajcge+')
    expect(ean('5369849825693')).toEqual('5DQTIET*icfgjd+')
    expect(ean('6794731873287')).toEqual('6HTORDB*ihdcih+')
    expect(ean('7215615419071')).toEqual('7CLFQBP*ebjahb+')
    expect(ean('8685545231192')).toEqual('8GSFPOF*cdbbjc+')
    expect(ean('9450039838974')).toEqual('9EPKANJ*idijhe+')
  })

  it('should encode some UPC/A codes', () => {
    expect(ean('004633359596')).toEqual('0AAEGDD*dfjfjg+')
    expect(ean('196899657921')).toEqual('0BJGIJJ*gfhjcb+')
    expect(ean('247837897113')).toEqual('0CEHIDH*ijhbbd+')
    expect(ean('306103917564')).toEqual('0DAGBAD*jbhfge+')
    expect(ean('429343961342')).toEqual('0ECJDED*jgbdec+')
    expect(ean('598376752153')).toEqual('0FJIDHG*hfcbfd+')
    expect(ean('662292927833')).toEqual('0GGCCJC*jchidd+')
    expect(ean('734484035905')).toEqual('0HDEEIE*adfjaf+')
    expect(ean('818819590408')).toEqual('0IBIIBJ*fjaeai+')
    expect(ean('988472303103')).toEqual('0JIIEHC*dadbad+')
  })

  it('should encode some EAN-8 codes', () => {
    expect(ean('03732965')).toEqual(':ADHD*cjgf+')
    expect(ean('10681001')).toEqual(':BAGI*baab+')
    expect(ean('24635053')).toEqual(':CEGD*fafd+')
    expect(ean('31506236')).toEqual(':DBFA*gcdg+')
    expect(ean('46345035')).toEqual(':EGDE*fadf+')
    expect(ean('59080494')).toEqual(':FJAI*aeje+')
    expect(ean('67201614')).toEqual(':GHCA*bgbe+')
    expect(ean('73933670')).toEqual(':HDJD*dgha+')
    expect(ean('80587712')).toEqual(':IAFI*hhbc+')
    expect(ean('90989937')).toEqual(':JAJI*jjdh+')
  })

  it('should encode some 5-digits additions', () => {
    expect(ean('10955')).toEqual('[L\\K\\J\\F\\F') // checksum 0
    expect(ean('75777')).toEqual('[R\\F\\R\\H\\H') // checksum 1
    expect(ean('08482')).toEqual('[K\\I\\E\\S\\C') // checksum 2
    expect(ean('05433')).toEqual('[K\\F\\E\\D\\N') // checksum 3
    expect(ean('17068')).toEqual('[B\\R\\K\\G\\I') // checksum 4
    expect(ean('63956')).toEqual('[G\\D\\T\\P\\G') // checksum 5
    expect(ean('72825')).toEqual('[H\\C\\I\\M\\P') // checksum 6
    expect(ean('95838')).toEqual('[J\\P\\I\\N\\I') // checksum 7
    expect(ean('73208')).toEqual('[H\\N\\C\\A\\S') // checksum 8
    expect(ean('64227')).toEqual('[G\\E\\M\\C\\R') // checksum 9
  })

  it('should encode some 2-digits additions', () => {
    expect(ean('08')).toEqual('[A\\I') // checksum 0
    expect(ean('77')).toEqual('[H\\R') // checksum 1
    expect(ean('42')).toEqual('[O\\C') // checksum 2
    expect(ean('15')).toEqual('[L\\P') // checksum 3
  })

  it('should encode some EAN-13 with 5-digits additions', () => {
    expect(ean('598781923593640049')).toEqual('5JSRIBT*cdfjdg+[E\\A\\K\\O\\J')
    expect(ean('470582332124660172')).toEqual('4HKFIMN*dcbceg+[Q\\K\\B\\H\\C')
    expect(ean('290366798701058932')).toEqual('2JANQGR*jihaba+[F\\S\\J\\N\\C')
    expect(ean('083441501918148911')).toEqual('0IDEEBF*abjbib+[O\\I\\J\\B\\L')
    expect(ean('401606398480386623')).toEqual('4ALGAQN*jieiad+[S\\G\\G\\C\\N')
  })

  it('should encode some UPC/A with 5-digits additions', () => {
    expect(ean('12476062059143684')).toEqual('0BCEHGA*gcafjb+[O\\D\\Q\\I\\E')
    expect(ean('22882983516481704')).toEqual('0CCIICJ*idfbge+[I\\B\\H\\K\\O')
    expect(ean('77427025808969807')).toEqual('0HHECHA*cfiaij+[G\\T\\S\\A\\H')
    expect(ean('42045935603467698')).toEqual('0ECAEFJ*dfgade+[G\\R\\Q\\J\\I')
    expect(ean('23419542107565715')).toEqual('0CDEBJF*ecbahf+[G\\P\\H\\B\\P')
  })

  it('should encode some EAN-13 with 2-digits additions', () => {
    expect(ean('449602263365357')).toEqual('4ETGAMM*gddgfd+[F\\R')
    expect(ean('056344080751980')).toEqual('0FGDEEA*iahfbj+[I\\A')
    expect(ean('194200441056070')).toEqual('1JEMAKO*ebafga+[R\\A')
    expect(ean('954124688450917')).toEqual('9FOLCOG*iiefaj+[B\\R')
    expect(ean('090978080681770')).toEqual('0JAJHIA*iagibh+[R\\A')
  })

  it('should encode some UPC/A with 2-digits additions', () => {
    expect(ean('66502293308179')).toEqual('0GGFACC*jddaib+[R\\T')
    expect(ean('01826212881491')).toEqual('0ABICGC*bciibe+[T\\L')
    expect(ean('90180355125728')).toEqual('0JABIAD*ffbcfh+[C\\I')
    expect(ean('44981267352433')).toEqual('0EEJIBC*ghdfce+[D\\N')
    expect(ean('53347509321138')).toEqual('0FDDEHF*ajdcbb+[N\\I')
  })

  it('should fail when a string can not be encoded', () => {
    expect(() => ean('123456A789012'))
        .toThrowError('Invalid character to encode "A"')
    expect(() => ean('00000000000000000000'))
        .toThrowError('Unable to encode string 20 characters long')
  })
})
