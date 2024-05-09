import { ReactElement, useState } from 'react'
import CameraOff from '../assets/CameraOff'
import CameraOn from '../assets/CameraOn'

/**
 * Properties for the OnOff component, which controls the scanning process.
 */
type TorchProps = {
  /** Indicates if scanning is initially enabled. */
  enabled: boolean
  /** Function to initiate scanning. Can optionally accept a device ID as parameter. */
  startScanning: (deviceId?: string | undefined) => void
  /** Optional function to stop scanning. */
  stopScanning?: () => void
}

/**
 * A component that provides a UI toggle for starting and stopping the scanner.
 * 
 * @param {TorchProps} props The properties passed to the OnOff component.
 * @returns {ReactElement} The rendered toggle button for scanner control.
 */
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