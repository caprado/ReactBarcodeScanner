import { ReactElement, useEffect, useState } from 'react'
import { BrowserScanner } from '../scanners/BrowserScanner'

/**
 * Props for the Devices component.
 */
type DevicesProps = {
  /** Optional callback to be invoked when a new device is selected from the dropdown. */
  onChange?: (deviceId: string) => void
}

/**
 * A component that renders a dropdown list of video input devices.
 * It fetches available video devices and allows the user to select one.
 * 
 * @param {DevicesProps} props - The properties passed to the Devices component.
 * @returns {ReactElement} - The rendered select element containing device options.
 */
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