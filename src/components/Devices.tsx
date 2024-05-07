import { ReactElement, useEffect, useState } from 'react'
import { BrowserScanner } from '../scanners/BrowserScanner'

type DevicesProps = {
  onChange?: (deviceId: string) => void
}

const Devices = ({ onChange }: DevicesProps): ReactElement => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])

  const getDevices = async (): Promise<MediaDeviceInfo[]> => {
    const devices = await BrowserScanner.listVideoInputDevices() || []
    const hasDevices = devices && devices.length > 0

    if (!hasDevices) {
      // eslint-disable-next-line no-console
      console.warn('No video input devices found')
    }

    return devices
  }

  useEffect(() => {
    (async () => {
      setDevices(await getDevices())
    })()
  }, [])

  return (
    <select onChange={e => onChange?.(e.target.value)}>
      <option value=''>
        Select a device
      </option>
      {devices.map(device => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label}
        </option>
      ))}
    </select>
  )
}

export default Devices