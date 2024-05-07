import { ReactElement, useState } from 'react'
import CameraOff from '../assets/CameraOff'
import CameraOn from '../assets/CameraOn'

type TorchProps = {
  enabled: boolean
  startScanning: (deviceId?: string | undefined) => void
  stopScanning?: () => void
}

const OnOff = ({ enabled, startScanning, stopScanning }: TorchProps): ReactElement => {
  const [scanning, setScanning] = useState(enabled)

  const toggleScanning = (): void => {
    if (scanning) {
      stopScanning?.()
    } else {
      startScanning()
    }
    setScanning(prevState => !prevState)
  }

  return (
    <div
      style={{
        bottom: 50,
        right: 3,
        zIndex: 2,
        cursor: 'pointer',
        position: 'absolute'
      }}
    >
      {scanning ? (
        <CameraOff onClick={toggleScanning} />
      ) : (
        <CameraOn onClick={toggleScanning} />
      )}
    </div>
  )
}

export default OnOff