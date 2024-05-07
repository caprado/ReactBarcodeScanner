import { Result } from '@zxing/library'
import { ReactElement, useEffect, useState } from 'react'
import { useContinuousScanner } from '../hooks/useContinuousScanner'
import { defaultComponents, defaultOptions, defaultStyles } from '../misc'
import { BrowserScannerOptions, ScannerComponents, ScannerStyles } from '../types'
import Finder from './Finder'

export type ScannerProps = {
  enabled?: boolean
  styles?: ScannerStyles
  options?: BrowserScannerOptions
  components?: ScannerComponents
  onResult: (text: string, result: Result) => void
  onError?: (error: Error) => void
}

export const Scanner = ({
  enabled = true,
  styles,
  options,
  components,
  onResult,
  onError
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

  return (
    <div style={{ ...defaultStyles.container, ...styles?.container }}>
      <Finder
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
