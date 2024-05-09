import type { CSSProperties } from 'react'

/**
 * Styles to apply to various components of the Scanner interface.
 */
type ScannerStyles = {
  /** CSS properties for the outer container of the scanner. */
  container?: CSSProperties
  /** CSS properties for the video element that displays the camera feed. */
  video?: CSSProperties
  /** Numeric value representing the border thickness of the finder component. */
  finderBorder?: number
}

export default ScannerStyles
