import { Result } from '@zxing/library'
import FinderProps from './FinderProps'
import ScannerComponents from './ScannerComponents'
import ScannerStyles from './ScannerStyles'
import { BrowserScannerOptions } from '.'

/**
 * Props for the Scanner component.
 */
type ScannerProps = {
  /** Whether the scanner is enabled and actively scanning. Defaults to true. */
  enabled?: boolean
  /** Custom styles applied to the scanner's container, video feed, and other UI elements. */
  styles?: ScannerStyles
  /** Options to configure the scanner, such as device constraints and decoding hints. */
  options?: BrowserScannerOptions
  /** Components that can be toggled on or off, such as audio feedback or a torch control. */
  components?: ScannerComponents
  /** 
   * Function to execute when a scan successfully decodes a result.
   * @param text - The decoded text from the scan.
   * @param result - The full result object containing detailed scan data.
   */
  onResult: (text: string, result: Result) => void
  /** 
   * Optional function to handle errors during scanning.
   * @param error - The error object containing the error details.
   */
  onError?: (error: Error) => void
  /**
   * Custom Finder component to be used for rendering the scanning area.
   */
  customFinder?: React.ComponentType<FinderProps>
}

export default ScannerProps