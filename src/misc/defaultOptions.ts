import { ScannerOptions } from '../types'
import { defaultConstraints } from './defaultConstraints'

export const defaultOptions: ScannerOptions = {
  deviceId: undefined,
  hints: undefined,
  constraints: defaultConstraints,
  delayBetweenScanAttempts: 500,
  delayBetweenScanSuccess: 500,
  tryPlayVideoTimeout: 10000
}
