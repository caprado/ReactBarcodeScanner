/**
 * Optional components that can be toggled on or off in the scanner UI.
 */
export type ScannerComponents = {
  /** Indicates if a tracking indicator should be displayed during scanning. */
  tracker?: boolean
  /** Indicates if audio feedback should be played on scan detection. */
  audio?: boolean
  /** Allows the user to toggle the device's torch on or off. */
  torch?: boolean
  /** Displays a count of successfully scanned items. */
  count?: boolean
  /** Provides on/off switch controls directly in the UI. */
  onOff?: boolean
}