LibreBarcode Fonts and Encoders
===============================

This project provides two encoders for the **Code128** and **EAN** fonts
developed by the [LibreBarcode](https://github.com/graphicore/librebarcode)
project.

* [Code128](#code128)
* [EAN-13, UPC/A and EAN-8](#ean-13-upca-ean-8)
* [EAN/GS-1 Checksums](#eangs-1-checksums)
* [Font Assets](#font-assets)
* [License (encoders)](LICENSE-ASL.md)
* [License (fonts)](LICENSE-OFL.md)

Code128
-------

The `code128()` encoder takes a string (the barcode to be encoded) and returns
a string that can be fed to the **Code128** font to correctly display the
barcode.

It attempts to calculate the shortest possible barcode given the input, and
supports encoding of _all_ 128 characters in the US-ASCII range, plus support
for the Code128 specific `FNC1`, `FNC2`, `FNC3` and `FNC4` characters.

Control characters can be entered directly in the string to encode using their
JavaScript equivalent (e.g. `\n` for newline, `\x1D` for the group separator)
and the four _speial_ characters `\uf001`, `\uf002`, `\uf003`, `\uf004`, can
be used to encode `FNC1`, `FNC2`, `FNC3` and `FNC4` respectively.

Those are also exported by the library as `FNC1`, `FNC2`, `FNC3` and `FNC4`.

```typescript
import { FNC1, code128 } from '@juit/librebarcode'

const gs1 =
  FNC1 + // FNC1 indicates this is a standard "GS1" barcode
  '02' + // application identifier "02": Identification of trade items
  '05411361083574' + // Ardo Spring Onions, 250g
  '15' + // application identifier "15": Best before date (YYMMDD)
  '250929' + // Expires 29.09.2025
  '37' + // application identifier "37": Count of trade items
  '144' // Contains 144 packages

const encoded = code128(gs1)
// now you can feed the "encoded" string to the font!
```

#### Encoding with a specific code set

In certain cases, where a _specific_ code set of **Code128** is required for
a barcode (for example labeling products for the Amazon Marketplace, requiring
codeset "A"), there might be the need to forego the "shortest path" algorithm
provided by `code128()` and specify the code set directly.

In this case, an extra parameter to `code128()` can be added to the call:

```typescript
import { code128 } from '@juit/librebarcode'

const a = code128('ABCD', 'A') // this will be constrained to code set "A"
const b = code128('abcd', 'B') // this will be constrained to code set "B"
const b = code128('1234', 'C') // this will be constrained to code set "C"
```



EAN-13, UPC/A, EAN-8
--------------------

Similarly to **Code128**, but for EAN the `ean()` encoder takes a string of
digits and produces a a string that can be fed to the **EAN** font to correctly
display the barcode.

The string to encode should have one of the following lengths:

* 13 digits: standard EAN-13 barcode
* 12 digits: standard UPC/A barcode
* 8 digits: standard EAN-8 barcode

The encoder also supports the standard 2-digits and 5-digits supplemental
barcodes and the lengths will then become:

* 18 digits: standard EAN-13 barcode with 5-digits supplemental barcode
* 17 digits: standard UPC/A barcode with 5-digits supplemental barcode
* 15 digits: standard EAN-13 barcode with 2-digits supplemental barcode
* 12 digits: standard UPC/A barcode with 2-digits supplemental barcode
* 5 digits: **only** the 5-digits supplemental barcode
* 2 digits: **only** the 2-digits supplemental barcode

```typescript
import { ean } from '@juit/librebarcode'

const encoded = ean('5411361083574') // EAN-13 barcode for Ardo Spring Onions
// now you can feed the "encoded" string to the font!
```



EAN/GS-1 Checksums
-------------------

Unlike the _"compatible"_ EAN-13 encoder developed and provided by the
[LibreBarcode](https://github.com/graphicore/librebarcode) project, this
library doesn't try to calculate the EAN-13 checksum while encoding strings.

A separate function `checksum()` can be used to calculate the checksum for
an *arbitrary* sequence of digits according to the EAN/GS-1 calculation rules:

```typescript
import { checksum } from '@juit/librebarcode'

const check = checksum('541136108357')
// here checksum will be the number 4
```



Font Assets
-----------

Embedded with this library, you can find three fonts for your encoding needs:

* `./assets/LibreBarcode128-Regular.ttf`: the regular **Code128** font without
  any underlying text. Use this one for GS1 barcodes, as encoding of the `FNC1`
  character messes up the text, and anyhow the text should be represented as
  `(xx)yyyyyyyyyy(zz)wwwwwwww...` (application identifiers with parentheses).
* `./assets/LibreBarcode128Text-Regular.ttf`: the **Code128** font with
  underlying text. Use this one for standard Code128 barcodes.
* `./assets/LibreBarcodeEAN13Text-Regular.ttf`: the **EAN** font.

You can find their file locations in the `fonts` export:

```typescript
import { fonts } from '@juit/librebarcode'

// Here fonts will look somewhat similar to
// {
//   'LibreBarcode128-Regular.ttf': '... path on your disk .../LibreBarcode128-Regular.ttf',
//   'LibreBarcode128Text-Regular.ttf': '... path on your disk .../LibreBarcode128Text-Regular.ttf',
//   'LibreBarcodeEAN13Text-Regular.ttf': '... path on your disk .../LibreBarcodeEAN13Text-Regular.ttf'
// }
```
