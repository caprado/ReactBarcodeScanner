import { Result } from '@zxing/library'
import { Fragment, ReactElement } from 'react'
import { BrowserScannerOptions } from '../types'
import Counter from './Counter'
import OnOff from './OnOff'
import Torch from './Torch'
import Tracker from './Tracker'

type FinderProps = {
  enabled: boolean
  loading: boolean
  video: HTMLVideoElement | null
  border?: number
  result?: Result
  options: BrowserScannerOptions
  count?: boolean
  onOff?: boolean
  tracker?: boolean
  switchTorch?: (value: boolean) => void
  startScanning: (deviceId?: string | undefined) => void
  stopScanning: () => void
  getSettings?: () => MediaTrackSettings | undefined
}

const Finder = ({
  enabled,
  loading,
  video,
  border = 35,
  result,
  options,
  count,
  onOff,
  tracker = false,
  switchTorch,
  startScanning,
  stopScanning,
  getSettings
}: FinderProps): ReactElement => {
  const color = 'rgba(255, 0, 0, 0.5)'
  const stokeWidth = 3

  return (
    <Fragment>
      {count && <Counter result={result} />}
      {tracker && (
        <Tracker
          video={video}
          result={result}
          getSettings={getSettings}
          delay={options.delayBetweenScanAttempts ?? 0}
        />
      )}
      {onOff && (
        <OnOff
          enabled={enabled}
          startScanning={startScanning}
          stopScanning={stopScanning}
        />
      )}
      <Torch enabled={enabled} switchTorch={switchTorch} />
      <svg
        viewBox='0 0 100 100'
        style={{
          top: 0,
          left: 0,
          zIndex: 1,
          boxSizing: 'border-box',
          border: `${border >= 35 ? border : 35}px solid rgba(0, 0, 0, 0.2)`,
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      >
        {loading && (
          <text x='50' y='50' textAnchor='middle' fill='black' fontSize='8' fontFamily='Arial' fontWeight='bold'>
            Loading ...
            <animate attributeName='opacity' values='0;1;0' dur='2s' repeatCount='indefinite' />
          </text>
        )}
        <path fill='none' d='M23,0 L0,0 L0,23' stroke={color} strokeWidth={stokeWidth} />
        <path fill='none' d='M0,77 L0,100 L23,100' stroke={color} strokeWidth={stokeWidth} />
        <path fill='none' d='M77,100 L100,100 L100,77' stroke={color} strokeWidth={stokeWidth} />
        <path fill='none' d='M100,23 L100,0 77,0' stroke={color} strokeWidth={stokeWidth} />
      </svg>
    </Fragment>
  )
}

export default Finder
