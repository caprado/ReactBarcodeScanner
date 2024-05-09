import { ReactElement, useEffect, useState } from 'react'
import TorchOff from '../assets/TorchOff'
import TorchOn from '../assets/TorchOn'

/**
 * Properties for the Torch component, which controls the torch light of a device.
 */
type TorchProps = {
  /** Indicates if the torch toggle functionality is enabled. */
  enabled: boolean
  /** Optional function to switch the torch on or off. Accepts a boolean value as parameter. */
  switchTorch?: (value: boolean) => void
}

/**
 * A component that provides a UI control for toggling the device's torch light.
 * Renders null if torch toggling is not enabled or the switchTorch function is not provided.
 * 
 * @param {TorchProps} props The properties passed to the Torch component.
 * @returns {ReactElement | null} The rendered torch toggle button or null if torch control is disabled.
 */
const Torch = ({ enabled, switchTorch }: TorchProps): ReactElement | null => {
  const [torch, setTorch] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setTorch(false)
    }
  }, [enabled])

  const toggleTorch = (): void => {
    switchTorch?.(!torch)
    setTorch(!torch)
  }

  if (!enabled || switchTorch === undefined) {
    return null
  }

  return (
    <div
      style={{
        bottom: 0,
        right: 3,
        zIndex: 2,
        cursor: 'pointer',
        position: 'absolute'
      }}
    >
      {torch ? (
        <TorchOff onClick={toggleTorch} />
      ) : (
        <TorchOn onClick={toggleTorch} />
      )}
    </div>
  )
}

export default Torch
