import { Result } from '@zxing/library'
import { ReactElement, useEffect, useState } from 'react'
import { useContinuousScanner } from '../hooks/useContinuousScanner'
import { defaultComponents, defaultOptions, defaultStyles } from '../misc'
import ScannerProps from '../types/ScannerProps'
import Finder from './Finder'

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
