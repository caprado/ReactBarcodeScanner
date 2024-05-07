import { ChecksumException, Exception, FormatException, NotFoundException, Result } from '@zxing/library'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { base64Beep } from '../assets/base64Beep'
import { BrowserMultiFormatScanner } from '../scanners/BrowserMultiFormatScanner'
import { BrowserScanner } from '../scanners/BrowserScanner'
import { BrowserScannerOptions, OnErrorFunction, OnResultFunction, ScannerControl } from '../types'
import deepEqual from '../utilities/deepEqual'

type UseContinuousScannerProps = {
  audio: boolean
  options: BrowserScannerOptions
  onResult: OnResultFunction
  onError: OnErrorFunction
}

type UseContinuousScannerReturn = {
  loading: boolean
  ref: RefObject<HTMLVideoElement>
  startScanning: () => void
  stopScanning: () => void
  switchTorch?: (value: boolean) => void
  getSettings?: () => MediaTrackSettings | undefined
}

export const useContinuousScanner = ({
  audio,
  options,
  onResult,
  onError,
}: UseContinuousScannerProps): UseContinuousScannerReturn => {
  const isScanningRef = useRef(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef(new Audio(base64Beep))
  const controlRef = useRef<ScannerControl | undefined>(undefined)
  const onResultRef = useRef(onResult)
  const onErrorRef = useRef(onError)

  const [scanOptions, setScanOptions] = useState<BrowserScannerOptions>(options)
  const [hasTorch, setHasTorch] = useState(false)
  const [loading, setLoading] = useState(false)

  const getSettings = useCallback(() =>
    controlRef.current?.getStreamVideoSettings?.(track => [track]), [])

  const switchTorch = useCallback((value: boolean) => {
    controlRef.current?.switchTorch?.(value)
  }, [])

  const stopScanning = useCallback(() => {
    isScanningRef.current = false

    controlRef.current?.switchTorch?.(false)
    controlRef.current?.stop()
    controlRef.current = undefined

    audioRef.current.pause()

    setHasTorch(false)

    BrowserScanner.releaseAllStreams()

    if (videoRef.current) {
      BrowserScanner.cleanVideoSource(videoRef.current)
    }
  }, [])

  const handleResultOrError = useCallback(
    (result: Result | null, error: Exception | undefined) => {
      if (result) {
        if (result.getText() === '') {
          return
        }

        if (audio && audioRef.current && result.getText() !== '') {
          audioRef.current.play().catch(error =>
            // eslint-disable-next-line no-console
            console.error('Error playing the sound', error)
          )
        }

        onResultRef.current(result)
      } else if (error) {
        const errorName = error.name

        if (error instanceof NotFoundException) {
          return
        }

        if (error instanceof DOMException && errorName === 'IndexSizeError') {
          return
        }

        if (
          errorName === NotFoundException.name ||
          errorName === ChecksumException.name ||
          errorName === FormatException.name ||
          error.message.includes('No MultiFormat Readers were able to detect the code.')
        ) {
          onErrorRef.current(error)
        } else {
          onErrorRef.current(error)
          stopScanning()
        }
      }
    }, [stopScanning, audio]
  )

  const startScanning = useCallback(async () => {
    if (!videoRef.current || isScanningRef.current) {
      return
    }

    isScanningRef.current = true

    const reader = new BrowserMultiFormatScanner(scanOptions)

    try {
      setLoading(true)

      if (scanOptions.deviceId) {
        controlRef.current = await reader.decodeFromVideoDevice(
          scanOptions.deviceId,
          videoRef.current,
          handleResultOrError
        )
      } else {
        const newConstraints: MediaStreamConstraints = {
          audio: false,
          video: scanOptions?.constraints
        }

        controlRef.current = await reader.decodeFromConstraints(
          newConstraints,
          videoRef.current,
          handleResultOrError
        )
      }

      setLoading(false)

      if (controlRef.current?.switchTorch) {
        setHasTorch(true)
      }
    } catch (error) {
      onError(error as Error)
      stopScanning()
    }
  }, [scanOptions, onError, stopScanning, handleResultOrError])

  useEffect(() => {
    onResultRef.current = onResult
  }, [onResult])

  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  useEffect(() => () => stopScanning(), [stopScanning])

  useEffect(() => {
    const isEqual = deepEqual(scanOptions, options)
    if (!isEqual) {
      isScanningRef.current = false
      setHasTorch(false)
      setScanOptions(options)
    }
  }, [options, scanOptions])

  return {
    ref: videoRef,
    startScanning,
    stopScanning,
    loading,
    switchTorch: hasTorch ? switchTorch : undefined,
    getSettings
  }
}
