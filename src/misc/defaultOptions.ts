import { BrowserScannerOptions } from '../types'
import { defaultConstraints } from './defaultConstraints'

export const defaultOptions: BrowserScannerOptions = {
  deviceId: undefined,
  hints: undefined,
  constraints: defaultConstraints,
  delayBetweenScanAttempts: 500,
  delayBetweenScanSuccess: 500,
  tryPlayVideoTimeout: 10000
}
