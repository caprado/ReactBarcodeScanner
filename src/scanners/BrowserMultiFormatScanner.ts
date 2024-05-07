import { MultiFormatReader } from '@zxing/library'
import { defaultOptions } from '../misc'
import { BrowserScannerOptions } from '../types'
import { BrowserScanner } from './BrowserScanner'

export class BrowserMultiFormatScanner extends BrowserScanner {
  protected readonly reader: MultiFormatReader

  public constructor(options?: BrowserScannerOptions) {
    const reader = new MultiFormatReader()

    reader.setHints(options?.hints)

    super(reader, { ...defaultOptions, ...options })

    this.reader = reader
  }
}
