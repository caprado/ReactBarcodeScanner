import { Result } from '@zxing/library'
import { ScannerOptions } from '.'

/**
 * Properties for the Finder component.
 */
export type FinderProps = {
  /** Indicates whether the scanner is active. */
  enabled: boolean
  /** Indicates whether the scanner is currently loading. */
  loading: boolean
  /** The video element used for scanning. */
  video: HTMLVideoElement | null
  /** The border thickness for the scanning area visual. Defaults to 35 if not provided. */
  border?: number
  /** The most recent scanning result. */
  result?: Result
  /** Configuration options for scanner behavior. */
  options: ScannerOptions
  /** Whether to display the count of recognized items. */
  count?: boolean
  /** Whether to provide UI controls for toggling the scanner. */
  onOff?: boolean
  /** Whether to display a tracking visual for scanning. */
  tracker?: boolean
  /** Function to initiate scanning. */
  startScanning: (deviceId?: string | undefined) => void
  /** Function to stop scanning. */
  stopScanning: () => void
  /** Function to toggle the device's torch. */
  switchTorch?: (value: boolean) => void
  /** Optional function to retrieve the current media track settings. */
  getSettings?: () => MediaTrackSettings | undefined
}
