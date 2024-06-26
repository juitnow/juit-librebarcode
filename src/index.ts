export { FNC1, FNC2, FNC3, FNC4, code128 } from './code128'
export { checksum, ean } from './ean'

export type { CodeSet } from './code128'

const here = new URL(__fileurl, 'file:///')

export const fonts = {
  'LibreBarcode128-Regular.ttf': new URL('../assets/LibreBarcode128-Regular.ttf', here).pathname,
  'LibreBarcode128Text-Regular.ttf': new URL('../assets/LibreBarcode128Text-Regular.ttf', here).pathname,
  'LibreBarcodeEAN13Text-Regular.ttf': new URL('../assets/LibreBarcodeEAN13Text-Regular.ttf', here).pathname,
}
