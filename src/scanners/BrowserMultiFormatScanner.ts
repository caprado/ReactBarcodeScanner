import { MultiFormatReader } from '@zxing/library'
import { defaultOptions } from '../misc'
import { ScannerOptions } from '../types'
import { BrowserScanner } from './BrowserScanner'

/**
 * A scanner class that extends the functionality of BrowserScanner to specifically use
 * a MultiFormatReader which can handle multiple barcode formats simultaneously.
 * This class is designed to be used when you need to scan different types of barcodes
 * and require a single reader setup that can accommodate various formats.
 *
 * @extends BrowserScanner
 */
export class BrowserMultiFormatScanner extends BrowserScanner {
  /** The MultiFormatReader used by this scanner to decode barcodes. */
  protected readonly reader: MultiFormatReader

  /**
   * Creates an instance of the BrowserMultiFormatScanner.
   * This constructor initializes a MultiFormatReader, sets its hints based on provided options,
   * and passes it along with the options to the superclass constructor.
   *
   * @param {BrowserScannerOptions} [options] - Optional scanner options that may include hints for the MultiFormatReader.
   */
  public constructor(options?: ScannerOptions) {
    const reader = new MultiFormatReader()

    reader.setHints(options?.hints)

    super(reader, { ...defaultOptions, ...options })

    this.reader = reader
  }
}
