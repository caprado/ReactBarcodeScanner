import { DecodeHintType } from '@zxing/library'

/**
 * Configuration options for the browser scanner.
 */
type ScannerOptions = {
  /** The device ID of the camera to use, if specified. */
  deviceId?: string
  /** Decoder hints to optimize barcode decoding process. */
  hints?: Map<DecodeHintType, string>
  /** Media track constraints to apply to the video feed. */
  constraints?: MediaTrackConstraints
  /** Delay in milliseconds between successful scan detections. */
  delayBetweenScanSuccess?: number
  /** Delay in milliseconds between consecutive scan attempts. */
  delayBetweenScanAttempts?: number
  /** Timeout in milliseconds to attempt playing the video feed. */
  tryPlayVideoTimeout?: number
}

export default ScannerOptions
