import { ReactElement, useEffect, useState } from 'react'
import TorchOff from '../assets/TorchOff'
import TorchOn from '../assets/TorchOn'

type TorchProps = {
  enabled: boolean
  switchTorch?: (value: boolean) => void
}

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
