import { Result } from '@zxing/library'
import { ReactElement, useEffect, useState } from 'react'
import { useContinuousScanner } from '../hooks/useContinuousScanner'
import { defaultComponents, defaultOptions, defaultStyles } from '../misc'
import { BrowserScannerOptions, ScannerComponents, ScannerStyles } from '../types'
import Finder, { FinderProps } from './Finder'

/**
 * Props for the Scanner component.
 */
export type ScannerProps = {
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

/**
 * Scanner component for barcode detection using a camera feed.
 * 
 * @param {ScannerProps} props - The properties passed to the Scanner component.
 * @returns {ReactElement} The rendered Scanner component, including video and optional UI components.
 */
export const Scanner = ({
  enabled = true,
  styles,
  options,
  components,
  onResult,
  onError,
  customFinder: CustomFinder
}: ScannerProps): ReactElement => {
  const [result, setResult] = useState<Result>()

  const handleOnResult = async (result: Result): Promise<void> => {
    setResult(result)
    onResult(result.getText(), result)
  }

  const handleOnError = (error: Error): void => onError?.(error)

  const newOptions = { ...defaultOptions, ...options }
  const newComponents = { ...defaultComponents, ...components }

  const {
    ref,
    loading,
    startScanning,
    stopScanning,
    switchTorch,
    getSettings
  } = useContinuousScanner({
    onResult: handleOnResult,
    onError: handleOnError,
    options: newOptions,
    audio: newComponents.audio ?? false
  })

  useEffect(() => {
    if (enabled) {
      startScanning()
    } else {
      stopScanning()
    }
  }, [enabled, stopScanning, startScanning])

  const FinderComponent = CustomFinder ?? Finder

  return (
    <div style={{ ...defaultStyles.container, ...styles?.container }}>
      <FinderComponent
        video={ref.current}
        enabled={enabled}
        loading={loading}
        result={result}
        border={styles?.finderBorder}
        options={newOptions}
        count={newComponents.count}
        onOff={newComponents.onOff}
        tracker={newComponents.tracker}
        switchTorch={newComponents.torch ? switchTorch : undefined}
        startScanning={startScanning}
        stopScanning={stopScanning}
        getSettings={getSettings}
      />
      <video
        ref={ref}
        muted
        playsInline
        style={{
          ...defaultStyles.video,
          ...styles?.video
        }}
      />
    </div>
  )
}
