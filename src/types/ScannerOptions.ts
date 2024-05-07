import { DecodeHintType } from '@zxing/library'

type ScannerOptions = {
  deviceId?: string
  hints?: Map<DecodeHintType, string>
  constraints?: MediaTrackConstraints
  delayBetweenScanSuccess?: number
  delayBetweenScanAttempts?: number
  tryPlayVideoTimeout?: number
}

export default ScannerOptions
