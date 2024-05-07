import { useEffect, useState } from 'react'
import { BrowserScanner } from '../scanners/BrowserScanner'

export const useDeviceList = (): MediaDeviceInfo[] => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])

  const getDevices = async (): Promise<MediaDeviceInfo[]> => {
    const devices = (await BrowserScanner.listVideoInputDevices(true)) || []
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

  return devices
}
